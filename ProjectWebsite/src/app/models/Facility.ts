import { User } from "./User";


export class Facility{
    _id: String;
    name: String;
    email: string;
    phonenumber: string;
    zipcode: string;
    housenumber: string;
    users: String[];
    deleted: boolean;
    user_id: String[];
    
    constructor(facility?: Facility) {
        if(facility) {
            this._id = facility._id;
            this.name = facility.name;
            this.email = facility.email;
            this.phonenumber = facility.phonenumber;
            this.zipcode = facility.email;
            this.housenumber = facility.housenumber;
            this.users = facility.users;
            this.user_id = facility.user_id;
            this.deleted = facility.deleted;
        }
        else{
            this._id = "";
            this.name = "";
            this.email = "";
            this.phonenumber = "";
            this.zipcode = "";
            this.housenumber = "";
            this.users = [];
            this.user_id = [];
            this.deleted = false;

        }
    }
}