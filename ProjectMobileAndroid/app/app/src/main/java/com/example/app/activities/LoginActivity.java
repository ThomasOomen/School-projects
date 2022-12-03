package com.example.app.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.app.broadcastReceivers.BackgroundTaskReceiver;
import com.example.app.models.ModelInterface;
import com.example.app.R;
import com.example.app.models.UserModel;
import com.example.app.api.LoginCallback;
import com.example.app.api.User;
import com.example.app.api.VolleyCallback;

import org.json.JSONException;

public class LoginActivity extends AppCompatActivity {
    Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button button = (Button) findViewById(R.id.login_button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText emailText = (EditText) findViewById(R.id.editEmail);
                EditText passwordText = (EditText) findViewById(R.id.editPassword);

                String password = passwordText.getText().toString();
                String email = emailText.getText().toString();

                User user = new User(context);
                try {
                    user.login(password, email, new VolleyCallback() {
                        @Override
                        public void onSuccess(ModelInterface object) throws JSONException {
                            UserModel userModel = (UserModel) object;
                            SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
                            SharedPreferences.Editor editor = preferences.edit();
                            editor.putString("loginId", userModel.id);
                            editor.commit();

                            Intent intent = new Intent(context, ScheduleActivity.class);
                            Intent backgroundIntent = new Intent(context, BackgroundTaskReceiver.class);

                            AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
                            PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 1234, backgroundIntent, PendingIntent.FLAG_UPDATE_CURRENT);
                            alarmManager.set(AlarmManager.ELAPSED_REALTIME, 100, pendingIntent);

                            context.startActivity(intent);
                        }
                    }, new LoginCallback() {
                        @Override
                        public void onFailed() {
                            TextView warning = (TextView) findViewById(R.id.warning_textview);
                            warning.setVisibility(View.VISIBLE);
                        }
                    });
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }
}