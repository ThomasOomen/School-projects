using Sudoku_Tim_Thomas.Models.SudokuTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.SudokuBuilder
{
    public interface ISudokuClonerNonDefault
    {
        ISudokuClonerNonDefault Clone();

        SudokuBase Build(string file);

    }
}
