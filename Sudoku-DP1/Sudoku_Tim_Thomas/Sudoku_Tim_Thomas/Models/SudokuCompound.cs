using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sudoku_Tim_Thomas.VisitorPattern;

namespace Sudoku_Tim_Thomas.Models
{
    public abstract class SudokuCompound : IGridPart
    {
        public List<IGridPart> gridParts { get; set; }

        public int Id {get; set;}

        public bool Validated { get; set; }
        public int x_row { get; set; }
        public int y_column { get; set ; }

        public SudokuCompound(List<IGridPart> grids)
        {
            gridParts = grids;
        }

        public SudokuCompound(IGridPart gridPart)
        {
            gridParts = new List<IGridPart>();
            gridParts.Add(gridPart);
        }

        public SudokuCompound()
        {
            gridParts = new List<IGridPart>();
        }

        public virtual void Accept(IVisitor visitor)
        {
            foreach (IGridPart child in gridParts)
            {
                child.Accept(visitor);
            }
        }
    }
}

// TODO Messages nog toevoegen.
