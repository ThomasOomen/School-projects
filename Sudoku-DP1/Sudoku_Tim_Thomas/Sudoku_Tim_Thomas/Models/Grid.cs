using Sudoku_Tim_Thomas.VisitorPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Models
{
    public class Grid : SudokuCompound
    {
        public Grid(int id) : base()
        {
            Id = id;
        }

        public override void Accept(IVisitor visitor)
        {
            base.Accept(visitor);

            visitor.visitGrid(this);
        }

        // TODO Message?
    }
}

