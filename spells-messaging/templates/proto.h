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
