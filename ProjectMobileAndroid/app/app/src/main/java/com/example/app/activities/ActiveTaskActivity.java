package com.example.app.activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.method.ScrollingMovementMethod;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.app.R;
import com.example.app.api.FinishedTask;
import com.example.app.api.Schedule;
import com.example.app.api.VolleyCallback;
import com.example.app.models.FinishedTasksModel;
import com.example.app.models.ModelInterface;
import com.example.app.models.ScheduleModel;
import com.example.app.models.TaskModel;
import com.example.app.api.Repository;

import org.json.JSONException;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ActiveTaskActivity extends AppCompatActivity {
    Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_active_task);

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
        if(getIntent().hasExtra("task")){
            TaskModel task = (TaskModel) getIntent().getSerializableExtra("task");
            TextView name = findViewById(R.id.activeTaskDetailName);
            name.setText(task.name);

            //add button listener for finishing task
            Button activeTaskFinishButton = findViewById(R.id.activeTaskFinishButton);
            activeTaskFinishButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    FinishedTask finishedTask = new FinishedTask(context);
                    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
                    String loginId = preferences.getString("loginId", "");
                    try {
                        finishedTask.addTask(loginId, task.id, "2021-03-01T23:00:00.000Z", true,"10:00", new VolleyCallback() {
                            @Override
                            public void onSuccess(ModelInterface object) throws JSONException {
                                FinishedTasksModel finishedTasksModel = (FinishedTasksModel) object;

                                if(finishedTasksModel.getTasksLength() > 0){
                                    Intent intent = new Intent(context, ScheduleActivity.class);
                                    context.startActivity(intent);
                                }
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });

            TextView taskDescriptionTextView = findViewById(R.id.activeTaskDescription);
            taskDescriptionTextView.setMovementMethod(new ScrollingMovementMethod());
            taskDescriptionTextView.setText(task.description);

            ImageView taskImage = findViewById(R.id.activeTaskImage);
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
        }
    }
}