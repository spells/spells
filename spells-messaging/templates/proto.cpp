int _read()
{
	while (Serial.available() <= 0);
	return Serial.read();
}

void _write(int data)
{
	Serial.write(data);
}

void _setup()
{
	Serial.begin(9600);
}

void _loop()
{
	if (Serial.available() > 0)
	{
		_receive();
	}
}