package com.example.app.api;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.app.models.ScheduleModel;

import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;

public class Schedule implements Repository {
    private Context context;

    public Schedule(Context context){
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
    public void get(String id, final VolleyCallback callBack) {

    }

    public void getFromUserId(String id, final VolleyCallback callBack){
        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/schedule/user/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, connectionstring.toString(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject schedule = response.getJSONObject("data");
                            ScheduleModel scheduleModel = new ScheduleModel(
                                    schedule.getString("_id"),
                                    schedule.getString("user_id"),
                                    schedule.getJSONArray("tasks"),
                                    schedule.getBoolean("deleted"));
                            callBack.onSuccess(scheduleModel);
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
