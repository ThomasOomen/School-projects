using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    class Shipyard : Track
    {
        public override Cart _Cart { get; set; }
        public Ship _Ship { get; set; }

        public Shipyard()
        {
            _Ship = new Ship();
            SetColor();
        }

        public override bool Add(Cart cart)
        {
            return false;
        }

        public override bool IsEmpty()
        {
            if (_Ship == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public override bool MoveCart()
        {
            return false;
        }
        

        public override void Remove()
        {
            this._Ship = null;
        }

        public override char ToChar()
        {
            if (IsEmpty())
            {
                return 'S';
            }
            else
            {
                return _Ship.ToChar();
            }
        }

        public override void SetColor()
        {
            if (IsEmpty())
            {
                BackgroundColor = ConsoleColor.Black;
                ForegroundColor = ConsoleColor.White;
            }
            else
            {
                BackgroundColor = ConsoleColor.Black;
                ForegroundColor = this._Ship.SetColor();
            }
        }
    }
}
