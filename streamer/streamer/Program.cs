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

		void ReadFile(string fileName)
		{
			_buffer = File.ReadAllBytes(fileName).ToList();
			Console.WriteLine(_buffer.Count());
		}

		void PlayBuffer()
		{
			SerialPort port = new SerialPort("/dev/tty.usbmodem1421", 115200, Parity.None, 8, StopBits.One);

			port.ReadBufferSize = 4096;
			port.WriteBufferSize = 4096;

			port.Open();

			for (;;)
			{
				for (int i = 0; i < _buffer.Count();)
				{

					while (port.BytesToRead < 1)
						;
					while (port.BytesToRead != 0 && port.ReadByte() != 42)
						;

					Console.WriteLine(i);
					Console.WriteLine(port.BytesToRead);
					Console.WriteLine(port.BytesToWrite);

					int count = 512;
					count = Math.Min(count, _buffer.Count() - 1 - i);

					for (int j = 0; j < count; j++)
					{
						byte[] b = new [] { (byte)_buffer[i + j] };
						port.Write(b, 0, 1);

						System.Diagnostics.Stopwatch sw = new System.Diagnostics.Stopwatch();
						sw.Start();
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
