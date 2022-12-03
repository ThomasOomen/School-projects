using Sudoku_Tim_Thomas.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.SudokuBuilder
{
    public class BuildSudokuBoard
    {
        public MainGrid InitializeBoard()
        {
            MainGrid sudokuBoard = new MainGrid(0);

            //Board start location.
            sudokuBoard.x_row = 200;
            sudokuBoard.y_column = 200;

            return sudokuBoard;
        }

        public Dictionary<string, int> GetGridWidth(string file, string type)
        {
            Dictionary<string, int> gridInfo = new Dictionary<string, int>();
            string line = File.ReadAllLines(file)[0];
            int gridWidth = 0;
            switch (type)
            {
                case "normal":
                    gridWidth = (int)Math.Sqrt(line.Length);
                    gridInfo.Add("gridWidth", gridWidth);
                    gridInfo.Add("boardStart", 0);
                    gridInfo.Add("boardXRow", -1);
                    gridInfo.Add("boardYColumn", 0);
                    gridInfo.Add("currXRow", -1);
                    gridInfo.Add("sudokuXRow", -1);
                    gridInfo.Add("sudokuYColumn", 0);
                    gridInfo.Add("boardRegNr", 0);
                    break;

                case "jigsaw":
                    gridWidth = (int)Math.Sqrt(line.Length);
                    gridInfo.Add("gridWidth", gridWidth);
                    gridInfo.Add("sudokuXRow", -1);
                    gridInfo.Add("sudokuYColumn", 0);

                    break;

                case "samurai":
                    break;

                default:
                    gridWidth = 0;
                    break;
            }

            return gridInfo;
        }
    }
}
