using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public abstract class MoveableObjects
    {
        private int _Xposition;
        private int _Yposition;

        public int Xposition
        {
            get
            {
                return _Xposition;
            }
            set
            {
                _Xposition = value;
            }
        }

        public int Yposition
        {
            get
            {
                return _Yposition;
            }
            set
            {
                _Yposition = value;
            }
        }

        public abstract void move(int direction);

        public abstract Char toChar();

    }
}