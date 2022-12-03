using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.Models.SudokuTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.VisitorPattern
{
    public interface IVisitor
    {
        void VisitMainGrid(MainGrid maingrid);
        void VisitCell(Cell cell);
        void visitGrid(Grid grid);
        void VisitSudoku(SudokuBase sudokuBase);
    }


}
