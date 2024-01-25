export class User {
    username:string;
    email:string;


    constructor(obj?:any) {
        this.username = obj ? obj.username : '' ;
        this.email = obj ? obj.email : '' ;
    }

    public toJSON() {
        return {
            username : this.username,
            email : this.email,
        };
    }
}