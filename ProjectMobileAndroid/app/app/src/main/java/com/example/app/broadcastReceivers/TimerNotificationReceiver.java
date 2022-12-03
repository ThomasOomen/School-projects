package com.example.app.broadcastReceivers;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.example.app.R;

import static com.example.app.broadcastReceivers.BackgroundTaskReceiver.NOTIFICATION_CHANNEL_ID;

public class TimerNotificationReceiver extends BroadcastReceiver {
    public static String NOTIFICATION_TITLE = "notification_title";
    public static String NOTIFICATION_DURATION = "notification_duration";

    @Override
    public void onReceive(Context context, Intent intent) {
        int notification_id = intent.getIntExtra(MyNotificationPublisher.NOTIFICATION_ID,0);
        String title = intent.getStringExtra(NOTIFICATION_TITLE);
        int duration = intent.getIntExtra(NOTIFICATION_DURATION, 0);

        showNotification(context, notification_id, title, duration);
    }

    private void showNotification(Context context, int notification_id, String title, int duration) {
        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
                        .setSmallIcon(R.drawable.bed)
                        .setContentText(Integer.toString(duration) + " seconden over")
                        .setContentTitle(title)
                        .setProgress(100,50,false)
                        .setOngoing(true)
                        .setOnlyAlertOnce(true)
                        .setAutoCancel(true);

        NotificationManager mNotificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        //mNotificationManager.notify(100, mBuilder.build());
        startNotification4(mBuilder, mNotificationManager, notification_id, title, duration);
    }

    private void startNotification4(NotificationCompat.Builder builder,
                                    NotificationManager mNotifyManager,
                                    int notification_id,
                                    String title,
                                    int duration){
        new Thread(new Runnable(){
            @Override
            public void run() {
                int timeLeft;
                int totalTime = duration;
                // loops 20 times // seconds
                double progressPerSecond = (double)100 / (double)duration;
                for (timeLeft = totalTime; timeLeft >= 0; timeLeft--){
                    double progressPercentage = (totalTime - timeLeft) * progressPerSecond;
                    builder.setProgress(100, (int) progressPercentage, false)
                            .setContentText(Integer.toString(timeLeft) + " seconden over");
                    mNotifyManager.notify(notification_id, builder.build() );

                    try {
                        Thread.sleep(1*1000);
                    } catch (InterruptedException e) {
                        Log.d("TAG", "sleep failure");
                    }
                }
                builder.setContentText("De tijd voor " + title + " is afgelopen")
                        .setProgress(0,0,false)
                        .setOngoing(false)
                        .setOnlyAlertOnce(false)
                        .setDefaults(Notification.DEFAULT_SOUND);
                mNotifyManager.notify(notification_id,builder.build());
            }
        }).start();
    }
}
