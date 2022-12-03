using Railroad_Project.Model;
using Railroad_Project.View;
using System;
using System.Collections.Generic;
using System.Text;

namespace Railroad_Project.Controller
{
    public class Simulation
    {
        private Train _train;
        private RailRoad railRoad;
        private Parser readFileInput;
        private RailroadView _railroadview;
        private Boolean _active;

        public Simulation()
        {
            this._active = false;
        }

        private void startSimulation()
        {
            this._active = true;
            //Todo: Build function for starting simulation.
        }

        private void stopSimulation()
        {
            this._active = false;
            //Todo: Build function for ending simulation.
        }

        private void buildRailRoad()
        {
            //Todo: Build function for building the railroad.
        }

        private void buildTrain()
        {
            //Todo: Build function for building the train.
        }

        private void readInputField()
        {
            //Todo: Build function for reading and recieving the railroad map/route.
        }

        private void updateView()
        {
            //Todo: Build function for updating the view when the train moves.
        }

        private void simulationLoop()
        {
            //Todo: Build function for updating the simulation loops. 
        }
    }
}
