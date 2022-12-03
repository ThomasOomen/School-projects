using Sudoku_Tim_Thomas.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Helpers
{
    class SolveSudoku : IHelperBase
    {
        private MainViewModel _mainVM;

        public SolveSudoku(MainViewModel mainVM)
        {
            this._mainVM = mainVM;
        }   

        public void Execute()
        {
            throw new NotImplementedException();
        }
    }
}
