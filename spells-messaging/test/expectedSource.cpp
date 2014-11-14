namespace proto1
{
	namespace f1
	{
		void _receive(void)
		{
			long methodId;
			read:1:unsigned char:0:methodId
			switch (methodId)
			{
			case 0:
				_receiveM0();
				break;
			case 1:
				_receiveM3();
				break;
			default:
			}
		}
		void sendM0(void)
		{
			write:1:unsigned char:0:0
			write:1:unsigned char:0:0
		}
		void _receiveM0(void)
		{
			onM0();
		}
		void sendM3(long a, long b, long c)
		{
			write:1:unsigned char:0:0
			write:1:unsigned char:0:1
			write:1:unsigned char:-100:a
			write:2:unsigned int:-1000:b
			write:4:unsigned long:-50000:c
		}
		void _receiveM3(void)
		{
			long a, b, c;
			read:1:unsigned char:-100:a
			read:2:unsigned int:-1000:b
			read:4:unsigned long:-50000:c
			onM3(a, b, c);
		}
	}
	namespace f2
	{
		void _receive(void)
		{
			long methodId;
			read:1:unsigned char:0:methodId
			switch (methodId)
			{
			case 0:
				_receiveK0();
				break;
			case 1:
				_receiveK3();
				break;
			default:
			}
		}
		void sendK0(void)
		{
			write:1:unsigned char:0:1
			write:1:unsigned char:0:0
		}
		void _receiveK0(void)
		{
			onK0();
		}
		void sendK3(long one, long two, long three)
		{
			write:1:unsigned char:0:1
			write:1:unsigned char:0:1
			write:1:unsigned char:-100:one
			write:2:unsigned int:-1000:two
			write:4:unsigned long:-50000:three
		}
		void _receiveK3(void)
		{
			long one, two, three;
			read:1:unsigned char:-100:one
			read:2:unsigned int:-1000:two
			read:4:unsigned long:-50000:three
			onK3(one, two, three);
		}
	}
}