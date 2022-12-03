using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    class ExitTrack : SimpleTrack
    {
        public ExitTrack(Direction inDirection, Direction outDirection) : base(inDirection, outDirection)
        {
            this._InDirection = inDirection;
            this._OutDirection = outDirection;
            this.ForegroundColor = ConsoleColor.White;
            this.BackgroundColor = ConsoleColor.Black;
        }

        public override bool MoveCart()
        {
            if(this.TrackInDirection(this._OutDirection) == null)
            {
                this._Cart = null;
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
