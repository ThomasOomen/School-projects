package com.example.app.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class TaskModel implements ModelInterface, Serializable {
    public String id;
    public String name;
    public String time;
    public String description;
    public String symbol;
    public transient JSONArray tasks;
    public int position;
    public int duration;

    public TaskModel(String id, String name, JSONArray tasks, String description){
        this.id = id;
        this.name = name;
        this.tasks = tasks;
        this.description = description;
    }

    public JSONObject getTask(int position){
        try {
            return tasks.getJSONObject(position);
        } catch (JSONException e) {
            return null;
        }
    }

    public int getTasksLength(){
        return tasks.length();
    }

    public void setPosition(int position){this.position = position;}

    public void setTime(String time){this.time = time;}

    public void setImage(String image){this.symbol = image;}

    public Integer getPosition(){
        return new Integer(this.position);
    }

    public void setDuration(int duration){
        this.duration = duration;
    }
}
