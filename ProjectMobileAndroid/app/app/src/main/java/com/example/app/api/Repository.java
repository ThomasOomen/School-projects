package com.example.app.api;

import android.content.Context;

import org.json.JSONObject;

public interface Repository {
    String connection = "http://10.0.2.2:3001";

    void add();
    void delete();
    void edit();
    void get(String id, VolleyCallback callback);
}
