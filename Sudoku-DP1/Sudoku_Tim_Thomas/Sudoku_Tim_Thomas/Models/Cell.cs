using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sudoku_Tim_Thomas.StatePattern;
using Sudoku_Tim_Thomas.VisitorPattern;

namespace Sudoku_Tim_Thomas.Models
{
    public class Cell : IGridPart
    {
        public Cell(int value, int maxValue, int cell_x_row, int cell_y_column, string color)
        {
            cellValue = value;
            cellMaxValue = maxValue;
            x_row = cell_x_row;
            y_column = cell_y_column;
            defineValue(cellValue);
        }
        public bool Validated { get; set; }
        public int x_row { get; set; }
        public int y_column { get; set; }
        public int cellValue { get; set; }
        public int cellMaxValue { get; set; }

        public StateTypes cellState { get; set; }

        public string cellColor { get; set; }
        //Add message
        public string message { get { return $"Cell {x_row}, {y_column} met waarde {cellValue} kan niet"; } }

       
        public void Accept(IVisitor visitor)
        {
            visitor.VisitCell(this);
        }

        public void defineValue(int cellValue)
        {
            if (cellValue < 0)
            {
                cellState = StateTypes.HELPER;
            } else
            {
                cellState = StateTypes.INITIAL;
            }
        }
    }
}
