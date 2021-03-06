namespace spells
{
  namespace deviceId
  {
    void sendClear(void);
    void _receiveClear(void);
    void onClear(void);
    void sendDeviceId(long a, long b, long c, long d);
    void _receiveDeviceId(void);
    void onDeviceId(long a, long b, long c, long d);
  }
  namespace userId
  {
    void sendRequestUserId(void);
    void _receiveRequestUserId(void);
    void onRequestUserId(void);
    void sendUserId(long id);
    void _receiveUserId(void);
    void onUserId(long id);
  }
  namespace light
  {
    void sendRequestStatus(void);
    void _receiveRequestStatus(void);
    void onRequestStatus(void);
    void sendStatus(long isOn);
    void _receiveStatus(void);
    void onStatus(long isOn);
  }
  namespace doorLock
  {
    void sendRequestStatus(void);
    void _receiveRequestStatus(void);
    void onRequestStatus(void);
    void sendStatus(long isOpen);
    void _receiveStatus(void);
    void onStatus(long isOpen);
  }
  namespace airConditioner
  {
    void sendRequestStatus(void);
    void _receiveRequestStatus(void);
    void onRequestStatus(void);
    void sendStatus(long isOn);
    void _receiveStatus(void);
    void onStatus(long isOn);
  }
  namespace door
  {
    void sendRequestStatus(void);
    void _receiveRequestStatus(void);
    void onRequestStatus(void);
    void sendStatus(long isOpen);
    void _receiveStatus(void);
    void onStatus(long isOpen);
  }
  namespace window
  {
    void sendRequestTarget(void);
    void _receiveRequestTarget(void);
    void onRequestTarget(void);
    void sendTarget(long position);
    void _receiveTarget(void);
    void onTarget(long position);
    void sendRequestStatus(void);
    void _receiveRequestStatus(void);
    void onRequestStatus(void);
    void sendStatus(long position);
    void _receiveStatus(void);
    void onStatus(long position);
  }
  namespace air
  {
    void sendRequestTemperature(void);
    void _receiveRequestTemperature(void);
    void onRequestTemperature(void);
    void sendTemperature(long temperature);
    void _receiveTemperature(void);
    void onTemperature(long temperature);
    void sendRequestDust(void);
    void _receiveRequestDust(void);
    void onRequestDust(void);
    void sendDust(long dust);
    void _receiveDust(void);
    void onDust(long dust);
    void sendRequestCarbonDioxide(void);
    void _receiveRequestCarbonDioxide(void);
    void onRequestCarbonDioxide(void);
    void sendCarbonDioxide(long carbonDioxide);
    void _receiveCarbonDioxide(void);
    void onCarbonDioxide(long carbonDioxide);
    void sendRequestHumidity(void);
    void _receiveRequestHumidity(void);
    void onRequestHumidity(void);
    void sendHumidity(long humidity);
    void _receiveHumidity(void);
    void onHumidity(long humidity);
  }
  void _receive(void);
  void _beginRead();
  void _endRead();
  void _beginWrite();
  void _endWrite();
  int _read(void);
  void _write(int data);
  void _setup();
  void _loop();
  
  const unsigned char b64_alphabet[] =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  "abcdefghijklmnopqrstuvwxyz"
  "0123456789+/";
  
  int base64_encode(unsigned char *output, unsigned char *input, int inputLen);
  int base64_decode(unsigned char *output, unsigned char *input, int inputLen);
  
  void a3_to_a4(unsigned char * a4, unsigned char * a3);
  void a4_to_a3(unsigned char * a3, unsigned char * a4);
  unsigned char b64_lookup(unsigned char c);
  
}
#include <avr/pgmspace.h>
#include <EEPROM.h>
namespace spells
{
  namespace deviceId
  {
    void sendClear(void)
    {
      _beginWrite();
      {
        long __temp__ = 0;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveClear(void)
    {
      _endRead();
      onClear();
    }
    void sendDeviceId(long a, long b, long c, long d)
    {
      _beginWrite();
      {
        long __temp__ = 1;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = a;
        __temp__ -= 0;
        _write(((__temp__ & 0xFF000000) >> 24) & 0xFF);
        _write(((__temp__ & 0x00FF0000) >> 16) & 0xFF);
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = b;
        __temp__ -= 0;
        _write(((__temp__ & 0xFF000000) >> 24) & 0xFF);
        _write(((__temp__ & 0x00FF0000) >> 16) & 0xFF);
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = c;
        __temp__ -= 0;
        _write(((__temp__ & 0xFF000000) >> 24) & 0xFF);
        _write(((__temp__ & 0x00FF0000) >> 16) & 0xFF);
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = d;
        __temp__ -= 0;
        _write(((__temp__ & 0xFF000000) >> 24) & 0xFF);
        _write(((__temp__ & 0x00FF0000) >> 16) & 0xFF);
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveDeviceId(void)
    {
      long a, b, c, d;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        a = __temp__;
      }
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        b = __temp__;
      }
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        c = __temp__;
      }
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        d = __temp__;
      }
      _endRead();
      onDeviceId(a, b, c, d);
    }
  }
  namespace userId
  {
    void sendRequestUserId(void)
    {
      _beginWrite();
      {
        long __temp__ = 2;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestUserId(void)
    {
      _endRead();
      onRequestUserId();
    }
    void sendUserId(long id)
    {
      _beginWrite();
      {
        long __temp__ = 3;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = id;
        __temp__ -= 0;
        _write(((__temp__ & 0xFF000000) >> 24) & 0xFF);
        _write(((__temp__ & 0x00FF0000) >> 16) & 0xFF);
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveUserId(void)
    {
      long id;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        id = __temp__;
      }
      _endRead();
      onUserId(id);
    }
  }
  namespace light
  {
    void sendRequestStatus(void)
    {
      _beginWrite();
      {
        long __temp__ = 4;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestStatus(void)
    {
      _endRead();
      onRequestStatus();
    }
    void sendStatus(long isOn)
    {
      _beginWrite();
      {
        long __temp__ = 5;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = isOn;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveStatus(void)
    {
      long isOn;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        isOn = __temp__;
      }
      _endRead();
      onStatus(isOn);
    }
  }
  namespace doorLock
  {
    void sendRequestStatus(void)
    {
      _beginWrite();
      {
        long __temp__ = 6;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestStatus(void)
    {
      _endRead();
      onRequestStatus();
    }
    void sendStatus(long isOpen)
    {
      _beginWrite();
      {
        long __temp__ = 7;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = isOpen;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveStatus(void)
    {
      long isOpen;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        isOpen = __temp__;
      }
      _endRead();
      onStatus(isOpen);
    }
  }
  namespace airConditioner
  {
    void sendRequestStatus(void)
    {
      _beginWrite();
      {
        long __temp__ = 8;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestStatus(void)
    {
      _endRead();
      onRequestStatus();
    }
    void sendStatus(long isOn)
    {
      _beginWrite();
      {
        long __temp__ = 9;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = isOn;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveStatus(void)
    {
      long isOn;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        isOn = __temp__;
      }
      _endRead();
      onStatus(isOn);
    }
  }
  namespace door
  {
    void sendRequestStatus(void)
    {
      _beginWrite();
      {
        long __temp__ = 10;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestStatus(void)
    {
      _endRead();
      onRequestStatus();
    }
    void sendStatus(long isOpen)
    {
      _beginWrite();
      {
        long __temp__ = 11;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = isOpen;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveStatus(void)
    {
      long isOpen;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        isOpen = __temp__;
      }
      _endRead();
      onStatus(isOpen);
    }
  }
  namespace window
  {
    void sendRequestTarget(void)
    {
      _beginWrite();
      {
        long __temp__ = 12;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestTarget(void)
    {
      _endRead();
      onRequestTarget();
    }
    void sendTarget(long position)
    {
      _beginWrite();
      {
        long __temp__ = 13;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = position;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveTarget(void)
    {
      long position;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        position = __temp__;
      }
      _endRead();
      onTarget(position);
    }
    void sendRequestStatus(void)
    {
      _beginWrite();
      {
        long __temp__ = 14;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestStatus(void)
    {
      _endRead();
      onRequestStatus();
    }
    void sendStatus(long position)
    {
      _beginWrite();
      {
        long __temp__ = 15;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = position;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveStatus(void)
    {
      long position;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        position = __temp__;
      }
      _endRead();
      onStatus(position);
    }
  }
  namespace air
  {
    void sendRequestTemperature(void)
    {
      _beginWrite();
      {
        long __temp__ = 16;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestTemperature(void)
    {
      _endRead();
      onRequestTemperature();
    }
    void sendTemperature(long temperature)
    {
      _beginWrite();
      {
        long __temp__ = 17;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = temperature;
        __temp__ -= -20;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveTemperature(void)
    {
      long temperature;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += -20;
        temperature = __temp__;
      }
      _endRead();
      onTemperature(temperature);
    }
    void sendRequestDust(void)
    {
      _beginWrite();
      {
        long __temp__ = 18;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestDust(void)
    {
      _endRead();
      onRequestDust();
    }
    void sendDust(long dust)
    {
      _beginWrite();
      {
        long __temp__ = 19;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = dust;
        __temp__ -= 0;
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveDust(void)
    {
      long dust;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 0;
        dust = __temp__;
      }
      _endRead();
      onDust(dust);
    }
    void sendRequestCarbonDioxide(void)
    {
      _beginWrite();
      {
        long __temp__ = 20;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestCarbonDioxide(void)
    {
      _endRead();
      onRequestCarbonDioxide();
    }
    void sendCarbonDioxide(long carbonDioxide)
    {
      _beginWrite();
      {
        long __temp__ = 21;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = carbonDioxide;
        __temp__ -= 450;
        _write(((__temp__ & 0x0000FF00) >> 8) & 0xFF);
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveCarbonDioxide(void)
    {
      long carbonDioxide;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ <<= 8;
        __temp__ |= _read();
        __temp__ += 450;
        carbonDioxide = __temp__;
      }
      _endRead();
      onCarbonDioxide(carbonDioxide);
    }
    void sendRequestHumidity(void)
    {
      _beginWrite();
      {
        long __temp__ = 22;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveRequestHumidity(void)
    {
      _endRead();
      onRequestHumidity();
    }
    void sendHumidity(long humidity)
    {
      _beginWrite();
      {
        long __temp__ = 23;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      {
        long __temp__ = humidity;
        __temp__ -= 0;
        _write(((__temp__ & 0x000000FF) >> 0) & 0xFF);
      }
      _endWrite();
    }
    void _receiveHumidity(void)
    {
      long humidity;
      {
        long __temp__ = 0;
        __temp__ |= _read();
        __temp__ += 0;
        humidity = __temp__;
      }
      _endRead();
      onHumidity(humidity);
    }
  }
  void _receive(void)
  {
    long serviceId;
    _beginRead();
    {
      long __temp__ = 0;
      __temp__ |= _read();
      __temp__ += 0;
      serviceId = __temp__;
    }
    switch (serviceId)
    {
    case 0:
      deviceId::_receiveClear();
      break;
    case 1:
      deviceId::_receiveDeviceId();
      break;
    case 2:
      userId::_receiveRequestUserId();
      break;
    case 3:
      userId::_receiveUserId();
      break;
    case 4:
      light::_receiveRequestStatus();
      break;
    case 5:
      light::_receiveStatus();
      break;
    case 6:
      doorLock::_receiveRequestStatus();
      break;
    case 7:
      doorLock::_receiveStatus();
      break;
    case 8:
      airConditioner::_receiveRequestStatus();
      break;
    case 9:
      airConditioner::_receiveStatus();
      break;
    case 10:
      door::_receiveRequestStatus();
      break;
    case 11:
      door::_receiveStatus();
      break;
    case 12:
      window::_receiveRequestTarget();
      break;
    case 13:
      window::_receiveTarget();
      break;
    case 14:
      window::_receiveRequestStatus();
      break;
    case 15:
      window::_receiveStatus();
      break;
    case 16:
      air::_receiveRequestTemperature();
      break;
    case 17:
      air::_receiveTemperature();
      break;
    case 18:
      air::_receiveRequestDust();
      break;
    case 19:
      air::_receiveDust();
      break;
    case 20:
      air::_receiveRequestCarbonDioxide();
      break;
    case 21:
      air::_receiveCarbonDioxide();
      break;
    case 22:
      air::_receiveRequestHumidity();
      break;
    case 23:
      air::_receiveHumidity();
      break;
    default:
      _endRead();
    }
  }
  const static PROGMEM uint32_t CRC24_TABLE[256] =
  {
    0x00000000, 0x00864CFB, 0x008AD50D, 0x000C99F6, 0x0093E6E1, 0x0015AA1A,
    0x001933EC, 0x009F7F17, 0x00A18139, 0x0027CDC2, 0x002B5434, 0x00AD18CF,
    0x003267D8, 0x00B42B23, 0x00B8B2D5, 0x003EFE2E, 0x00C54E89, 0x00430272,
    0x004F9B84, 0x00C9D77F, 0x0056A868, 0x00D0E493, 0x00DC7D65, 0x005A319E,
    0x0064CFB0, 0x00E2834B, 0x00EE1ABD, 0x00685646, 0x00F72951, 0x007165AA,
    0x007DFC5C, 0x00FBB0A7, 0x000CD1E9, 0x008A9D12, 0x008604E4, 0x0000481F,
    0x009F3708, 0x00197BF3, 0x0015E205, 0x0093AEFE, 0x00AD50D0, 0x002B1C2B,
    0x002785DD, 0x00A1C926, 0x003EB631, 0x00B8FACA, 0x00B4633C, 0x00322FC7,
    0x00C99F60, 0x004FD39B, 0x00434A6D, 0x00C50696, 0x005A7981, 0x00DC357A,
    0x00D0AC8C, 0x0056E077, 0x00681E59, 0x00EE52A2, 0x00E2CB54, 0x006487AF,
    0x00FBF8B8, 0x007DB443, 0x00712DB5, 0x00F7614E, 0x0019A3D2, 0x009FEF29,
    0x009376DF, 0x00153A24, 0x008A4533, 0x000C09C8, 0x0000903E, 0x0086DCC5,
    0x00B822EB, 0x003E6E10, 0x0032F7E6, 0x00B4BB1D, 0x002BC40A, 0x00AD88F1,
    0x00A11107, 0x00275DFC, 0x00DCED5B, 0x005AA1A0, 0x00563856, 0x00D074AD,
    0x004F0BBA, 0x00C94741, 0x00C5DEB7, 0x0043924C, 0x007D6C62, 0x00FB2099,
    0x00F7B96F, 0x0071F594, 0x00EE8A83, 0x0068C678, 0x00645F8E, 0x00E21375,
    0x0015723B, 0x00933EC0, 0x009FA736, 0x0019EBCD, 0x008694DA, 0x0000D821,
    0x000C41D7, 0x008A0D2C, 0x00B4F302, 0x0032BFF9, 0x003E260F, 0x00B86AF4,
    0x002715E3, 0x00A15918, 0x00ADC0EE, 0x002B8C15, 0x00D03CB2, 0x00567049,
    0x005AE9BF, 0x00DCA544, 0x0043DA53, 0x00C596A8, 0x00C90F5E, 0x004F43A5,
    0x0071BD8B, 0x00F7F170, 0x00FB6886, 0x007D247D, 0x00E25B6A, 0x00641791,
    0x00688E67, 0x00EEC29C, 0x003347A4, 0x00B50B5F, 0x00B992A9, 0x003FDE52,
    0x00A0A145, 0x0026EDBE, 0x002A7448, 0x00AC38B3, 0x0092C69D, 0x00148A66,
    0x00181390, 0x009E5F6B, 0x0001207C, 0x00876C87, 0x008BF571, 0x000DB98A,
    0x00F6092D, 0x007045D6, 0x007CDC20, 0x00FA90DB, 0x0065EFCC, 0x00E3A337,
    0x00EF3AC1, 0x0069763A, 0x00578814, 0x00D1C4EF, 0x00DD5D19, 0x005B11E2,
    0x00C46EF5, 0x0042220E, 0x004EBBF8, 0x00C8F703, 0x003F964D, 0x00B9DAB6,
    0x00B54340, 0x00330FBB, 0x00AC70AC, 0x002A3C57, 0x0026A5A1, 0x00A0E95A,
    0x009E1774, 0x00185B8F, 0x0014C279, 0x00928E82, 0x000DF195, 0x008BBD6E,
    0x00872498, 0x00016863, 0x00FAD8C4, 0x007C943F, 0x00700DC9, 0x00F64132,
    0x00693E25, 0x00EF72DE, 0x00E3EB28, 0x0065A7D3, 0x005B59FD, 0x00DD1506,
    0x00D18CF0, 0x0057C00B, 0x00C8BF1C, 0x004EF3E7, 0x00426A11, 0x00C426EA,
    0x002AE476, 0x00ACA88D, 0x00A0317B, 0x00267D80, 0x00B90297, 0x003F4E6C,
    0x0033D79A, 0x00B59B61, 0x008B654F, 0x000D29B4, 0x0001B042, 0x0087FCB9,
    0x001883AE, 0x009ECF55, 0x009256A3, 0x00141A58, 0x00EFAAFF, 0x0069E604,
    0x00657FF2, 0x00E33309, 0x007C4C1E, 0x00FA00E5, 0x00F69913, 0x0070D5E8,
    0x004E2BC6, 0x00C8673D, 0x00C4FECB, 0x0042B230, 0x00DDCD27, 0x005B81DC,
    0x0057182A, 0x00D154D1, 0x0026359F, 0x00A07964, 0x00ACE092, 0x002AAC69,
    0x00B5D37E, 0x00339F85, 0x003F0673, 0x00B94A88, 0x0087B4A6, 0x0001F85D,
    0x000D61AB, 0x008B2D50, 0x00145247, 0x00921EBC, 0x009E874A, 0x0018CBB1,
    0x00E37B16, 0x006537ED, 0x0069AE1B, 0x00EFE2E0, 0x00709DF7, 0x00F6D10C,
    0x00FA48FA, 0x007C0401, 0x0042FA2F, 0x00C4B6D4, 0x00C82F22, 0x004E63D9,
    0x00D11CCE, 0x00575035, 0x005BC9C3, 0x00DD8538
  };
  
  uint32_t crc24(const uint8_t input[], size_t length)
  {
    uint32_t tmp = 0xb704ce;
    while (length >= 16)
    {
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 0]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 1]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 2]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 3]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 4]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 5]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 6]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 7]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 8]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[ 9]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[10]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[11]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[12]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[13]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[14]) & 0xFF)) ^ (tmp << 8);
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[15]) & 0xFF)) ^ (tmp << 8);
      input += 16;
      length -= 16;
    }
    for (size_t i = 0; i != length; ++i)
    {
      tmp = pgm_read_dword_near(CRC24_TABLE + (((tmp >> 16) ^ input[i]) & 0xFF)) ^ (tmp << 8);  
    }
    return tmp;
  }
  
  int base64_encode(unsigned char *output, unsigned char *input, int inputLen)
  {
    int i = 0, j = 0;
    int encLen = 0;
    unsigned char a3[3];
    unsigned char a4[4];
  
    while (inputLen--)
    {
      a3[i++] = *(input++);
      if (i == 3)
      {
        a3_to_a4(a4, a3);
        for (i = 0; i < 4; i++)
        {
          output[encLen++] = b64_alphabet[a4[i]];
        }
        i = 0;
      }
    }
    if (i)
    {
      for (j = i; j < 3; j++)
      {
        a3[j] = '\0';
      }
      a3_to_a4(a4, a3);
      for (j = 0; j < i + 1; j++)
      {
        output[encLen++] = b64_alphabet[a4[j]];
      }
      while ((i++ < 3))
      {
        output[encLen++] = '=';
      }
    }
    output[encLen] = '\0';
    return encLen;
  }
  
  int base64_decode(unsigned char * output, unsigned char * input, int inputLen)
  {
    int i = 0, j = 0;
    int decLen = 0;
    unsigned char a3[3];
    unsigned char a4[4];
  
    while (inputLen--)
    {
      if (*input == '=') {
        break;
      }
      a4[i++] = *(input++);
      if (i == 4)
      {
        for (i = 0; i <4; i++)
        {
          a4[i] = b64_lookup(a4[i]);
        }
        a4_to_a3(a3,a4);
        for (i = 0; i < 3; i++)
        {
          output[decLen++] = a3[i];
        }
        i = 0;
      }
    }
    if (i)
    {
      for (j = i; j < 4; j++)
      {
        a4[j] = '\0';
      }
      for (j = 0; j <4; j++)
      {
        a4[j] = b64_lookup(a4[j]);
      }
      a4_to_a3(a3,a4);
      for (j = 0; j < i - 1; j++)
      {
        output[decLen++] = a3[j];
      }
    }
    output[decLen] = '\0';
    return decLen;
  }
  
  void a3_to_a4(unsigned char * a4, unsigned char * a3)
  {
    a4[0] = (a3[0] & 0xfc) >> 2;
    a4[1] = ((a3[0] & 0x03) << 4) + ((a3[1] & 0xf0) >> 4);
    a4[2] = ((a3[1] & 0x0f) << 2) + ((a3[2] & 0xc0) >> 6);
    a4[3] = (a3[2] & 0x3f);
  }
  
  void a4_to_a3(unsigned char * a3, unsigned char * a4)
  {
    a3[0] = (a4[0] << 2) + ((a4[1] & 0x30) >> 4);
    a3[1] = ((a4[1] & 0xf) << 4) + ((a4[2] & 0x3c) >> 2);
    a3[2] = ((a4[2] & 0x3) << 6) + a4[3];
  }
  
  unsigned char b64_lookup(unsigned char c)
  {
    if(c >='A' && c <='Z') return c - 'A';
    if(c >='a' && c <='z') return c - 71;
    if(c >='0' && c <='9') return c + 4;
    if(c == '+') return 62;
    if(c == '/') return 63;
    return -1;
  }
  
  #define BASE64_BUFFER_SIZE 255
  unsigned char _base64[BASE64_BUFFER_SIZE];
  unsigned char _base64Next;
  
  #define DATA_BUFFER_SIZE 180
  unsigned char _data[DATA_BUFFER_SIZE];
  unsigned char _dataNext;
  
  #define SERIAL Serial1
  
  void _beginRead()
  {
    _base64Next = 0;
    for (;;)
    {
      while (SERIAL.available() <= 0);
      int value = SERIAL.read();
      if (value == '^')
      {
        _base64Next = 0;
        continue;
      }
      if (value == '?')
      {
        break;
      }
      _base64[_base64Next++] = value;
    }
    for (;;)
    {
      while (SERIAL.available() <= 0);
      int value = SERIAL.read();
      if (value == '$')
      {
        break;
      }
    }
    base64_decode(_data, _base64, _base64Next);
    _dataNext = 0;
  }
  
  void _endRead()
  {
  }
  
  void _beginWrite()
  {
    _dataNext = 0;
  }
  
  void _endWrite()
  {
    _base64Next = base64_encode(_base64, _data, _dataNext);
    SERIAL.write('^');
    SERIAL.write(_base64, _base64Next);
    SERIAL.write('?');
    uint32_t checksum = crc24(_data, _dataNext);
    _data[0] = (checksum & 0x00FF0000) >> 16;
    _data[1] = (checksum & 0x0000FF00) >> 8;
    _data[2] = (checksum & 0x000000FF) >> 0;
    base64_encode(_base64, _data, 3);
    SERIAL.write(_base64, 4);
    SERIAL.write('$');
    delay(10);
  }
  
  int _read()
  {
    return _data[_dataNext++];
  }
  
  void _write(int data)
  {
    _data[_dataNext++] = data;
  }
  
  void _setup()
  {
    SERIAL.begin(115200);
  }
  
  void _loop()
  {
    if (SERIAL.available() > 0)
    {
      _receive();
    }
  }
  
  #define READ_EEPROM_DWORD(i)          \
    (                     \
      ((long)EEPROM.read(i)   << 24)  | \
      ((long)EEPROM.read(i + 1) << 16)  | \
      ((long)EEPROM.read(i + 2) << 8)   |   \
      ((long)EEPROM.read(i + 3) << 0)   \
    )
  
  #define WRITE_EEPROM_DWORD(i, value)                \
    do                                \
    {                               \
      EEPROM.write(i,   ((value & 0xFF000000) >> 24) & 0xFF); \
      EEPROM.write(i + 1, ((value & 0x00FF0000) >> 16) & 0xFF); \
      EEPROM.write(i + 2, ((value & 0x0000FF00) >> 8) & 0xFF);  \
      EEPROM.write(i + 3, ((value & 0x000000FF) >> 0) & 0xFF);  \
    } while (0)
  
  void deviceId::onDeviceId(long a, long b, long c, long d)
  {
    long p = READ_EEPROM_DWORD(0);
    long q = READ_EEPROM_DWORD(4);
    long r = READ_EEPROM_DWORD(8);
    long s = READ_EEPROM_DWORD(12);
    
    if (p == 0 && q == 0 && r == 0 && s == 0)
    {
      p = a;
      q = b;
      r = c;
      s = d;
  
      WRITE_EEPROM_DWORD(0, p);
      WRITE_EEPROM_DWORD(4, q);
      WRITE_EEPROM_DWORD(8, r);
      WRITE_EEPROM_DWORD(12, s);
    }
    
    deviceId::sendDeviceId(p, q, r, s);
  }
  
  void deviceId::onClear()
  {
    WRITE_EEPROM_DWORD(0, 0);
    WRITE_EEPROM_DWORD(4, 0);
    WRITE_EEPROM_DWORD(8, 0);
    WRITE_EEPROM_DWORD(12, 0);
  }
}

void spells::userId::onUserId(long id) {}
void spells::air::onTemperature(long temperature) {}
void spells::air::onDust(long dust) {}
void spells::air::onCarbonDioxide(long carbonDioxide) {}
void spells::air::onHumidity(long humidity) {}

long currentUserId = 0;

namespace spells
{
  namespace userId
  {
    void onRequestUserId(void)
    {
      sendUserId(currentUserId);
    }
  }
  namespace light
  {
    void onRequestStatus(void)
    {
    }
    void onStatus(long isOn)
    {
    }
  }
  namespace doorLock
  {
    void onRequestStatus(void)
    {
    }
    void onStatus(long isOpen)
    {
    }
  }
  namespace airConditioner
  {
    void onRequestStatus(void)
    {
    }
    void onStatus(long isOn)
    {
    }
  }
  namespace door
  {
    void onRequestStatus(void)
    {
    }
    void onStatus(long isOpen)
    {
    }
  }
  namespace window
  {
    void onRequestTarget(void)
    {
    }
    void onTarget(long position)
    {
    }
    void onRequestStatus(void)
    {
    }
    void onStatus(long position)
    {
    }
  }
  namespace air
  {
    void onRequestTemperature(void)
    {
    }
    void onRequestDust(void)
    {
    }
    void onRequestCarbonDioxide(void)
    {
    }
    void onRequestHumidity(void)
    {
    }
  }
}

void setup()
{
  // 여기에서 setup 작업을 수행합니다.

  // 여기에서 사용자 정보를 받는 작업을 수행합니다.

  // 여기에서는 currentUserId 변수에 사용자 정보가 지정되어 있어야 합니다.

  spells::_setup();
}

void loop()
{
  // 여기에서 loop 작업을 수행합니다.

  spells::_loop();
}
