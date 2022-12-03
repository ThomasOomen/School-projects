package com.example.app.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import com.example.app.api.Schedule;
import com.example.app.api.Task;
import com.example.app.broadcastReceivers.MyNotificationPublisher;
import com.example.app.models.ModelInterface;
import com.example.app.R;
import com.example.app.models.ScheduleModel;
import com.example.app.models.TaskModel;
import com.example.app.models.UserModel;
import com.example.app.api.User;
import com.example.app.api.VolleyCallback;

import org.json.JSONException;
import org.json.JSONObject;

public class ProfileActivity extends AppCompatActivity {
    private SharedPreferences preferences;
    Context context = this;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        User clientUser = new User(context);
        preferences = PreferenceManager.getDefaultSharedPreferences(context);
        String userId = preferences.getString("loginId", "");

        Boolean randomizeSounds = preferences.getBoolean(String.valueOf(R.string.preferenceRandomSound),false);
        Switch preferenceSwitch = findViewById(R.id.sound_randomize_switch);
        preferenceSwitch.setChecked(randomizeSounds);

        preferenceSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
                SharedPreferences.Editor editor = preferences.edit();
                editor.putBoolean(String.valueOf(R.string.preferenceRandomSound), isChecked);
                editor.commit();
            }
        });

        findViewById(R.id.logout_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logout();
            }
        });

        clientUser.get(userId, new VolleyCallback() {
            @Override
            public void onSuccess(ModelInterface object) throws JSONException {
                UserModel userModel = (UserModel) object;

                User employeeUser = new User(context);
                employeeUser.get(userModel.connected_user, new VolleyCallback() {
                    @Override
                    public void onSuccess(ModelInterface object) throws JSONException {
                        UserModel employeeUserModel = (UserModel) object;

                        TextView nameTextView = findViewById(R.id.profile_employee_name);
                        nameTextView.setText(employeeUserModel.getFullName());

                        TextView emailTextView = findViewById(R.id.profile_employee_email);
                        emailTextView.setText(employeeUserModel.email);

                        TextView phonenumberTextView = findViewById(R.id.profile_employee_phonenumber);
                        phonenumberTextView.setText(employeeUserModel.phoneNumber);
                        phonenumberTextView.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Intent callIntent = new Intent(Intent.ACTION_DIAL);
                                callIntent.setData(Uri.parse("tel:" + employeeUserModel.phoneNumber));
                                startActivity(callIntent);
                            }
                        });
                    }
                });

                TextView nameTextView = findViewById(R.id.profile_name);
                nameTextView.setText(userModel.getFullName());

                TextView emailTextView = findViewById(R.id.profile_email);
                emailTextView.setText(userModel.email);

                TextView phonenumberTextView = findViewById(R.id.profile_phonenumber);
                phonenumberTextView.setText(userModel.phoneNumber);
            }
        });
    }

    public void logout(){
        String loginId = preferences.getString("loginId", "");
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        Schedule schedule = new Schedule(context);
        schedule.getFromUserId(loginId, new VolleyCallback() {
            @Override
            public void onSuccess(ModelInterface object) throws JSONException {
                ScheduleModel scheduleModel = (ScheduleModel) object;
                Task task = new Task(context);

                JSONObject taskObject = scheduleModel.getTask(0);
                String dayTaskId = taskObject.getString("_id");

                task.get(dayTaskId, new VolleyCallback() {
                    @Override
                    public void onSuccess(ModelInterface object) throws JSONException {
                        TaskModel dayTaskModel = (TaskModel) object;
                        for (int i = 0; i < dayTaskModel.getTasksLength(); i++) {
                            JSONObject currentTask = dayTaskModel.getTask(i);

                            String currentTaskId = currentTask.getString("_id");
                            String currentTaskTime = currentTask.getString("time");
                            int currentTaskPosition = Integer.parseInt(currentTask.getString("position"));

                            task.getTaskFromDayTask(currentTaskId, currentTaskTime, currentTaskPosition, new VolleyCallback() {
                                @Override
                                public void onSuccess(ModelInterface object) throws JSONException {
                                    TaskModel currentTaskModel = (TaskModel) object;

                                    //verwijderen van de alarmManagers voor iedere task
                                    Intent myIntent = new Intent(getApplicationContext(), MyNotificationPublisher.class);
                                    PendingIntent pendingIntent = PendingIntent.getBroadcast(
                                            getApplicationContext(), currentTaskModel.position + 40, myIntent,
                                            PendingIntent.FLAG_UPDATE_CURRENT);

                                    alarmManager.cancel(pendingIntent);
                                }
                            });
                        }

                    }
                });
            }
        });

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString("loginId", "");
        editor.commit();
        Intent loginIntent = new Intent(context, MainActivity.class);
        context.startActivity(loginIntent);
    }
}