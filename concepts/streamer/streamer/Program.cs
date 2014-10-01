using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Linq;

namespace streamer
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			MainClass mainClass = new MainClass();
			mainClass.Start();
		}

		// 재생할 사운드를 저장합니다.
		private List<byte> _buffer;

		public MainClass()
		{
			_buffer = new List<byte>();
		}

		void Start()
		{
			ReadFile("interface_loop_master.pcm");
			PlayBuffer();
		}

		// fileName 파일을 읽어 버퍼에 저장합니다.
		// 데이터는 부호 없는 8비트 모노 사운드이어야 합니다.
		void ReadFile(string fileName)
		{
			_buffer = File.ReadAllBytes(fileName).ToList();
			Console.WriteLine(_buffer.Count());
		}

		void PlayBuffer()
		{
			// 115200bps, 패리티 없음, 8비트, 정지 비트 1로 통신합니다.
			SerialPort port = new SerialPort("/dev/tty.usbmodem1421", 115200, Parity.None, 8, StopBits.One);

			port.ReadBufferSize = 4096;
			port.WriteBufferSize = 4096;

			port.Open();

			// 사운드를 연속 재상합니다.
			for (;;)
			{
				// 전체 사운드를 한 번 재생합니다.
				for (int i = 0; i < _buffer.Count();)
				{
					// 임베디드 장치에서 사운드 요청이 들어올 때까지 동기적으로 대기합니다.
					while (port.BytesToRead < 1)
						;
					// 올바르지 않은 패킷은 무시합니다.
					while (port.BytesToRead != 0 && port.ReadByte() != 42)
						;

					Console.WriteLine(i);
					Console.WriteLine(port.BytesToRead);
					Console.WriteLine(port.BytesToWrite);

					// 한 번에 최대 512 샘플을 전송합니다.
					int count = 512;
					count = Math.Min(count, _buffer.Count() - 1 - i);

					for (int j = 0; j < count; j++)
					{
						byte[] b = new [] { (byte)_buffer[i + j] };
						port.Write(b, 0, 1);

						// Arduino Leonardo의 시리얼 통신 읽기는 하드웨어 인터럽트 핸들러에서 버퍼에 내용을 저장한 다음
						// 소프트웨어적인 메커니즘으로 한 번 더 데이터를 읽습니다.
						// 버퍼의 크기가 작기 때문에 한 번에 많은 데이터를 보내면 문제가 발생하므로, 시간 지연을 더합니다.
						// Arduino 라이브러리에서 지정하는 버퍼 크기를 직접 수정하면 이러한 문제가 발생하지 않습니다.
						// 이 해결책은 버퍼 크기를 수정하지 않고 기본 설정된 환경에서도 스트리밍을 가능하게 합니다.
						System.Diagnostics.Stopwatch sw = new System.Diagnostics.Stopwatch();
						sw.Start();
						// 동기적으로 바쁜 대기를 수행합니다.
						while (sw.Elapsed.TotalMilliseconds <= 0.02)
						{
						}
					}

					i += 512;
				}
			}
		}
	}
}
