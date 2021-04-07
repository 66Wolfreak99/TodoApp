import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts:Post[];
  postSubscription: Subscription;
  createPost = this.postService.createPost

  constructor(private postService: PostService, private router: Router) { }

  drop(event: CdkDragDrop<Post[]>) {
    moveItemInArray(this.posts, event.previousIndex, event.currentIndex);
    this.postService.savePosts();
    }

  ngOnInit(): void {
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPost()
  }

  onNewPost(){
    this.router.navigate(['/new'])
  }

  onDeletePost(post: Post){
    console.log(post);
    this.postService.removePost(post);
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe()
  }

}
