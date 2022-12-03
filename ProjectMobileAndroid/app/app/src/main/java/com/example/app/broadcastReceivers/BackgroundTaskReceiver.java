package com.example.app.broadcastReceivers;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.SystemClock;
import android.preference.PreferenceManager;

import androidx.core.app.NotificationCompat;

import com.example.app.R;
import com.example.app.activities.ActiveTaskActivity;
import com.example.app.api.Schedule;
import com.example.app.api.Task;
import com.example.app.api.VolleyCallback;
import com.example.app.models.ModelInterface;
import com.example.app.models.ScheduleModel;
import com.example.app.models.TaskModel;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BackgroundTaskReceiver extends BroadcastReceiver {
    private SharedPreferences preferences;
    private Context context;
    public static final String NOTIFICATION_CHANNEL_ID = "100011";
    private final static String default_notification_channel_id = "default";

    @Override
    public void onReceive(Context context, Intent intent) {
        this.context = context;
        preferences = PreferenceManager.getDefaultSharedPreferences(context);
        String loginId = preferences.getString("loginId", "");

        if (loginId.length() > 0) {
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
                                        int requestcode = currentTaskModel.position + 40;
                                        if(currentTaskModel.duration > 0){
                                            scheduleNotification(getTimerNotification(currentTaskModel,requestcode ), currentTaskModel.time, requestcode);
                                        }else{
                                            scheduleNotification(getNotification(currentTaskModel), currentTaskModel.time, requestcode);
                                        }
                                    }
                                });
                            }

                        }
                    });
                }
            });
        }

    }

    private void scheduleNotification(Notification notification, String time, int requestcode) {
        Intent notificationIntent = new Intent(context, MyNotificationPublisher.class);
        notificationIntent.putExtra(MyNotificationPublisher.NOTIFICATION_ID, requestcode);
        notificationIntent.putExtra(MyNotificationPublisher.NOTIFICATION, notification);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, requestcode, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        int hours = Integer.parseInt(time.split(":")[0]);
        int minutes = Integer.parseInt(time.split(":")[1]);
        Date date = new Date();
        Date taskDate = new Date(date.getYear(), date.getMonth(), date.getDate(), hours, minutes, 0);

        long delay = taskDate.getTime() - date.getTime();

        if(delay > 0){
            long futureInMillis = SystemClock.elapsedRealtime() + delay;

            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            assert alarmManager != null;
            alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, futureInMillis, pendingIntent);
        }
    }

    private Notification getNotification(TaskModel currentTaskModel) {
        String content = currentTaskModel.description;
        String title = currentTaskModel.name;
        String symbol = currentTaskModel.symbol;


        Intent notificationIntent = new Intent(context, ActiveTaskActivity.class);
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        notificationIntent.putExtra("task", currentTaskModel);

        PendingIntent intent = PendingIntent.getActivity(context, 0,
                notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, default_notification_channel_id);
        builder.setAutoCancel(true)
                .setChannelId(NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.drawable.bed)
                .setContentText(content)
                .setContentTitle(title)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setContentIntent(intent);
        return builder.build();
    }

    private Notification getTimerNotification(TaskModel currentTaskModel, int requestcode){
        String content = currentTaskModel.description;
        String title = currentTaskModel.name;
        String symbol = currentTaskModel.symbol;


        Intent notificationIntent = new Intent(context, ActiveTaskActivity.class);
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        notificationIntent.putExtra("task", currentTaskModel);

        PendingIntent intent = PendingIntent.getActivity(context, 0,
                notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        Intent broadcastIntent = new Intent(context, TimerNotificationReceiver.class);
        broadcastIntent.putExtra(MyNotificationPublisher.NOTIFICATION_ID, requestcode);
        broadcastIntent.putExtra(TimerNotificationReceiver.NOTIFICATION_TITLE, currentTaskModel.name);
        broadcastIntent.putExtra(TimerNotificationReceiver.NOTIFICATION_DURATION, currentTaskModel.duration);

        PendingIntent actionIntent = PendingIntent.getBroadcast(context,
                99576, broadcastIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, default_notification_channel_id);
        builder.setAutoCancel(true)
                .setChannelId(NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.drawable.bed)
                .setContentText(content)
                .setContentTitle(title)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setContentIntent(intent)
                .addAction(R.drawable.bed, "Start", actionIntent); //add the start button sends to notificationReceiver

        return builder.build();
    }
}
