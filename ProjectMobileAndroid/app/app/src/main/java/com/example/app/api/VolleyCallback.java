package com.example.app.api;

import com.example.app.models.ModelInterface;

import org.json.JSONException;

public interface VolleyCallback {
    void onSuccess(ModelInterface object) throws JSONException;
}
