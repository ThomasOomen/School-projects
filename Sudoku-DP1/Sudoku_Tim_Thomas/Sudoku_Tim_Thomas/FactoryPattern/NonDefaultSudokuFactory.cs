using Sudoku_Tim_Thomas.SudokuBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.FactoryPattern
{
    class NonDefaultSudokuFactory : AbstractFactory, IAbstractFactory<ISudokuClonerNonDefault>
    {
        public Dictionary<string, ISudokuClonerNonDefault> Types { get; set; }
        public const string SUDOKUTYPE = "NonDefault";

        public NonDefaultSudokuFactory()
        {
            Types = new Dictionary<string, ISudokuClonerNonDefault>();
            FindType();
        }

        public override AbstractFactory Clone()
        {
            return (NonDefaultSudokuFactory)MemberwiseClone();
        }

        public ISudokuClonerNonDefault TypeBuilder(string sudokuType)
        {
            ISudokuClonerNonDefault sudokuClonerNonDefault = Types[sudokuType];
            return sudokuClonerNonDefault.Clone();
        }

        public void FindType()
        {
            Type[] types = Assembly.GetExecutingAssembly().GetTypes();

            foreach(Type type in types)
            {
                if (type.GetInterfaces().Contains(typeof(ISudokuClonerNonDefault)))
                {
                    FieldInfo fieldInfo = type.GetField("SUDOKUTYPE");
                    if(fieldInfo == null)
                    {

                    }
                    else
                    {
                        SaveType(fieldInfo.GetValue(null).ToString(), 
                        (ISudokuClonerNonDefault)Activator.CreateInstance(type));
                    }
                }
            }
        }

        public void SaveType(string type, ISudokuClonerNonDefault obj)
        {
            Console.WriteLine("obj: ", obj);
            Types[type] = obj;
            Console.WriteLine("type: ", Types);
        }
    }
}
