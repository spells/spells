{{##def.header:
namespace spells
{
	namespace feature
	{
		namespace {{=feature.name}}
		{
			void {{=method.nameCamel}}({{=method.arguments}});
			namespace on
			{
				void {{=method.namePascal}}({{=method.arguments}});
			}
		}
	}
}
#}}