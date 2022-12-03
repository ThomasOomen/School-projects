using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Goudkoorts
{
    public class GameController
    {
        private GameView _view;
        private Game _game;
        private Thread _ForeGroundGameLoop; 

        public GameController()
        {
            initializeGame();
        }

        //Initialize game, build playfield
        public void initializeGame()
        {
            _view = new GameView(this);
            _game = new Game();
            _view.Introduction();
            _game.CreateWareHouseList();
            _game.initializeGame();
            _game.LinkTracks();
            _ForeGroundGameLoop = new Thread(new ThreadStart(ForeGroundGameLoop));
            _ForeGroundGameLoop.Start();
            
            Console.WriteLine("WAREHOUSE LIST" + _game.GetWareHouseList().Count);
            runGame();
        }

        private void ForeGroundGameLoop()
        {
            while(true)
            {
                TrackSwitcher(_view.GetInput()); //moet nog gebruikt worden om switchtracks te verplaatsen.
            }
            
        }

        private void TrackSwitcher(ConsoleKey input)
        {
            _game.SwitchDirections(input);
        }

        //Main loop for running the game. //hier in moet de functies voor de carts en ship komen te staan. 
        public void runGame()
        {
            while (true)
            {
                _game.MoveCarts();
                _game.SpawnCarts();
                _game.LoadShip();
                _game.DepartShip();
                _game.updatePoints();
                GetGameField();
                Thread.Sleep(-20 * _game.Points + 1500); 
                Console.Clear();
                Thread.Sleep(100);
            }
        }

        public int getGameScore()
        {
            return _game.updatePoints();
        }
        public void GetGameField()
        {
            for (int y = 0; y < 9; y++)
            {
                for (int x = 0; x < 12; x++)
                {
                    _view.ShowGameField(_game.GetGameField(x, y));
                }
                Console.WriteLine();
            }
            _view.Legend();
        }
    }
}