import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.class';
import { Video } from '../models/video.class';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /**
   * login the user
   * 
   * @param username from user
   * @param password from user
   * @returns response from backend
   */
  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + "/login/";
    const body = {
      "username": username,
      "password": password
    };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * login as guest
   * 
   * @returns response from backend
   */
  loginAsGuest() {
    const url = environment.baseUrl + "/guest/";
    const body = {
      
    };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * register a new user in the backend
   * 
   * @param user class
   * @returns response from backend
   */
  registerNewUser(user:User) {
    const url = environment.baseUrl + "/register/";
    const body = user;
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * activate new account after registration
   * 
   * @param uid from user
   * @param token from user
   * @returns response from backend
   */
  activateAccount(uid:string, token:string) {
    const url = environment.baseUrl + `/activate/${uid}/${token}/`;
  
    return lastValueFrom(this.http.get(url));
  }

  /**
   * post new video to backend
   * 
   * @param video to upload 
   * @returns response from backend
   */
  addVideo(video){
    const url = environment.baseUrl + `/start-screen/add_video/`;
    const body = video;
    
    return lastValueFrom(this.http.post(url,body));
  }

  /**
   * get all users from backend
   * 
   * @returns response from backend
   */
  getUsers() {
    const url = environment.baseUrl + `/start-screen/get_user/`

    return lastValueFrom(this.http.get(url));
  }

  /**
   * get all thumbnails and videos from backend
   * 
   * @returns response from backend
   */
  getThumbnailsAndVideos(){
    const url = environment.baseUrl + `/start-screen/get_thumbnails/`

    return lastValueFrom(this.http.get(url));
  }

  /**
   * get single video from backend
   * 
   * @param title of video
   * @param resolution of video
   * @returns response from backend
   */
  getVideo(title:string, resolution:string) {
    const url = environment.baseUrl + `/show_video/${title}/${resolution}/` ;

    return lastValueFrom(this.http.get(url, {responseType : 'blob'}));

  }

  /**
   * delete single video
   * 
   * @param title of video 
   * @param resolution of video
   * @returns response from backend
   */
  deleteVideo(title:string, resolution:string) {
    const url = environment.baseUrl + `/show_video/${title}/${resolution}/` ;

    return lastValueFrom(this.http.delete(url));
  }

  /**
   * get video description from single video
   * 
   * @param title of video
   * @param resolution of video
   * @returns response from backend
   */
  getVideoDescription(title:string, resolution:string) {
    const url = environment.baseUrl + `/show_video/${title}/${resolution}/description/` ;

    return lastValueFrom(this.http.get(url));
  }

  /**
   * update the changed description
   * 
   * @param title of video
   * @param resolution of video
   * @param newDescription description to update
   * @returns response from backend
   */
  updateVideoDescription(title:string, resolution:string, newDescription:string) {
    const url = environment.baseUrl + `/show_video/${title}/${resolution}/description/` ;
    const body = {'description' : newDescription};

    return lastValueFrom(this.http.patch(url,body));
  }

  
}
