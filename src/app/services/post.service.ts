import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { 
    this.getPosts()
  }

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  createPost: boolean = false;

  emitPost(){
    this.postsSubject.next(this.posts)
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts)

  }

  getPosts(){
    firebase.database().ref('/posts')
      .on('value', (data)=>{
        this.posts = data.val() ? data.val() : [];
        this.emitPost()
    })
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
