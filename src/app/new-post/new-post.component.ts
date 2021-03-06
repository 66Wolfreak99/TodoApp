import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  @ViewChild('postContent') inputName;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      postContent: ['', Validators.required]
    })
  }

  onSavePost(){
    const postContent = this.postForm.get('postContent').value;
    const newPost = new Post(postContent);
    this.postService.createNewPost(newPost);
    this.inputName.nativeElement.value = '';
    this.postForm.reset(postContent)
    this.router.navigate(['/posts']);
    this.postService.createPost = false;
  }

  

}
