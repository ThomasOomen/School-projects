
using Sudoku_Tim_Thomas.Helpers;
using System;
using System.Collections.Generic;
using System.Windows.Input;
using Microsoft.Win32;
using System.IO;
using System.Collections.ObjectModel;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;

namespace Sudoku_Tim_Thomas.ViewModel
{

    public class MainViewModel : ViewModelBase
    {
        private SudokuViewModel _sudoku;

        public SudokuViewModel Sudoku { get { return _sudoku; } set { _sudoku = value; RaisePropertyChanged("Sudoku"); } }


        public ICommand ExecuteHelpers { get; set; }
        public ICommand ExecuteCustomCommand { get; set; }

        //private Dictionary<string, IHelperBase> _helper;
        private Dictionary<string, IHelperBase> _helpers;


        public MainViewModel()
        {
            CreateHelpers();
            ExecuteHelpers = new RelayCommand<string>(ExecuteHelper);
        }

        private void ExecuteHelper(string helper)
        {
            _helpers[helper].Execute();
        }

        private void CreateHelpers()
        {
            _helpers = new Dictionary<string, IHelperBase>() {
                { "LoadSudoku", new OpenSudoku(this) },
                { "ModifyState", new ModifyState(this)},
                { "SolveSudoku", new SolveSudoku(this) },
                { "ValidateSudoku", new ValidateSudoku(this) }
            };

            Console.WriteLine(_helpers);
        }
    }
}