{{##def.library:
void loop()
{
	spells::libary::loop();
	spells::loop();
}

void setup()
{
	spells::library::setup();
	spells::setup();
}

namespace spells
{
	namespace library
	{
		void setup()
		{
			packet = malloc(/*최대 패킷 사이즈*/);
		}

		void loop()
		{
		}

		struct Packet
		{
			uint16_t packetId;
			int16_t payload[0];
		};

		struct DeviceInfo
		{
			uint32_t deviceId[8];
			uint32_t featureId;
		};

		const uint16_t payloadLength[] = { 0, sizeof(DeviceInfo), /* 반복 */ }
		const uint8_t  qosLevel[] = { };

		Packet *packet;

		void readSerial(uint16_t length)
		{
			
		}

		void writeSerial(uint8_t byte)
		{
			Seiralbyte
		}

		void writeSerial(Packet *packet)
		{
			writeSerial(packet->packetId);
			writeSerial(packet->packetId);

		}

		void readPacket(uint16_t packetId)
		{
			readSerial(payloadLength[packetId]);
		}

		void writePacket(Packet *packet)
		{
			writeSerial((uint8_t *)&packet->packetId, sizeof(uint16_t));
			writeSerial(packet->payload, packet->payload + payloadLength(packet->packetId));
		}
	}
}
#}}