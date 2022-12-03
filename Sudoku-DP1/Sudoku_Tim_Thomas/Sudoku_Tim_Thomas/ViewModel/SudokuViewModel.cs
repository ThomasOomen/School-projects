using GalaSoft.MvvmLight;
using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.Models.SudokuTypes;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.ViewModel
{
    public class SudokuViewModel : ViewModelBase
    {
        private SudokuBase sudokuBase;

        private ObservableCollection<MainGridViewModel> _sudoku;

        public ObservableCollection<MainGridViewModel> SudokuGrids { get { return _sudoku; } set { _sudoku = value; RaisePropertyChanged("Sudoku"); } }

        public SudokuViewModel(SudokuBase sudoku)
        {
            sudokuBase = sudoku;

            _sudoku = new ObservableCollection<MainGridViewModel>();
            foreach(MainGrid mainGrid in sudoku.gridParts)
            {
                _sudoku.Add(new MainGridViewModel(mainGrid));
            }
        }

        public SudokuBase GetSudokuBase()
        {
            return sudokuBase;
        }

    }
}
