#include <iostream>
#include <fstream>
#include <sstream>
#include <memory>
#include <vector>
#include <string>
using namespace std;

#include "test.h"
#include "kmeans.h"

void readInputFile(vector<vector<double> > *input)
{
	ifstream inputFile("input.txt");
	int n, m;
	inputFile >> n >> m;
	input->resize(n);
	for (int i = 0; i < n; i++)
	{
		(*input)[i].resize(m);
		for (int j = 0; j < m; j++)
		{
			inputFile >> (*input)[i][j];
		}
	}
}

void normalizeDoubleVector(vector<double> *doubleVector)
{
	double sum = 0;
	for (int i = 0; i < doubleVector->size(); i++)
	{
		sum += (*doubleVector)[i];
	}
	if (sum == 0)
	{
		return;
	}
	for (int i = 0; i < doubleVector->size(); i++)
	{
		(*doubleVector)[i] /= sum;
	}
}

void normalizeInput(vector<vector<double> > *input)
{
	for (int i = 0; i < input->size(); i++)
	{
		normalizeDoubleVector(&(*input)[i]);
	}
}

int main()
{
	testAll();

	vector<vector<double> > input;
	readInputFile(&input);
	normalizeInput(&input);
	
	for (int k = 2; k <= 10; k++)
	{
		kMeans(input, k);
	}

	return 0;
}
