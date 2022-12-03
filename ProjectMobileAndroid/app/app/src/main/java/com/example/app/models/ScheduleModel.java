package com.example.app.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class ScheduleModel implements ModelInterface, Serializable {
    transient String id;
    transient String userId;
    transient JSONArray tasks;
    transient boolean deleted;

    public ScheduleModel(String id, String userId, JSONArray tasks, boolean deleted){
        this.id = id;
        this.userId = userId;
        this.tasks = tasks;
        this.deleted = deleted;
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
}
