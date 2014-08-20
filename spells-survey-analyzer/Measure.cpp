#include "Measure.h"

double Measure::ComputeProximity(const DoubleVector &x, const DoubleVector &y)
{
	if (x.size() != y.size())
	{
		throw std::range_error("x.size() != y.size()");
	}
	if (x.size() < 1)
	{
		throw std::range_error("x.size() < 1");
	}
	return DoComputeProximity(x, y);	
}