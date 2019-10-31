import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnauthorizedComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/', 'login']);
    }, 4000);
  }

}
