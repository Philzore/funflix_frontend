export class User {
    username:string;
    email:string;
    password: string;


    constructor(obj?:any) {
        this.username = obj ? obj.username : '' ;
        this.email = obj ? obj.email : '' ;
        this.password = obj ? obj.password : ''  ;
    }

    public toJSON() {
        return {
            'username' : this.username,
            'email' : this.email,
            'password' : this.password,
        };
    }
}