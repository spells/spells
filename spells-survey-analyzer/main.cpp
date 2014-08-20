#include <iostream>
#include <fstream>
#include <sstream>
#include <memory>
#include <vector>
#include <string>
using namespace std;

#include "test.h"
#include "SpellsSurvey.h"

#include <mlpack/methods/kmeans/kmeans.hpp>

void readInputFile(vector<DoubleVector> *input)
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

void normalizeDoubleVector(DoubleVector *doubleVector)
{
	double sum = 0;
	for (const double &value : *doubleVector)
	{
		sum += value;
	}
	if (sum == 0)
	{
		return;
	}
	for (double &value : *doubleVector)
	{
		value /= sum;
	}
}

void normalizeInput(vector<DoubleVector> *input)
{
	for (DoubleVector &vector : *input)
	{
		normalizeDoubleVector(&vector);
	}
}

void kMeans(const vector<DoubleVector> &input)
{

}

int main()
{
	testAll();

	vector<DoubleVector> input;
	readInputFile(&input);
	normalizeInput(&input);
	kMeans(&input);

	return 0;
}
