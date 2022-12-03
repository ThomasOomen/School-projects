using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class DestroyableTile : Square
    {

        public DestroyableTile(int x, int y)
        {
            this.Xposition = x;
            this.Yposition = y;
            this.DisplayChar = SetDisplayChar();
        }


        public override Char SetDisplayChar()
        {
            if (this.IsEmpty())
            {
                return '~';
            }
            else
            {
                char c = this.MoveObject.toChar();
                switch (c)
                {
                    case 'o':
                       return 'o';

                    case '@':
                        return '@';

                    case 'Z':
                        return 'Z';

                    case '$':
                       return '$';

                    default:
                        return '~';

                }

            }
        }
    }
}