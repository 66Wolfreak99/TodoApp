import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts:Post[];
  postSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

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
