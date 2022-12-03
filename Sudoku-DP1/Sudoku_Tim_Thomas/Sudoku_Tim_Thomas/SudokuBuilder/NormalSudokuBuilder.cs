using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sudoku_Tim_Thomas.Models;
using Sudoku_Tim_Thomas.Models.SudokuTypes;

namespace Sudoku_Tim_Thomas.SudokuBuilder
{
    public class NormalSudokuBuilder : ISudokuClonerDefault
    {
        BuildSudokuBoard buildSudokuBoard;
        public const string SUDOKUTYPE = "NormalSudoku";
        public ISudokuClonerDefault Clone()
        {
            return (NormalSudokuBuilder)MemberwiseClone();
        }

        public SudokuBase Build(string file)
        {
            buildSudokuBoard = new BuildSudokuBoard();
            MainGrid sudokuBoard = buildSudokuBoard.InitializeBoard();
            Dictionary<string, int> gridInfo = buildSudokuBoard.GetGridWidth(file, "normal");
            string fileLines = File.ReadAllLines(file)[0];

            double regRow = gridInfo["gridWidth"] / (gridInfo["gridWidth"] / Math.Floor(Math.Sqrt(gridInfo["gridWidth"])));
            double rowSize = gridInfo["gridWidth"] / regRow;

            sudokuBoard = compileBoard(sudokuBoard, gridInfo, rowSize, regRow, fileLines);

            return new Normal(sudokuBoard);
        }

        private MainGrid compileBoard(MainGrid sudokuBoard, Dictionary<string, int> gridInfo, double rowSize, double regRow, string fileLines)
        {
            int gridWidth = gridInfo["gridWidth"];
            Grid[] fields = new Grid[gridWidth];

            string[] colors = new string[] {
            "blue",
            "green",
            "yellow",
            "red",
            };

            for (int i = 0; i < gridWidth; i++)
            {
                fields[i] = new Grid(i);
            }

            foreach(char c in fileLines)
            {
                if(gridInfo["currXRow"] >= gridWidth - 1)
                {
                    gridInfo["sudokuYColumn"]++;
                    gridInfo["sudokuXRow"] = 0;

                    if(gridInfo["boardYColumn"] >= regRow -1)
                    {
                        gridInfo["boardXRow"] = 0;
                        gridInfo["currXRow"] = 0;
                        gridInfo["boardYColumn"] = 0;
                        gridInfo["boardRegNr"]++;
                        gridInfo["boardStart"] = gridInfo["boardRegNr"];
                    }
                    else
                    {
                        gridInfo["boardXRow"] = 0;
                        gridInfo["currXRow"] = 0;
                        gridInfo["boardYColumn"]++;
                        gridInfo["boardRegNr"] = gridInfo["boardStart"];
                    }
                }
                else
                {
                    if(gridInfo["boardXRow"] >= rowSize -1)
                    {
                        gridInfo["boardXRow"] = -1;
                        gridInfo["boardXRow"]++;
                    }
                    gridInfo["boardXRow"]++;
                    gridInfo["currXRow"]++;
                    gridInfo["sudokuXRow"]++;
                }

                Cell cell = new Cell(
                    (int)Char.GetNumericValue(c), 
                    gridWidth, 
                    gridInfo["sudokuXRow"], 
                    gridInfo["sudokuYColumn"], 
                    colors[gridInfo["boardRegNr"]]
                );

                fields[gridInfo["boardRegNr"]].gridParts.Add(cell);
            }

            foreach(Grid grid in fields)
            {
                sudokuBoard.gridParts.Add(grid);
            }

            return sudokuBoard;
        }
    }
}
