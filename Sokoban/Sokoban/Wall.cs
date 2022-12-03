using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class Wall : Square
    {
        public Wall(int x, int y)
        {
            this.Xposition = x;
            this.Yposition = y;
            this.DisplayChar = SetDisplayChar();

        }

        public override char SetDisplayChar()
        {
            return '#';
        }
    }
}