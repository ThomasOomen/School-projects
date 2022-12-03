package com.example.app.activities;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.method.ScrollingMovementMethod;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.app.api.Schedule;
import com.example.app.broadcastReceivers.MyNotificationPublisher;
import com.example.app.models.ModelInterface;
import com.example.app.R;
import com.example.app.models.ScheduleModel;
import com.example.app.models.TaskModel;
import com.example.app.api.Repository;
import com.example.app.api.Task;
import com.example.app.api.VolleyCallback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class TaskDetailsActivity extends AppCompatActivity {
    Context context = this;
    SharedPreferences preferences;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task_details);

        preferences = PreferenceManager.getDefaultSharedPreferences(this);

        DateFormat df = new SimpleDateFormat("EEEE, d MMM, y", new Locale("nl", "NL"));
        Date date = new Date(System.currentTimeMillis());

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle(df.format(date));

        try {
            getIncomingIntent();
        } catch (JSONException | MalformedURLException e) {
            e.printStackTrace();
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch(item.getItemId()){
            case R.id.toolbar_profile:
                Intent intent = new Intent(this,ProfileActivity.class);
                this.startActivity(intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void getIncomingIntent() throws JSONException, MalformedURLException {
        if(getIntent().hasExtra("task") && getIntent().hasExtra("subTasks")){
            TaskModel task = (TaskModel) getIntent().getSerializableExtra("task");
            TextView name = findViewById(R.id.taskDetailName);
            name.setText(task.name);

            TextView taskDescriptionTextView = findViewById(R.id.taskDescription);
            taskDescriptionTextView.setMovementMethod(new ScrollingMovementMethod());
            taskDescriptionTextView.setText(task.description);

            ImageView taskImage = findViewById(R.id.taskImage);
            URL spriteURL = new URL(Repository.connection + "/" + task.symbol);
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        InputStream URLcontent = (InputStream) spriteURL.getContent();
                        Drawable image = Drawable.createFromStream(URLcontent, "your source link");

                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                // Stuff that updates the UI
                                taskImage.setImageDrawable(image);
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
            thread.start();

            final List<String> subTaskList = new ArrayList<>();

            // Create an ArrayAdapter from List
            final ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>
                    (this, android.R.layout.simple_list_item_1, subTaskList);

            ListView subTaskListView = findViewById(R.id.subTaskList);
            subTaskListView.setAdapter(arrayAdapter);

            String subTasks = getIntent().getStringExtra("subTasks");

            try {
                task.tasks = new JSONArray(subTasks);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            Task taskConnection = new Task(this);
            for (int i = 0; i < task.getTasksLength(); i++){
                JSONObject currentTask = task.getTask(i);
                String currentTaskId = currentTask.getString("_id");
                taskConnection.get(currentTaskId, new VolleyCallback() {
                    @Override
                    public void onSuccess(ModelInterface object) throws JSONException {
                        TaskModel currentTaskModel = (TaskModel) object;
                        //currentTaskModel.symbol = R.drawable.food;
                        subTaskList.add(currentTaskModel.name);
                        arrayAdapter.notifyDataSetChanged();
                    }
                });
            }
        }
    }
}
