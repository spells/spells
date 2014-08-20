#pragma once

#include <cmath>
#include "Measure.h"

class EuclideanMeasure : public Measure
{
public:
	std::wstring GetName()
	{
		return L"Euclidean";
	}

protected:
	double DoComputeProximity(const DoubleVector &x, const DoubleVector &y)
	{
		double result = 0;
		for (int i = 0; i < x.size(); i++)
		{
			result += (x[i] - y[i]) * (x[i] - y[i]);
		}
		return sqrt(result);
	}
};