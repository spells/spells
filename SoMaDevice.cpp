#include <iostream>
#include <vector>
using namespace std;

int main()
{
	vector<int> products = { 44, 418, 363, 454 };
	int price = 2181;
	vector<vector<vector<int>>> table(price + 1);
	table[0].push_back(vector<int>());

	for (auto &product : products)
	{
		cout << product << endl;
		for (int i = 0; i <= price; i++)
		{
			if (table[i].size())
			{
				int j = i + product;
				if (j >= table.size())
				{
					continue;
				}
				for (int p = 0; p < table[i].size(); p++)
				{
					vector<int> push = table[i][p];
					push.push_back(product);
					table[j].push_back(push);
				}
			}
		}
	}
	cout << endl;

	cout << table[price].size() << endl << endl;
	for (int i = 0; i < table[price].size(); i++)
	{
		for (auto &product : table[price][i])
		{
			cout << product << " ";
		}
		cout << endl;
	}

	return 0;
}
