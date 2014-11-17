namespace proto1
{
	namespace f1
	{
		void sendM0(void)
		{
			beginWrite
			write:1:unsigned char:0:0
			endWrite
		}
		void _receiveM0(void)
		{
			endRead
			onM0();
		}
		void sendM3(long a, long b, long c)
		{
			beginWrite
			write:1:unsigned char:0:1
			write:1:unsigned char:-100:a
			write:2:unsigned int:-1000:b
			write:4:unsigned long:-50000:c
			endWrite
		}
		void _receiveM3(void)
		{
			long a, b, c;
			read:1:unsigned char:-100:a
			read:2:unsigned int:-1000:b
			read:4:unsigned long:-50000:c
			endRead
			onM3(a, b, c);
		}
	}
	namespace f2
	{
		void sendK0(void)
		{
			beginWrite
			write:1:unsigned char:0:2
			endWrite
		}
		void _receiveK0(void)
		{
			endRead
			onK0();
		}
		void sendK3(long one, long two, long three)
		{
			beginWrite
			write:1:unsigned char:0:3
			write:1:unsigned char:-100:one
			write:2:unsigned int:-1000:two
			write:4:unsigned long:-50000:three
			endWrite
		}
		void _receiveK3(void)
		{
			long one, two, three;
			read:1:unsigned char:-100:one
			read:2:unsigned int:-1000:two
			read:4:unsigned long:-50000:three
			endRead
			onK3(one, two, three);
		}
	}
	void _receive(void)
	{
		long serviceId;
		beginRead
		read:1:unsigned char:0:serviceId
		switch (serviceId)
		{
		case 0:
			f1::_receiveM0();
			break;
		case 1:
			f1::_receiveM3();
			break;
		case 2:
			f2::_receiveK0();
			break;
		case 3:
			f2::_receiveK3();
			break;
		default:
			endRead
		}
	}
	tpl.cpp
}