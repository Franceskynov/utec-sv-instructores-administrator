import { Component, OnInit,  HostListener, ElementRef, OnDestroy, ViewChild,  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/services/loader.service';
import {LoginService} from 'app/services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public token: any;
  public isShow: boolean;
  public topPosToStartShowing = 40;
  public idle: boolean;
  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userIdle: UserIdleService,
              private toastr: ToastrService,
              private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.idle = false;
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        return appTitle;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
    });

    console.log(environment.production === true);
    if (environment.production) {
      this.userIdle.startWatching();
    }

    this.userIdle.onTimerStart().subscribe(count => {
      console.log(count);
    });

    this.userIdle.onTimeout().subscribe(() => this.logout());
    this.refreshToken();
  }

  public logout(): void {
    this.clean();
    if (this.router.url !== '/login') {
      this.idle = true;
      location.href = '/#/login';
      this.toastr.warning('Por motivos de seguridad se cerro la sesion', 'Inactividad');
    }
  }

  public clean(): void {
    localStorage.clear();
  }

  @HostListener('window:scroll')
  public checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  public gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public refreshToken(): void {
    const expires = localStorage.getItem('expires');
    console.log((Number(expires) * 1000) - 30);
    if (expires) {
      setInterval(() => {
        this.loginService.refreshToken().subscribe(response => {
          if (!response.error) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expires', response.data.expires);
          }
        });
        console.log(
          'new token',
          expires
        );
      }, (
          (Number(expires) * 1000) - 30
        )
      );
    }
  }

  public restart(): void {
    this.userIdle.resetTimer();
  }

  @HostListener('click', ['$event']) onClick() {
    this.restart();
  }

  @HostListener('mouseover', ['$event']) onHover() {
    this.restart();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.refreshToken();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.refreshToken();
  }
  ngOnDestroy(): void {}
}
