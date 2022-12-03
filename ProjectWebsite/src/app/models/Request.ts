

export class Request{
    status: string;
    data: any;
    error: any;
   
    

    constructor(request?: Request) {
        if(request) {
            this.status = request.status;
            this.data = request.data;
        }
        else{
            this.status = "";
            this.data = undefined;
        }
    }

}

