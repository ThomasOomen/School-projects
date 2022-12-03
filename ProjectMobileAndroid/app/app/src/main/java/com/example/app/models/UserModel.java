package com.example.app.models;

import java.io.Serializable;

public class UserModel implements ModelInterface, Serializable {
    public String id;
    public String firstName;
    public String lastName;
    public String prefix;
    public String email;
    public String phoneNumber;
    public String connected_user;

    public UserModel(String id){
        this.id = id;
    }

    public UserModel(String id, String firstName, String lastName, String email, String phoneNumber){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public void setPrefix(String prefix){
        this.prefix = prefix;
    }

    public String getFullName(){
        String name = firstName;
        if(prefix != null){
            name += " " + prefix;
        }
        name += " " + lastName;
        return name;
    }

    public void setConnected_user(String connected_user){
        this.connected_user = connected_user;
    }
}
