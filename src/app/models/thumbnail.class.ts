export class Thumbnail {
    url: string;
    videoId: number;

    constructor(obj?: any) {
        this.url = obj ? obj.url : '';
        this.videoId = obj ? obj.videoId : null;
        
    }

    public toJSON() {
        return {
            'url' : this.url,
            'videoId' : this.videoId,
        };
    }

}