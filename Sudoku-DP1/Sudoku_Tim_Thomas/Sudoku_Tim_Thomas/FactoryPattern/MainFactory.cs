using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.FactoryPattern
{
    class MainFactory : IAbstractFactory<AbstractFactory>
    {
        public Dictionary<string, AbstractFactory> Types { get; set ; }

        public MainFactory()
        {
            Types = new Dictionary<string, AbstractFactory>();
            FindType();
        }

        public void FindType()
        {
            Type[] types = Assembly.GetExecutingAssembly().GetTypes();

            foreach (Type type in types)
            {
                if (type.BaseType == typeof(AbstractFactory))
                {
                    FieldInfo fieldInfo = type.GetField("SUDOKUTYPE");
                    if (fieldInfo == null)
                    {

                    }
                    else
                    {
                        SaveType(fieldInfo.GetValue(null).ToString(), (AbstractFactory)Activator.CreateInstance(type));
                    }
                }
            }
        }

        public void SaveType(string type, AbstractFactory obj)
        {
            Types[type] = obj;
        }

        public AbstractFactory TypeBuilder(string sudokuType)
        {
            Console.WriteLine("voor error sudokuType: ", sudokuType);
            AbstractFactory sudokuClonerDefault = Types[sudokuType];
            return (AbstractFactory)sudokuClonerDefault.Clone();
        }
    }
}
