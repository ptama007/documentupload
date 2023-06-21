import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.usersService.textFor404 == '404'){
      this.router.navigate(['404']);
    } 
  }

}
