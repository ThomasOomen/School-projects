using Sudoku_Tim_Thomas.VisitorPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Models
{
    public interface IGridPart
    {
        bool Validated { get; set; }

        int x_row { get; set; }

        int y_column { get; set; }

        void Accept(IVisitor visitor);
    }
}
