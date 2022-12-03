using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku_Tim_Thomas.State
{
    class Manager
    {   

        public State CurrentState { get; set; }

        private Manager()
        {
            CurrentState = new HelperState();
        }

        private static Manager _manager;

        public static Manager Instance()
        {
            if(_manager == null)
            {
                _manager = new Manager();
            }

            return _manager;
        }

        public void ChangeManagerState(State newState)
        {
            CurrentState = newState;
        }
    }
}
