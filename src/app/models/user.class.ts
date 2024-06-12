import { ImageObject } from "./imageObject.class";
import { Video } from "./video.class";

export class User {
    username: string;
    email: string;
    password: string;
    imageObject: ImageObject[];


    constructor(obj?: any) {
        this.username = obj ? obj.username : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.imageObject = obj ? obj.imageObject : [];
    }

    public addVideo(video: Video) {
        const videoURL = `https://funflix.philippmoessl.de/media/` + video.url;
        const thumbnailURL = `https://funflix.philippmoessl.de/media/` + video.thumbnail.url;
        const videoTitle = video.title;
        let newImageObject = new ImageObject();
        newImageObject.video = videoURL;
        newImageObject.posterImage = thumbnailURL;
        newImageObject.title = videoTitle;
        this.imageObject.push(newImageObject);
    }

    public removeVideo() {

    }

    public toJSON() {
        return {
            'username': this.username,
            'email': this.email,
            'password': this.password,
            'imageObject': this.imageObject,
        };
    }
}