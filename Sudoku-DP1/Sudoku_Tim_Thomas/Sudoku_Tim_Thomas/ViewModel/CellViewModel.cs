using GalaSoft.MvvmLight;
using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.State;
using Sudoku_Tim_Thomas.StatePattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.ViewModel
{
    public class CellViewModel : ViewModelBase
    {
        private Cell _cell;

        public string cellValue
        {
            get
            {
                return _cell.cellValue > 0 ? _cell.cellValue.ToString() : "";
            }
            set
            {
                int tempCellValue;
                if(Int32.TryParse(value, out tempCellValue))
                {
                    if(tempCellValue <= _cell.cellMaxValue && tempCellValue >= 0)
                    {
                        _cell.cellValue = Manager.Instance().CurrentState.ChangeCellValue(_cell, tempCellValue);
                        RaisePropertyChanged("cellValue");
                    }
                }
            }
        }

        private int _xRow, _yColumn;
        public int XRow { get { return _xRow; } set { _xRow = value * Size; } }
        public int YColumn { get { return _yColumn; } set { _yColumn = value * Size; } }

        public StateTypes stateTypes { get { return _cell.cellState; } set { _cell.cellState = value; RaisePropertyChanged("cellState"); RaisePropertyChanged("ForegroundColor"); } }

        public int Size { get { return 50; } }

        public string CellColor { get { return _cell.cellColor; } set { _cell.cellColor = value; } }

        public CellViewModel(Cell cell)
        {
            _cell = cell;
            XRow = cell.x_row;
            YColumn = cell.y_column;
        }
    }
}
