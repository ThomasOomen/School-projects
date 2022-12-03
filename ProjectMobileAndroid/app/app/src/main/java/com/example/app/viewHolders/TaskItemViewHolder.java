package com.example.app.viewHolders;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView.ViewHolder;

import com.example.app.R;

public class TaskItemViewHolder extends ViewHolder {
    public ConstraintLayout parentLayout;
    public ImageView taskSymbolImageView ;
    public TextView taskNameTextView;
    public TextView taskTimeTextView;

    public TaskItemViewHolder(@NonNull View itemView) {
        super(itemView);

        parentLayout = itemView.findViewById(R.id.parentLayout);
        taskSymbolImageView = itemView.findViewById(R.id.taskSymbolImageView);
        taskNameTextView = itemView.findViewById(R.id.taskNameTextView);
        taskTimeTextView = itemView.findViewById(R.id.taskTimeTextView);
    }
}
