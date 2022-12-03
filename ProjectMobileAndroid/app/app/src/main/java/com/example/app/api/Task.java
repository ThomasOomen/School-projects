package com.example.app.api;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.app.models.TaskModel;

import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;

public class Task implements Repository{
    private Context context;

    public Task(Context context){
        this.context = context;
    }

    @Override
    public void add() {

    }

    @Override
    public void delete() {

    }

    @Override
    public void edit() {

    }

    @Override
    public void get(String id, VolleyCallback callback) {
        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/task/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, connectionstring.toString(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject task = response.getJSONObject("data");
                            TaskModel taskModel = new TaskModel(
                                    task.getString("_id"),
                                    task.getString("name"),
                                    task.getJSONArray("tasks"),
                                    task.getString("description"));
                            callback.onSuccess(taskModel);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                int i = 0;
            }
        });

        RequestQueue queue = Volley.newRequestQueue(context);

        queue.add(jsonObjectRequest);
    }

    public void getTaskFromDayTask(String id, String time, int position, final VolleyCallback callBack) {
        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/task/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, connectionstring.toString(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject task = response.getJSONObject("data");
                            TaskModel taskModel = new TaskModel(
                                    task.getString("_id"),
                                    task.getString("name"),
                                    task.getJSONArray("tasks"),
                                    task.getString("description"));
                            taskModel.setPosition(position);
                            taskModel.setTime(time);
                            taskModel.setImage(task.getString("symbol"));

                            String durationString = task.getString("duration");
                            int duration = 0;
                            if(!durationString.equals("")){
                                duration = convertDurationStringToIntInSeconds(durationString);
                            }
                            taskModel.setDuration(duration);

                            callBack.onSuccess(taskModel);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                int i = 0;
            }
        });

        RequestQueue queue = Volley.newRequestQueue(context);

        queue.add(jsonObjectRequest);
    }

    public int convertDurationStringToIntInSeconds(String duration){
        String[] splittedDuration = duration.split(":");

        int hours = Integer.parseInt(splittedDuration[0]);
        int minutes = Integer.parseInt(splittedDuration[1]);
        int seconds = Integer.parseInt(splittedDuration[2]);

        seconds += (minutes * 60) + (hours * 60 * 60);
        return seconds;
    }

}
