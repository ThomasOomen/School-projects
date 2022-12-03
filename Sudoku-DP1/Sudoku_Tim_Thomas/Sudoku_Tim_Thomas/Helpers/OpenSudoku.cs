using Microsoft.Win32;
using Sudoku_Tim_Thomas.FactoryPattern;
using Sudoku_Tim_Thomas.Models.SudokuTypes;
using Sudoku_Tim_Thomas.SudokuBuilder;
using Sudoku_Tim_Thomas.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Helpers
{
    class OpenSudoku : IHelperBase
    {
        private MainFactory _mainFactory;
        private MainViewModel _mainVM;
        string curDirectory;
        OpenFileDialog openFileDialog;
        private string _fileName;

        public OpenSudoku(MainViewModel mainVM)
        {
            _mainFactory = new MainFactory();
            this._mainVM = mainVM;
        }

        public void Execute()
        {
            curDirectory = Environment.CurrentDirectory;
            openFileDialog = new OpenFileDialog();
            openFileDialog.InitialDirectory = Directory.GetParent(curDirectory).Parent.FullName + "\\Files";
            if (openFileDialog.ShowDialog()== true)
            {
                SudokuBase sudokuBase;
                if(openFileDialog.FileName.Contains("4x4") || openFileDialog.FileName.Contains("6x6")  || openFileDialog.FileName.Contains("9x9"))
                {
                    sudokuBase = InitDefaultSudoku(openFileDialog.FileName);
                }
                else
                {
                    Console.WriteLine(openFileDialog.FileName);
                    sudokuBase = InitNonDefaultSudoku(openFileDialog.FileName);
                }
                
                _mainVM.Sudoku = new SudokuViewModel(sudokuBase);

            }
        }

        private SudokuBase InitDefaultSudoku(string sudokuType)
        {

            DefaultSudokuFactory defaultSudokuFactory = (DefaultSudokuFactory)_mainFactory.TypeBuilder("Default");
            ISudokuClonerDefault sudokuClonerDefault = defaultSudokuFactory.TypeBuilder("NormalSudoku");
            return sudokuClonerDefault.Build(sudokuType);
        }

        private SudokuBase InitNonDefaultSudoku(string sudokuType)
        {
            NonDefaultSudokuFactory nonDefaultSudokuFactory = (NonDefaultSudokuFactory)_mainFactory.TypeBuilder("NonDefault");
            ISudokuClonerNonDefault sudokuClonerNonDefault = nonDefaultSudokuFactory.TypeBuilder("NonDefault");
            return sudokuClonerNonDefault.Build(sudokuType);
        }
    }
}
