using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    public class Dock : SimpleTrack
    {
        public Dock(Direction inDirection, Direction outDirection, ConsoleColor color) : base(inDirection, outDirection)
        {
            this._InDirection = inDirection;
            this._OutDirection = outDirection;
            this.ForegroundColor = color;
            this.BackgroundColor = ConsoleColor.Black;
        }

        public override void SetColor()
        {
            if (IsEmpty())
            {
                this.BackgroundColor = ConsoleColor.Black;
            }
            else
            {
                this._Cart.SetColor();
            }
        }
    }
}