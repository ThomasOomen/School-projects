package com.example.app;

import android.content.ContentResolver;
import android.content.Context;
import android.media.RingtoneManager;
import android.net.Uri;

import java.util.Random;

public class SoundManager {
    public static Uri getSound(Context context, boolean randomized){
        Uri sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        if(randomized){
            Random random = new Random();
            int randInt = random.nextInt(4);
            switch(randInt){
                case 0:
                    sound = Uri. parse (ContentResolver. SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/notification5" ) ;
                    break;
                case 1:
                    sound = Uri. parse (ContentResolver. SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/notification1" ) ;
                    break;
                case 2:
                    sound = Uri. parse (ContentResolver. SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/notification2" ) ;
                    break;
                case 3:
                    sound = Uri. parse (ContentResolver. SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/notification3" ) ;
                    break;
                case 4:
                    sound = Uri. parse (ContentResolver. SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/notification4" ) ;
                    break;
            }
        }

        return sound;
    }
}
