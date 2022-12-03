using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class Crate : MoveableObjects
    {

        public Crate(int x, int y)
        {
            this.Xposition = x;
            this.Yposition = y;
        }

        public override void move(int direction)
        {
            throw new NotImplementedException();
        }

        public override char toChar()
        {
            return 'o';
        }

    }
}