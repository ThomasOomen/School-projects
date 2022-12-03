using Sudoku_Tim_Thomas.VisitorPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Models
{
    public class MainGrid : SudokuCompound
    {
        public MainGrid(int id) : base()
        {
            Id = id;
        }
        public override void Accept(IVisitor visitor)
        {
            base.Accept(visitor);

            visitor.VisitMainGrid(this);
        }
    }
}
