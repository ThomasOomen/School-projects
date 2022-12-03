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
    public class MainGridViewModel : ViewModelBase
    {
        private MainGrid _grid;

        private ObservableCollection<GridViewModel> _grids;

        public ObservableCollection<GridViewModel> Grids { get { return _grids; } set { _grids = value; RaisePropertyChanged("Grids"); } }
        public int XRow { get { return _grid.x_row; } set { _grid.x_row = value; RaisePropertyChanged("XRow"); } }
        public int YColumn { get { return _grid.y_column; } set { _grid.y_column = value; RaisePropertyChanged("YColumn"); } }

        public MainGridViewModel(MainGrid grid)
        {
            _grid = grid;
            _grids = new ObservableCollection<GridViewModel>();
            foreach(Grid grids in grid.gridParts)
            {
                _grids.Add(new GridViewModel(grids));
            }
        }

        public MainGrid GetMainGrid()
        {
            return _grid;
        }
    }
}
