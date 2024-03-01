export class Video {
    title:string;
    description:string;
    file:File | null ;


    constructor(obj ?:any ) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.file = obj ? obj.file : null;
    }

    public toJSON() {
        return {
            title : this.title,
            description : this.description,
            file : this.file,
        };
    }


}