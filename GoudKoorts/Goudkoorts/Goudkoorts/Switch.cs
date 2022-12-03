using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    public class SwitchTrack : SimpleTrack
    {
        public SwitchTrack(Direction inDirection, Direction outDirection, ConsoleColor color) : base(inDirection, outDirection)
        {
            this._InDirection = inDirection;
            this._OutDirection = outDirection;
            this.ForegroundColor = color;
            SetColor();
        }

        public override void SetColor()
        {
            if(IsEmpty())
            {
                this.BackgroundColor = ConsoleColor.Black;
            }
            else
            {
                this._Cart.SetColor();
            }
        }
        public void SwitchOutDirection()
        {
            if (this._OutDirection == Direction.East)
            {
                this._OutDirection = Direction.West;
            }
            else if (this._OutDirection == Direction.West)
            {
                this._OutDirection = Direction.East;
            }
            else if (this._OutDirection == Direction.North)
            {
                this._OutDirection = Direction.South;
            }
            else
            {
                this._OutDirection = Direction.North;
            }
        }

        public void SwitchInDirection()
        {
            if (this._InDirection == Direction.East)
            {
                this._InDirection = Direction.West;
            }
            else if (this._InDirection == Direction.West)
            {
                this._InDirection = Direction.East;
            }
            else if (this._InDirection == Direction.North)
            {
                this._InDirection = Direction.South;
            }
            else
            {
                this._InDirection = Direction.North;
            }
        }
    }
}