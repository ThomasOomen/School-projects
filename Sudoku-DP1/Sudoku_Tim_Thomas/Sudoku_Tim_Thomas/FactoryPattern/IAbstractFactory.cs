using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.FactoryPattern
{
    public interface IAbstractFactory<T>
    {
        Dictionary<string, T> Types { get; set; }

        void FindType();

        void SaveType(string type, T obj);

        T TypeBuilder(string type);
    }
}
