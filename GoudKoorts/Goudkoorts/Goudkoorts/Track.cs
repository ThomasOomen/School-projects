using System;
using System.Collections.Generic;
using System.Text;

namespace Goudkoorts
{
    public abstract class Track
    {
        internal readonly object ToBackGroundColor;

        public Track _North { get; set; }
        public Track _South { get; set; }
        public Track _East { get; set; }
        public Track _West { get; set; }
        public Direction _OutDirection { get; set; }
        public Direction _InDirection { get; set; }
        public abstract Cart _Cart { get; set; }
        public abstract void Remove();
        public abstract bool Add(Cart cart);
        public abstract bool IsEmpty();
        public abstract Char ToChar();
        public ConsoleColor BackgroundColor { get; set; }
        public ConsoleColor ForegroundColor { get; set; }
        public abstract void SetColor();

        public abstract bool MoveCart();
        public Track TrackInDirection(Direction direction)
        {
            switch(direction)
            {
                case Direction.North:
                    return _North;
                case Direction.East:
                    return _East;
                case Direction.South:
                    return _South;
                case Direction.West:
                    return _West;
                default:
                    return (Track)null;
            }
        }
    }
}
