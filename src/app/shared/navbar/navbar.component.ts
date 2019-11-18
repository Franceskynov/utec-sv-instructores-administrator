import { Component, OnInit, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { SharedService } from 'app/services/shared.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Input() public Sidebar: string;
  public decode: any;
  public userName: string;
  constructor(
    private decodeToken: DecodeTokenService,
    private router: Router,
    private loginService: LoginService,
    private toaster: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userName = '';
    this.decode = {
      username: null
    };
    this.getPayloadData();
    this.fixTable();
    const widthPage = window.innerWidth;
    this.resizeBasedInWidth(widthPage);

  }

  public getPayloadData(): void {
    this.decode = this.decodeToken.decodePayload();
    this.userName = this.decode.username;
  }

  public logOut(): void {
    this.loginService.logout().subscribe(response => {
      this.toaster.info(response.data.message, environment.MESSAGES.SERVICE_OK);
      setTimeout(() => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
      }, 500);
    });
    localStorage.clear();
  }


  adjustMenu() {
    const tagBody = document.getElementsByTagName('body')[0];
    const navToggleIcon = document.getElementById('stackNavToggle');
    if (tagBody.classList.contains('menu-expanded')) {
      tagBody.classList.remove('menu-expanded');
      tagBody.classList.add('menu-collapsed');

     // navToggleIcon.classList.remove('ft-toggle-right');
     // navToggleIcon.classList.add('ft-toggle-left');
    } else {
      tagBody.classList.add('menu-expanded');
      tagBody.classList.remove('menu-collapsed');

     // navToggleIcon.classList.add('ft-toggle-right');
      // navToggleIcon.classList.remove('ft-toggle-left');
    }
  }

  adjustNavOver() {
    const tagBody = document.getElementsByTagName('body')[0];
    const tagDivMenu = document.getElementById('stackMenu');
    const tagNavHeader = document.getElementById('stackNavHeader');
    if (tagBody.classList.contains('menu-expanded')) {

    } else {
      // tagDivMenu.classList.add('expanded');
      // tagNavHeader.classList.add('expanded');
    }
  }

  adjustNavLeave() {
    const tagBody = document.getElementsByTagName('body')[0];
    const tagDivMenu = document.getElementById('stackMenu');
    const tagNavHeader = document.getElementById('stackNavHeader');
    if (tagBody.classList.contains('menu-expanded')) {

    } else {
      // tagDivMenu.classList.remove('expanded');
      // tagNavHeader.classList.remove('expanded');
    }
  }

  menuToggleNav() {
    const tagBody = document.getElementsByTagName('body')[0];
    if (tagBody.classList.contains('vertical-menu')) {
      tagBody.classList.remove('vertical-menu');
      tagBody.classList.add('menu-open');
    } else {
      tagBody.classList.remove('menu-open');
      tagBody.classList.add('vertical-menu');
    }
  }

 public fixTable(): void {
    this.sharedService.fixWidthTable();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const widthPage = event.target.innerWidth;
    this.resizeBasedInWidth(widthPage);
  }

  public resizeBasedInWidth(size): void {
    const widthPage = size;
    // const navToggleIcon = document.getElementById('stackNavToggle');
    const tagBody = document.getElementsByTagName('body')[0];
    if (widthPage <= 767) {
      tagBody.classList.add('vertical-overlay-menu');
      tagBody.classList.remove('vertical-menu-modern');
      tagBody.classList.remove('menu-expanded');
      tagBody.classList.remove('menu-collapsed');
      tagBody.classList.add('menu-hide');
    } else {
      tagBody.classList.remove('vertical-overlay-menu');
      tagBody.classList.add('vertical-menu-modern');
      // if (navToggleIcon.classList.contains('ft-toggle-right')) {
      //   tagBody.classList.add('menu-expanded');
      // } else {
      //   tagBody.classList.add('menu-collapsed');
      // }
    }
  }



}
