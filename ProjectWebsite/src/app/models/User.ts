import { Facility } from "./Facility";


export class User{
    _id: String;
    firstname: String;
    lastname: String;
    email: string;
    role: string;
    password: string;
    prefix: string;
    dossier_id: string;
    facilities: String[];
    deleted: boolean;
    user_id: String[];
    users: String[];
    
    constructor(user?: User) {
        if(user) {
            this._id = user._id;
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.role = user.role;
            this.password = user.password;
            this.prefix = user.prefix;
            this.dossier_id = user.dossier_id;
            this.facilities = user.facilities;
            this.users = user.users;
            this.deleted = user.deleted;
            this.user_id = user.user_id;
        }
        else{
            this._id = "";
            this.firstname = "";
            this.lastname = "";
            this.email = "";
            this.role = "";
            this.password = "";
            this.prefix = "";
            this.dossier_id = "";
            this.facilities = [];
            this.deleted = false;
            this.user_id = [];
            this.users = [];
        }
    }
    
    
}