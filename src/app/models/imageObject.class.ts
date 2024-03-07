export class ImageObject{
    video:string;
    title:string;
    posterImage:string;
    

    constructor(obj?:any) {
        this.video = obj ? obj.video : '' ;
        this.title = obj ? obj.title : '' ;
        this.posterImage = obj ? obj.posterImage : ''  ;
        
    }

    public toJSON() {
        return {
            'video' : this.video,
            'title' : this.title,
            'posterImage' : this.posterImage,
        };
    }
}