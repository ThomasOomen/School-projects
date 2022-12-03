using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    class EmptySpace : Square
    {
        public EmptySpace(int x, int y)
        {
            this.Xposition = x;
            this.Yposition = y;
            this.DisplayChar = SetDisplayChar();
        }
        public override char SetDisplayChar()
        {
            return ' ';
        }
    }
}
