#pragma once

#include <cmath>
#include "Measure.h"

class ManhattanMeasure : public Measure
{
public:
	std::wstring GetName()
	{
		return L"Manhattan";
	}

protected:
	double DoComputeProximity(const DoubleVector &x, const DoubleVector &y)
	{
		double result = 0;
		for (int i = 0; i < x.size(); i++)
		{
			result += std::abs(x[i] - y[i]);
		}
		return result;
	}
};