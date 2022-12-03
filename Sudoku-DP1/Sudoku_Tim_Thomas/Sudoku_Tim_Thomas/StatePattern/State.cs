using Sudoku_Tim_Thomas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.State
{
    public abstract class State
    {
        public abstract int ChangeCellValue(Cell cell, int newCellValue);
    }
}
