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
    public class JigsawSudokuBuilder: ISudokuClonerDefault
    {
        BuildSudokuBoard buildSudokuBoard;
        public const string SUDOKUTYPE = "NonDefault";

        public ISudokuClonerDefault Clone()
        {
            return (JigsawSudokuBuilder)MemberwiseClone();
        }

        public SudokuBase Build(string file)
        {
            MainGrid sudokuBoard = buildSudokuBoard.InitializeBoard();
            Dictionary<string, int> gridInfo = buildSudokuBoard.GetGridWidth(file, "jigsaw");

            string fileLines = File.ReadAllLines(file)[0];
            string[] lines = fileLines.Split('=');

            sudokuBoard = compileBoard(sudokuBoard, gridInfo, lines);

            return new Jigsaw(sudokuBoard);
        }

        private MainGrid compileBoard(MainGrid sudokuBoard, Dictionary<string, int> gridInfo,string[] lines)
        {
            int gridWidth = gridInfo["gridWidth"];
            Grid[] fields = new Grid[gridWidth];

            string[] colors = new string[] {
            "blue",
            "green",
            "yellow",
            "red",
            "orange",
            "cyan",
            "purple",
            "pink",
            "brown"
            };

            for(int i = 0; i < gridWidth; i++)
            {
                fields[i] = new Grid(i);
            }

            for(int i = 1; i < lines.Length; i++)
            {
                int boardRegNr = (int)Char.GetNumericValue(lines[i].Split('J')[1][0]);
                int c = (int)Char.GetNumericValue(lines[i].Split('J')[0][0]);
                Cell cell = new Cell(
                    c,
                    gridWidth,
                    gridInfo["sudokuXRow"],
                    gridInfo["sudokuYColumn"],
                    colors[gridInfo["boardRegNr"]]
                );
                fields[boardRegNr].gridParts.Add(cell);

                if (gridInfo["sudokuXRow"] + 1 == gridWidth)
                {
                    gridInfo["sudokuXRow"] = 0;
                    gridInfo["sudokuYColumn"]++;
                }
                else
                {
                    gridInfo["sudokuXRow"]++;
                }
            }

            foreach(Grid grid in fields)
            {
                sudokuBoard.gridParts.Add(grid);
            }

            return sudokuBoard;

        }
    }
}
