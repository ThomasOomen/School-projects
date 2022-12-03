package com.example.app.adapters;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.app.R;
import com.example.app.activities.TaskDetailsActivity;
import com.example.app.api.Repository;
import com.example.app.models.TaskModel;
import com.example.app.viewHolders.TaskItemViewHolder;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

public class TaskItemAdapter extends RecyclerView.Adapter<TaskItemViewHolder>{
    public List<TaskModel> taskModelList;
    public Context context;
    public Activity activity;

    public TaskItemAdapter(Context context, Activity activity, List<TaskModel> taskModelList){
        this.context = context;
        this.activity = activity;
        this.taskModelList = taskModelList;
    }

    @NonNull
    @Override
    public TaskItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.task_item,parent,false);
        return new TaskItemViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TaskItemViewHolder holder, int position) {
        TaskModel currentTaskModel = taskModelList.get(position);

        holder.taskTimeTextView.setText(currentTaskModel.time);
        holder.taskNameTextView.setText(currentTaskModel.name);
        //holder.taskSymbolImageView.setImageResource(currentTaskModel.symbol);

        try {
            URL spriteURL = new URL(Repository.connection + "/" + currentTaskModel.symbol);
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        InputStream URLcontent = (InputStream) spriteURL.getContent();
                        Drawable image = Drawable.createFromStream(URLcontent, "your source link");
                        activity.runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                // Stuff that updates the UI
                                holder.taskSymbolImageView.setImageDrawable(image);
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
            thread.start();

            holder.parentLayout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, TaskDetailsActivity.class);
                    intent.putExtra("task", currentTaskModel);
                    intent.putExtra("subTasks", currentTaskModel.tasks.toString());
                    context.startActivity(intent);
                }
            });
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int getItemCount() {
        return taskModelList.size();
    }
}
