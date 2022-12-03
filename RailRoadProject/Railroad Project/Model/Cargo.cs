using System;
using System.Collections.Generic;
using System.Text;

namespace Railroad_Project.Model
{
    public class Cargo
    {
        private String _type;
        private int _weight;
        private Char _symbol;

        public Cargo(string Type, int Weight, char Symbol)
        {
            this._type = Type;
            this._weight = Weight;
            this._symbol = Symbol;
        }

        public String getType()
        {
            return this._type;
        }

        public int getWeight()
        {
            return this._weight;
        }

        public Char getSymbol()
        {
            return this._symbol;
        }
    }
}
