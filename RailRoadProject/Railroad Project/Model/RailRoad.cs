using System;
using System.Collections.Generic;
using System.Text;

namespace Railroad_Project.Model
{
    public class RailRoad
    {
        private LinkedList<Track> _tracks;
        public RailRoad(List<String> ParserResult)
        {
            buildTracks(ParserResult);
        }

        public void buildTracks(List<String> ParserResults)
        {
            
        }
    }
}
