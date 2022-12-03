package com.example.app.api;

import android.content.Context;
import android.util.Base64;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.app.models.UserModel;
import com.example.app.requests.AuthenticationRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;

public class User implements Repository
{
    private Context context;

    public User(Context context){
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
            connectionstring = new URL(connection + "/user/" + id);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, connectionstring.toString(), null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject user = response.getJSONObject("data");
                            UserModel userModel = new UserModel(
                                    user.getString("_id"),
                                    user.getString("firstname"),
                                    user.getString("lastname"),
                                    user.getString("email"),
                                    "0612499326");
                            if(user.has("prefix")){
                                userModel.setPrefix(user.getString("prefix"));
                            }
                            JSONArray connectedUsers = user.getJSONArray("users");
                            if(connectedUsers.length() > 0){
                                userModel.setConnected_user(connectedUsers.getString(0));
                            }
                            callback.onSuccess(userModel);
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

    public void login(String password, String email, VolleyCallback callBack, LoginCallback loginCallback) throws JSONException {

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("email", email);
        jsonBody.put("password", password);

        RequestQueue requestQueue = Volley.newRequestQueue(context);
        URL connectionstring = null;
        try {
            connectionstring = new URL(connection + "/login");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        AuthenticationRequest jsonObjectRequest = new AuthenticationRequest(Request.Method.POST, connectionstring.toString(), jsonBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONObject headers = response.getJSONObject("headers");
                            String token = headers.getString("auth-token");
                            String[] splitToken = token.split("\\.");
                            String id = getUserId(splitToken[1]);
                            UserModel userModel = new UserModel(id);
                            callBack.onSuccess(userModel);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                loginCallback.onFailed();
            }
        });

        RequestQueue queue = Volley.newRequestQueue(context);

        queue.add(jsonObjectRequest);
    }

    private static String getUserId(String strEncoded) throws UnsupportedEncodingException, JSONException {
        byte[] decodedBytes = Base64.decode(strEncoded, Base64.URL_SAFE);
        JSONObject json = new JSONObject( new String(decodedBytes, "UTF-8"));
        return json.getString("_id") ;
    }


}
