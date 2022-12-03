using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public abstract class Square
    {
        private Char _DisplayChar { get; set; }
        private int _Xposition { get; set; }
        private int _Yposition { get; set; }

        private MoveableObjects _MoveObject { get; set; }


        public Char DisplayChar
        {
            get
            {
                return _DisplayChar;
            }
            set
            {
                _DisplayChar = value;
            }
        }
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

        public MoveableObjects MoveObject
        {
            get
            {
                return _MoveObject;
            }
            set
            {
                _MoveObject = value;
            }
        }


        public virtual bool IsEmpty()
        {
            if (this._MoveObject == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public abstract Char SetDisplayChar();

    }
}