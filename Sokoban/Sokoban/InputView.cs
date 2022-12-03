using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class InputView
    {
        private int selectedMazelevel;
        private char inputChar;


        //Vraagt naar maze level 1 t/m 4 of naar de character s als de verkeerde wordt ingevuld print ie een ?, anders returnt ie de waarde van het doolhof level
        //als er s ingevuld wordt returnt ie -100, die -100 geeft aan dat de speler wilt stoppen. 
        public int getMazeLevel()
        {
            selectedMazelevel = 0;
            while ((selectedMazelevel < 1 || selectedMazelevel > 7) && inputChar != 's')
            {
                
                Console.WriteLine("|    Kies een doolhof 1 - 6, s = stop                           |");
                Console.WriteLine("________________________________________________________________");

                ConsoleKeyInfo consoleKeyInfo = Console.ReadKey();
                inputChar = consoleKeyInfo.KeyChar;
                Console.WriteLine();
                if (inputChar >= '1' && inputChar <= '6')
                {
                    selectedMazelevel = Convert.ToInt32(char.ToString(consoleKeyInfo.KeyChar));
                }
                    
                else if (inputChar != 's')
                {
                    Console.WriteLine("> ?");
                }
                    
            }
            if (inputChar == 's')
            {
                selectedMazelevel = -100;
            }
                
            return selectedMazelevel;
        }

        //Print line met de vraag of de gebruiker een key wilt indrukken.
        internal void AskForInput()
        {
            Console.WriteLine("> gebruik de pijltjes toetsen om de heftruck te verplaatsen");
            Console.WriteLine("Met 's' kan je stoppen, met 'r' kan je de game resetten");
        }

        /* 
        Leest input van speler om daarna, returnt daarna een int value, de int value bepaald welke
        richting de speler opgaat.
        Links  = 1
        Omhoog = 2
        Rechts = 3
        Down   = 4
        Reset  = -101
        Stop   = -102
        */
        public int ReadInputKey()
        {

            bool flag = true;
            ConsoleKey playerInput = ConsoleKey.Escape;
            while (flag)
            {
                playerInput = Console.ReadKey().Key;
                switch(playerInput)
                {
                    case ConsoleKey.LeftArrow:
                    case ConsoleKey.UpArrow:
                    case ConsoleKey.RightArrow:
                    case ConsoleKey.DownArrow:
                    case ConsoleKey.R:
                    case ConsoleKey.S:
                        flag = false;
                        continue;
                    default:
                        Console.WriteLine("> ?");
                        continue;
                }
            }

            switch (playerInput)
            {
                case ConsoleKey.LeftArrow:
                    return 1;
                case ConsoleKey.UpArrow:
                    return 2;
                case ConsoleKey.RightArrow:
                    return 3;
                case ConsoleKey.DownArrow:
                    return 4;
                case ConsoleKey.R:
                    return -101;
                case ConsoleKey.S:
                    return -102;
                default:
                    return 100000;
            }

        }
    }
}