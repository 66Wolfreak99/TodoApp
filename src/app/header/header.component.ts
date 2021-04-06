import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { version } from '../../../package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public version: string = version;

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
  }
  onNewPost(){
   // this.router.navigate(['/new'])
   this.postService.createPost = true
  }
}
