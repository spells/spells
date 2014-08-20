#pragma once

#include <vector>
#include <string>
#include <stdexcept>
#include "SpellsSurvey.h"

class Measure
{
public:
	virtual std::wstring GetName() = 0;
	double ComputeProximity(const DoubleVector &x, const DoubleVector &y);
protected:
	virtual double DoComputeProximity(const DoubleVector &x, const DoubleVector &y) = 0;	
};
