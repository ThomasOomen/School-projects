using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    public class Cart
    {

        private Track _Track { get; set; }
        private bool HasLoad;

        public Cart(Track track)
        {
            this._Track = track;
            HasLoad = true;
            SetColor();
        }

        public Track Track
        {
            get
            {
                return this._Track;
            }

            set
            {
                this._Track = value;
            }
        }
        public char ToChar()
        {
            return this._Track.ToChar();
        }

        public void SetColor()
        {
            if (HasLoad)
            {
                this._Track.BackgroundColor = ConsoleColor.Red;
            }
            else
            {
                this._Track.BackgroundColor = ConsoleColor.Green;
            }
        }

        public void Unload()
        {
            this.HasLoad = false;
        }
    }
}