using System;
using System.Collections.Generic;
using System.Text;

namespace Railroad_Project.Model
{
    public class Locomotive
    {
        private String _fuelType;
        private int _maxFuel;
        private int _amountFuel;
        public Locomotive(String FuelType, int MaxFuel, int AmountFuel)
        {
            this._fuelType = FuelType;
            this._maxFuel = MaxFuel;
            this._amountFuel = AmountFuel;
        }

        public String getFuelType()
        {
            return this._fuelType;
        }

        public int getMaxFuel()
        {
            return this._maxFuel;
        }

        public int getAmountOfFuel()
        {
            return this._amountFuel;
        }
    }
}
