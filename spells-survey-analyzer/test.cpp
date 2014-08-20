#include "test.h"
#include "Measure.h"
#include "EuclideanMeasure.h"
#include "ManhattanMeasure.h"
#include <memory>
#include <cassert>
using namespace std;

void testMeasures();
void testMeasure(shared_ptr<Measure> measure, const DoubleVector &x, const DoubleVector &y, double expect);
void testEuclideanMeasure();

void testAll()
{
	testMeasures();
}

void testMeasures()
{
	testEuclideanMeasure();
}

void testMeasure(shared_ptr<Measure> measure, const DoubleVector &x, const DoubleVector &y, double expect)
{
	assert(measure->ComputeProximity(x, y) == expect);
}

void testEuclideanMeasure()
{
	auto measure = make_shared<EuclideanMeasure>();
	assert(measure->GetName() == L"Euclidean");
	testMeasure(measure, {-1}, {1}, 2);
	testMeasure(measure, {0, 0}, {3, 4}, 5);
}

void testManhattanMeasure()
{
	auto measure = make_shared<ManhattanMeasure>();
	assert(measure->GetName() == L"Manhattan");
	testMeasure(measure, {-1}, {1}, 2);
	testMeasure(measure, {0, 0}, {3, 4}, 7);
}
