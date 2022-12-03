using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace Sokoban
{
    public class Parser
    {
        private int _path;
        private int _widthMaze;
        private int _heightMaze;
        private int _j = 0; //Spaghetti code :)
        private int _i = 0; //Spaghetti code :)
        private StreamReader _streamReader;


        //2d array waarin alle characters ingezet worden. 
        private Char[,] mazeCharArray;

        //initialeerd het path van de maze. speler moet wel het spel opnieuw opstarten als ie een ander doolhof wilt spelen. 
        public void initMazePath(int mazeLevel)
        {
            _path = mazeLevel;
            this._streamReader = new StreamReader(@"doolhof" + _path + ".txt");
        }

        //Leest breed een 1 regel is van het doolhof.(breedte van een regel)
        public int calculatetWidthofMaze()
        {
            string widthMaze = this._streamReader.ReadLine();
            this._widthMaze = widthMaze.Length;
            return this._widthMaze;
        }

        //leest hoog het doolhof is. (lengte van een colom).
        public int calculateHeightofMaze()
        {
            int heightMaze = File.ReadAllLines(@"doolhof" + _path + ".txt").Length;
            this._heightMaze = heightMaze;
            return this._heightMaze;
        }

        //Loopt door iedere lijn in het text bestand en haalt iedere character los van elkaar. (staan nog prints).
        public void createMazeArray()
        {
            mazeCharArray = new Char[calculatetWidthofMaze(), calculateHeightofMaze()];
            foreach (string line in File.ReadAllLines(@"doolhof" + _path + ".txt"))
            {
                //Console.WriteLine("in Line staat nu " + line);
                //Console.ReadLine();

                foreach (var character in line)
                {
                    //Console.WriteLine("in character staat nu " + character);
                    addCharacterToArray(character);
                }

                _i = 0;
                _j++;
            }

        }

        //Vult de array met characters die los van elkaar gehaald zijn in de methode hierboven (createMazeArray())
        private void addCharacterToArray(char character)
        {
            //Console.WriteLine("character dat mee gegeven is " + character);
            //Console.WriteLine("character dat ingevuld zou moeten worden is " + character);
            mazeCharArray[_i, _j] = character;
            _i++;
        }

        //Print de array die gemaakt is (voor testen).
        public void printArray()
        {
            for (int j = 0; j < _heightMaze; j++)
            {
                for (int i = 0; i < _widthMaze; i++)
                {
                    Console.Write(mazeCharArray[i, j]);
                }
                Console.WriteLine();
            }
        }

        //Returnt de begin array voor de objecten te maken.
        public char[,] getMazeArray()
        {
            return mazeCharArray;
        }
    }
}