package com.example.app.broadcastReceivers;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.preference.PreferenceManager;

import com.example.app.R;
import com.example.app.SoundManager;

import static com.example.app.broadcastReceivers.BackgroundTaskReceiver.NOTIFICATION_CHANNEL_ID;

public class MyNotificationPublisher extends BroadcastReceiver {
    public static String NOTIFICATION_ID = "notification-id";
    public static String NOTIFICATION = "notification";
    public static String NOTIFICATION_SOUND = "notification_sound";

    public void onReceive(Context context, Intent intent) {
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        Notification notification = intent.getParcelableExtra(NOTIFICATION);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel notificationChannel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, "NOTIFICATION_CHANNEL_NAME", importance);
            notificationChannel.setSound(null,null);
            assert notificationManager != null;
            notificationManager.createNotificationChannel(notificationChannel);
        }
        int id = intent.getIntExtra(NOTIFICATION_ID, 0);

        // get setting from preferences
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        boolean randomizedSoundSetting = preferences.getBoolean(String.valueOf(R.string.preferenceRandomSound), false);

        //play notification sound
        Uri sound = SoundManager.getSound(context, randomizedSoundSetting);
        MediaPlayer mMediaPlayer = MediaPlayer.create(context, sound);
        mMediaPlayer.setLooping(false);
        mMediaPlayer.start();

        assert notificationManager != null;
        notificationManager.notify(id, notification);
    }

}
