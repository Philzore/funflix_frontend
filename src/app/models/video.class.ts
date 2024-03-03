import { Thumbnail } from "./thumbnail.class";

export class Video {
    id : number;
    title:string;
    description:string;
    file:File  ;
    url:string ;
    thumbnail: Thumbnail;


    constructor(obj ?:any ) {
        this.id = obj ? obj.id : null ;
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.file = obj ? obj.file : {};
        this.url = obj ? obj.url : '';
        this.thumbnail = obj ? obj.thumbnail : null;
    }

    public toJSON() {
        return {
            'id' : this.id,
            'title' : this.title,
            'description' : this.description,
            'file' : this.file,
            'path' : this.url,
            'thumbnail' : this.thumbnail,
        };
    }


}