package com.example.app.activities;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.app.broadcastReceivers.MyNotificationPublisher;
import com.example.app.models.ModelInterface;
import com.example.app.R;
import com.example.app.models.ScheduleModel;
import com.example.app.adapters.TaskItemAdapter;
import com.example.app.models.TaskModel;
import com.example.app.api.Schedule;
import com.example.app.api.Task;
import com.example.app.api.VolleyCallback;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ScheduleActivity extends AppCompatActivity {
    Context context = this;
    Activity activity = this;
    private SharedPreferences preferences;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);

        DateFormat df = new SimpleDateFormat("EEEE, d MMM, y", new Locale("nl", "NL"));
        Date date = new Date(System.currentTimeMillis());

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle(df.format(date));

        List<TaskModel> taskModels = new ArrayList<>();
        Schedule schedule = new Schedule(context);

        preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String loginId = preferences.getString("loginId", "");

        schedule.getFromUserId(loginId, new VolleyCallback() {
            @Override
            public void onSuccess(ModelInterface object) throws JSONException {
                ScheduleModel scheduleModel = (ScheduleModel) object;
                Task task = new Task(context);
                // hier op datum zoeken straks
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

                                    taskModels.add(currentTaskModel);
                                    Comparator<TaskModel> compareByPosition = (TaskModel o1, TaskModel o2) ->
                                            o1.getPosition().compareTo(o2.getPosition());
                                    Collections.sort(taskModels, compareByPosition);

                                    TaskItemAdapter taskAdapter = new TaskItemAdapter(context, activity, taskModels);

                                    recyclerView.setLayoutManager(new LinearLayoutManager(context));
                                    recyclerView.setAdapter(taskAdapter);
                                }
                            });
                        }

                    }
                });
            }
        });

        DividerItemDecoration itemDecoration = new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL);
        itemDecoration.setDrawable(ContextCompat.getDrawable(this, R.drawable.recyclerview_divider));
        recyclerView.addItemDecoration(itemDecoration);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.toolbar_profile:
                Intent profileIntent = new Intent(context, ProfileActivity.class);
                context.startActivity(profileIntent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
