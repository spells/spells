#include <vector>
#include <mlpack/methods/kmeans/kmeans.hpp>
using namespace mlpack::kmeans;
using namespace std;
using namespace arma;
#include "kmeans.h"

void kMeans(const vector<vector<double> > &input, size_t clusters)
{
	mat data(input[0].size(), input.size());
	for (int j = 0; j < input[0].size(); j++)
	{
		for (int i = 0; i < input.size(); i++)
		{
			data(j, i) = input[i][j];
		}
	}

	mat centroids;
	Col<size_t> assignments;

	KMeans<mlpack::metric::ManhattanDistance> k;
	k.Cluster(data, clusters, assignments, centroids);

	cout << "군집의 수가 " << clusters << "개인 경우: " << endl << endl;

	cout << "응답이 속한 군집: " << endl;
	for (int i = 0; i < input.size(); i++)
	{
		cout << i << ": " << assignments(i) << endl;
	}
	cout << endl << endl;

	cout << "군집의 도심: " << endl;
	for (int i = 0; i < clusters; i++)
	{
		cout << i << ": " << centroids(i) << endl;
	}
	cout << endl << endl;

	cout << "군집 정보: " << endl;
	vector<vector<int> > clusterData(clusters);
	for (int i = 0; i < input.size(); i++)
	{
		clusterData[assignments(i)].push_back(i);
	}
	for (int i = 0; i < clusterData.size(); i++)
	{
		cout << i << ":" << endl;
		for (int j = 0; j < clusterData[i].size(); j++)
		{
			cout << "  " << clusterData[i][j] << ": ";
			for (int k = 0; k < input[0].size(); k++)
			{
				cout << input[clusterData[i][j]][k] << " ";
			}
			cout << endl;
		}
	}
	cout << endl << endl;

	// 마지막
	cout << endl;
}
