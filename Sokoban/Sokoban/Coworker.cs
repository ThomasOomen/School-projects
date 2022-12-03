using System;
using System.Collections.Generic;
using System.Text;

namespace Sokoban
{
    public class Coworker : MoveableObjects
    {
        public bool _isSleeping;

        public Coworker(int x, int y)
        {
            this.Xposition = x;
            this.Yposition = y;
        }
        public bool IsSleeping
        {
            get
            {
                return _isSleeping;
            }
            set
            {
                _isSleeping = value;
            }
        }

        public void WakeOrSleep() //berekent of de coworker wakker wordt, in slaap valt, wakker blijf of in slaap blijft
        {
            Random r = new Random();
            if (_isSleeping)
            {
                int wakePercentage = 10;
                int randomValue99 = r.Next(100);
                if (randomValue99 < wakePercentage)
                {
                    _isSleeping = false;
                    int direction = r.Next(4);
                    move(direction);
                }
            }
            else
            {
                int sleepPercentage = 25;
                int randomValue99 = r.Next(100);
                if (randomValue99 < sleepPercentage)
                {
                    _isSleeping = true;
                }
            } 
        }

        //als de coworker wakker is gaat hij een willekeurige kant op
        public override void move(int direction) 
        {      
            switch (direction)
            {
                case 0:
                    this.Xposition--;
                    break;
                case 1:
                    this.Xposition++;
                    break;
                case 2:
                    this.Yposition--;
                    break;
                case 3:
                    this.Yposition++;
                    break;
                default:
                    break;
            }
        }

        public override char toChar()
        {
            if (IsSleeping)
            {
                return 'Z';
            }
            else
            {
                return '$';
            }
        }
    }
}