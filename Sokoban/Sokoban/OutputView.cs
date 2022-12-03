using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class OutputView
    {
        public OutputView()
        {

        }
        public void showStartUp()
        {
            Console.WriteLine("________________________________________________________________");
            Console.WriteLine("|    Sokoban                                                    |");
            Console.WriteLine("|                                                               |");
            Console.WriteLine("|    Betekenis van de symbolen:                                 |");
            Console.WriteLine("|    # : muur                                                   |");
            Console.WriteLine("|    . : vloer                                                  |");
            Console.WriteLine("|    O : krat                                                   |");
            Console.WriteLine("|    0 : krat op bestemming                                     |");
            Console.WriteLine("|    x : bestemming                                             |");
            Console.WriteLine("|    @ : truck                                                  |");
            Console.WriteLine("|                                                               |");
            Console.WriteLine("|    Doel van het spel:                                         |");
            Console.WriteLine("|    Duw met de truck de kratten naar de bestemming             |");
            Console.WriteLine("|                                                               |");
            Console.WriteLine("|    Je kan de truck verplaatsen met de pijltjes toetsen        |");
            Console.WriteLine("|                                                               |");
            Console.WriteLine("________________________________________________________________");
        }
    }
}