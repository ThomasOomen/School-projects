using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    public class GameView
    {
        public GameController _Controller;

        public GameView(GameController controller)
        {
            this._Controller = controller;
        }
        //print game info
        public void Introduction()
        {
            Console.WriteLine();
            Console.WriteLine("|--------- Welkom bij Goudkoorts ---------|");
            Console.WriteLine();
            Console.WriteLine("|--------------- Toelichting--------------|");
            Console.WriteLine("|- Door op de toetsen 1 t/m 5 te drukken  |");
            Console.WriteLine("|- Kun je de rails verwisselen van standen|");
            Console.WriteLine("|-----------------------------------------|");
        }

        //Read user input
        public ConsoleKey GetInput()
        {
            ConsoleKey playerInput = Console.ReadKey().Key;
            return playerInput;
        }

        //print gamefield
        public void ShowGameField(Track track)
        {
            Console.BackgroundColor = track.BackgroundColor;
            Console.ForegroundColor = track.ForegroundColor;
            Console.Write(track.ToChar());
        }

        public void Legend()
        {
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("Switch track 1: Knop 1");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Switch track 2: Knop 2");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.WriteLine("Switch track 3: Knop 3");
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Switch track 4: Knop 4");
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine("Switch track 5: Knop 5");
            Console.ResetColor();
            Console.WriteLine("Points:" + _Controller.getGameScore());

        }
    }
}