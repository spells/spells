all: spells-survey

spells-survey: main.cpp test.cpp kmeans.cpp
	g++ -L/usr/local/opt/mlpack/lib -lmlpack -L/usr/local/opt/libxml2/lib -I/usr/local/opt/libxml2/include/libxml2 -I/usr/local/include main.cpp test.cpp kmeans.cpp -o spells-survey-analyzer -lm

clean:
	rm spells-survey-analyzer