export class Video {
    title:string;
    description:string;
    path:string;


    constructor(obj ?:any ) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.path = obj ? obj.path : '';
    }

    public toJSON() {
        return {
            title : this.title,
            description : this.description,
            path : this.path,
        };
    }


}