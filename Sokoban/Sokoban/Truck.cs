using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class Truck : MoveableObjects
    {
        public Truck(int x, int y)
        {
            Xposition = x;
            Yposition = y;
        }

        public override void move(int direction)
        {
            switch (direction)
            {
                case 1:
                    Xposition--;
                    break;

                case 2:
                    Yposition--;
                    break;

                case 3:
                    Xposition++;
                    break;

                case 4:
                    Yposition++;
                    break;
            }
        }

        public override char toChar()
        {
            return '@';
        }
    }
}