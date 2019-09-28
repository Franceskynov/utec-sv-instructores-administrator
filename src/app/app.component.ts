import { Component, OnInit,  HostListener, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public isShow: boolean;
  public topPosToStartShowing = 40;
  public idle: boolean;
  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userIdle: UserIdleService,
              private toastr: ToastrService,
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
  }

  public logout(): void {
    if (this.router.url !== '/login' && this.router.url !== '/forgotPassword') {
      this.idle = true;
      this.clean();
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

  ngOnDestroy(): void {}
}
