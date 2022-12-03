using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.StatePattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.State
{
    class HelperState : State
    {
        public override int ChangeCellValue(Cell cell, int newCellValue)
        {
            if(cell.cellState != StateTypes.HELPER)
            {
                return cell.cellValue;
            }

            if(cell.cellValue == newCellValue)
            {
                cell.cellState = StateTypes.HELPER;
                return 0;
            }

            cell.cellState = StateTypes.HELPER;
            return newCellValue;
        }


    }
}
