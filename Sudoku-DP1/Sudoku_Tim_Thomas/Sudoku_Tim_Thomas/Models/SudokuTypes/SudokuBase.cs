using Sudoku_Tim_Thomas.VisitorPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Models.SudokuTypes
{
    public abstract class SudokuBase : SudokuCompound
    {
        public SudokuBase(List<MainGrid> grids): base(new List<IGridPart>(grids))
        {

        }

        public SudokuBase(MainGrid grid): base(grid)
        {

        }

        public override void Accept(IVisitor visitor)
        {
            base.Accept(visitor);

            visitor.VisitSudoku(this);
        }
    }
}
