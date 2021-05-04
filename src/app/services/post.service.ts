import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { CookieService } from 'ngx-cookie-service';
import firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private cookieService: CookieService) { 
    this.getPosts()
  }

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();
  postCookie: any;
  cookieExists: boolean 

  createPost: boolean = false;

  emitPost(){
    this.postsSubject.next(this.posts)
  }

  savePosts(){
    //firebase.database().ref('/posts').set(this.posts)
    this.cookieService.set( 'Posts', JSON.stringify(this.posts) );
    

  }

  getPosts(){
   /* firebase.database().ref('/posts')
      .on('value', (data)=>{
        this.posts = data.val() ? data.val() : [];
        this.emitPost()
    })*/
 
  this.cookieExists = this.cookieService.check('Posts');
  if(this.cookieExists){
    this.posts = JSON.parse(this.cookieService.get('Posts'));
  }else{
    this.cookieService.set( 'Posts', '' );
  }
   
  }

  createNewPost(newPost: Post){
    this.posts.push(newPost);
    this.savePosts();
    this.emitPost()
  }

  removePost(post: Post){
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post){
          return true
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPost();
  }

}
