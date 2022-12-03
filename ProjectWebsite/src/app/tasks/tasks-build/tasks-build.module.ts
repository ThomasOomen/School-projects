import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatTabsModule,
        DragDropModule
    ]
})

export class TasksBuildMaterials {}