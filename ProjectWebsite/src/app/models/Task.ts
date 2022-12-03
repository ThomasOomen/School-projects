export class Task{
    _id: string;
    name: String;
    description: string;
    symbol: string;
    type: string;
    public_template: boolean;
    private_template: boolean;
    user_id: String;
    duration: string;
    tasks: any[];
    deleted: boolean;

    constructor(task?: Task) {
        if(task) {
            this._id = task._id;
            this.name = task.name;
            this.description = task.description;
            this.symbol = task.symbol;
            this.type = task.type;
            this.public_template = task.public_template;
            this.private_template = task.private_template;
            this.user_id = task.user_id;
            this.duration = task.duration;
            this.tasks = task.tasks;
            this.deleted = task.deleted;
        }
        else{
            this._id = "0";
            this.name = "";
            this.description = "";
            this.symbol = "";
            this.type = "";
            this.public_template = false;
            this.private_template = true;
            this.user_id = "";
            this.duration = ""; 
            this.tasks = [];
            this.deleted = false;
        }
    }
} 