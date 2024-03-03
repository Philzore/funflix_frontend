import { Video } from "./video.class";

export class User {
    username:string;
    email:string;
    password: string;
    videos: Video[];


    constructor(obj?:any) {
        this.username = obj ? obj.username : '' ;
        this.email = obj ? obj.email : '' ;
        this.password = obj ? obj.password : ''  ;
        this.videos = obj ? obj.videos : [];
    }

    public addVideo(video:Video){
        console.log('add video');
        this.videos.push(video);
        console.log('Videos nach dem hinzufügen', this.videos);
    }

    public removeVideo(){

    }

    public toJSON() {
        return {
            'username' : this.username,
            'email' : this.email,
            'password' : this.password,
            'videos' : this.videos,
        };
    }
}