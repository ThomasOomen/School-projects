using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class Game
    {
        private int mazeLevel = 0;
        private readonly InputView inputView;
        private readonly OutputView outputView;
        private readonly Parser parser;
        private readonly Maze maze;

        public Game()
        {
            outputView = new OutputView();
            inputView = new InputView();
            parser = new Parser();
            maze = new Maze();

            startUpGame();
        }

        public void startUpGame()
        {
            outputView.showStartUp();
            //als return van getMazelevel -100 wordt exitGame() methode aangeroepen.
            mazeLevel = inputView.getMazeLevel();
            if (mazeLevel != -100)
            {
                playGame();
            }
        }

        public void playGame()
        {
            inputView.AskForInput();
            parser.initMazePath(mazeLevel);
            InitMaze();
            mainGameLoop();
        }

        public void mainGameLoop()
        {
            while(true)
            {
                int input = inputView.ReadInputKey();
                switch(input)
                {
                    case 1:
                        maze.Grid[maze.getTruck.Xposition, maze.getTruck.Yposition].MoveObject = null;
                        maze.truckDirection(input);
                        break;

                    case 2:
                        maze.Grid[maze.getTruck.Xposition, maze.getTruck.Yposition].MoveObject = null;
                        maze.truckDirection(input);
                        break;

                    case 3:
                        maze.Grid[maze.getTruck.Xposition, maze.getTruck.Yposition].MoveObject = null;
                        maze.truckDirection(input);
                        break;

                    case 4:
                        maze.Grid[maze.getTruck.Xposition, maze.getTruck.Yposition].MoveObject = null;
                        maze.truckDirection(input);
                        break;

                    case -101:
                        resetGame();
                        break;

                    case -102:
                        exitGame();
                        break;
                }
                update();
            }


        }

        public void InitMaze()
        {
            maze.Width = parser.calculatetWidthofMaze();
            maze.Height = parser.calculateHeightofMaze();
            
            parser.createMazeArray();
            parser.printArray();
            maze.SetGrid();

            for (int y = 0; y < maze.Height; y++)
            {
                for(int x = 0; x <maze.Width; x++)
                { 
                    char character = parser.getMazeArray()[x, y];
                    maze.createMazeObjects(character, x , y);
                }
            } 
        }

        //Reset het spel (niet geimplementeerd)
        public void resetGame()
        {
            Console.WriteLine("Reset game");
        }

        //Sluit de game.
        public void exitGame()
        {
            Environment.Exit(0);
        }

        public void update()
        {
            this.maze.Grid[this.maze.getTruck.Xposition, this.maze.getTruck.Yposition].MoveObject = this.maze.getTruck;
            for (int i = 0; i < this.maze.Width; i++)
            {
                for (int j = 0; j < this.maze.Height; j++)
                {
                    if (this.maze.Grid[i,j].IsEmpty() && this.maze.Grid[i,j] != null)
                    {
                        this.maze.Grid[i, j].SetDisplayChar();
                    }
                    else if (this.maze.Grid[i, j].MoveObject.toChar() == 'Z' || this.maze.Grid[i, j].MoveObject.toChar() == '$')
                    {
                        maze.GetWakeOrSleep();
                    }
                }
            }
            Console.Clear();
            maze.printArray();
        }
    }
}