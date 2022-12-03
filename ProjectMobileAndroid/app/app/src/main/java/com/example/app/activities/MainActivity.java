package com.example.app.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.SystemClock;
import android.preference.PreferenceManager;

import com.example.app.broadcastReceivers.BackgroundTaskReceiver;

import java.util.Calendar;
import java.util.Date;

public class MainActivity extends AppCompatActivity {
    private SharedPreferences preferences;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String loginId = preferences.getString("loginId", "");

        scheduleBackgroundTask();

        if(loginId.length() > 0){
            //you are logged in

            Intent intent = new Intent(this,ScheduleActivity.class);
            this.startActivity(intent);
        }else{
            //you are not logged in

            Intent intent = new Intent(this,LoginActivity.class);
            this.startActivity(intent);
        }
    }

    private void scheduleBackgroundTask() {
        Calendar calendar = Calendar.getInstance();
        // add one day to the date/calendar
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.SECOND, 0);

        Date alarmTime = calendar.getTime();

        Date date = new Date();
        long delay = alarmTime.getTime() - date.getTime();

        Intent backgroundIntent = new Intent(this, BackgroundTaskReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 1234, backgroundIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        long futureInMillis = SystemClock.elapsedRealtime() + delay;
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        assert alarmManager != null;
        long time = SystemClock.elapsedRealtime() + delay;

        alarmManager.setInexactRepeating(AlarmManager.RTC, time,
                AlarmManager.INTERVAL_DAY, pendingIntent);
    }
}