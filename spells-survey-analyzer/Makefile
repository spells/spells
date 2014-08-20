all: spells-survey

spells-survey: main.cpp test.cpp Measure.cpp
	g++ -L/usr/local/opt/libxml2/lib -I/usr/local/opt/libxml2/include/libxml2 -I/usr/local/include main.cpp test.cpp Measure.cpp --std=c++11 -o spells-survey -lm

clean:
	rm spells-survey