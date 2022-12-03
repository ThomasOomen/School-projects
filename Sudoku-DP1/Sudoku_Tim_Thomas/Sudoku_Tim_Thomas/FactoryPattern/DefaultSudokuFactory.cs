using Sudoku_Tim_Thomas.SudokuBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.FactoryPattern
{
    class DefaultSudokuFactory : AbstractFactory, IAbstractFactory<ISudokuClonerDefault>
    {
        public Dictionary<string, ISudokuClonerDefault> Types { get; set; }
        public const string SUDOKUTYPE = "Default";
        public DefaultSudokuFactory()
        {
            Types = new Dictionary<string, ISudokuClonerDefault>();
            FindType();
        }

        public override AbstractFactory Clone()
        {
            return (DefaultSudokuFactory)MemberwiseClone();
        }

        public ISudokuClonerDefault TypeBuilder(string sudokuType)
        {
            ISudokuClonerDefault sudokuClonerDefault = Types[sudokuType];
            return sudokuClonerDefault.Clone();
        }

        public void FindType()
        {
            Type[] types = Assembly.GetExecutingAssembly().GetTypes();

            foreach (Type type in types)
            {
                if (type.GetInterfaces().Contains(typeof(ISudokuClonerDefault)))
                {
                    FieldInfo fieldInfo = type.GetField("SUDOKUTYPE");
                    if (fieldInfo == null)
                    {

                    }
                    else
                    {
                        SaveType(fieldInfo.GetValue(null).ToString(), 
                        (ISudokuClonerDefault)Activator.CreateInstance(type));
                    }
                }
            }
        }

        public void SaveType(string type, ISudokuClonerDefault obj)
        {
            Console.WriteLine("obj: ", obj);
            Types[type] = obj;
            Console.WriteLine("type: ", Types);
        }
    }
}
