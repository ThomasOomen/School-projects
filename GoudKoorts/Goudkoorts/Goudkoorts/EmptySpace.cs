using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    class EmptySpace : Track
    {
        public override Cart _Cart
        { get
            {
                return (Cart)null;
            }
            set
            {
            }
        }

        public override bool MoveCart()
        {
            return false;
        }

        public override bool Add(Cart cart)
        {
            return false;
        }

        public override bool IsEmpty()
        {
            return true;
        }

        public override void Remove()
        {
            this._Cart = null;
        }

        public override char ToChar()
        {
                return ' ';
        }

        public override void SetColor()
        {
            throw new NotImplementedException();
        }
    }
}
