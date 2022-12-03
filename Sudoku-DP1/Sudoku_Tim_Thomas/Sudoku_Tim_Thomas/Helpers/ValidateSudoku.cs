using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.Helpers
{
    class ValidateSudoku : IHelperBase
    {
        private MainViewModel _mainVM;
        private MainGridViewModel _mainGridVM;
        private MainGrid mainGrid;
        private bool validated = false;

        public ValidateSudoku(MainViewModel mainVM)
        {
            this._mainVM = mainVM;
        }
        public void Execute()
        {
            _mainGridVM.GetMainGrid();

            foreach (Grid grid in mainGrid.gridParts)
            {
                Dictionary<int, List<int>> integersX = new Dictionary<int, List<int>>();
                Dictionary<int, List<int>> integersY = new Dictionary<int, List<int>>();
                foreach (Cell cell in grid.gridParts)
                {
                    if (!integersX.ContainsKey(cell.x_row))
                    {
                        integersX.Add(cell.x_row, new List<int>());
                    }
                    if (!integersY.ContainsKey(cell.y_column))
                    {
                        integersY.Add(cell.y_column, new List<int>());
                    }

                    if (!integersX[cell.x_row].Contains(cell.cellValue))
                    {
                        integersX[cell.x_row].Add(cell.cellValue);
                    }
                    else
                    {
                        validated = false;
                    }

                    if (!integersY[cell.y_column].Contains(cell.cellValue))
                    {
                        integersY[cell.y_column].Add(cell.cellValue);
                    }
                    else
                    {
                        validated = false;
                    }
                }
            }
            Console.WriteLine("MainGrid validation: " + validated);
        }
    }
}
