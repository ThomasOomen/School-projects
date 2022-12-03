using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Railroad_Project.Controller
{
    public class Parser
    {
        // Should read file and build linked list / 2D array for further usage.
        private StreamReader _streamReader;
        //Todo: Change datatype to something more accurate.
        private Array _linkedList;
        public Parser()
        {
            _streamReader = new StreamReader("@here goes the path of the file");
        }

        public void calculateRailRoad()
        {

        }

        public void buildLinkedList()
        {
            //Todo: Function should create linked list.
        }

        public void getLinkedList()
        {
            //Todo: Return linkedList.
        }

        public void setLinkedList()
        {
            //Todo: Save linked list to something.
        }
    }
}
