import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let params = this.route.snapshot.params;
    if (Object.keys(params).length && params['code'] != this.usersService.thankYouCode) {
      this.router.navigate(['404']);
    }
  }

  ngOnInit(): void {
  }

}
