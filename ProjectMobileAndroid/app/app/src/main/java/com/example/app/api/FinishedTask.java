package com.example.app.api;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.app.models.FinishedTasksModel;
import com.example.app.models.ScheduleModel;
import com.example.app.models.UserModel;
import com.example.app.requests.AuthenticationRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;

public class FinishedTask implements Repository {
    private Context context;
    public FinishedTask(Context context){
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

    }

    public void addTask(String userId, String taskId, String date, boolean succesfullyCompleted, String time, final VolleyCallback callBack) throws JSONException {

        JSONObject jsonBody = new JSONObject();
        JSONArray tasks = new JSONArray();
        JSONObject task = new JSONObject();
        task.put("_id", taskId);
        task.put("date", date);
        task.put("succesfullyCompleted", succesfullyCompleted);
        task.put("time", time);

        if(succesfullyCompleted){
            task.put("message", "Goed uitgevoerd!");
        }else{
            task.put("message", "Niet uitgevoerd.");
        }

        tasks.put(task);
        jsonBody.put("tasks", tasks);

        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/finishedTask/addTask/" + userId);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT, connectionstring.toString(), jsonBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject finishedTasksModel = response.getJSONObject("data");
                            FinishedTasksModel finishedTaskModel = new FinishedTasksModel(
                                    finishedTasksModel.getString("_id"),
                                    finishedTasksModel.getString("user_id"),
                                    finishedTasksModel.getJSONArray("tasks"),
                                    finishedTasksModel.getBoolean("deleted"));
                            callBack.onSuccess(finishedTaskModel);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        RequestQueue queue = Volley.newRequestQueue(context);

        queue.add(jsonObjectRequest);
    }

    public void getFromUserId(String id, final VolleyCallback callBack){
        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/finishedTask/user/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, connectionstring.toString(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject finishedTasksModel = response.getJSONObject("data");
                            FinishedTasksModel finishedTaskModel = new FinishedTasksModel(
                                    finishedTasksModel.getString("_id"),
                                    finishedTasksModel.getString("user_id"),
                                    finishedTasksModel.getJSONArray("tasks"),
                                    finishedTasksModel.getBoolean("deleted"));
                            callBack.onSuccess(finishedTaskModel);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        RequestQueue queue = Volley.newRequestQueue(context);

        queue.add(jsonObjectRequest);
    }
}
