using GalaSoft.MvvmLight;
using Sudoku_Tim_Thomas.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.ViewModel
{
    public class GridViewModel: ViewModelBase
    {
        private Grid _grid;

        private ObservableCollection<CellViewModel> _cells;

        public ObservableCollection<CellViewModel> Cells { get { return _cells; } set { _cells = value; RaisePropertyChanged("Cells"); } }

        public GridViewModel(Grid grid)
        {
            _grid = grid;

            _cells = new ObservableCollection<CellViewModel>();
            foreach(Cell c in grid.gridParts)
            {
                _cells.Add(new CellViewModel(c));
            }
        }


    }
}
