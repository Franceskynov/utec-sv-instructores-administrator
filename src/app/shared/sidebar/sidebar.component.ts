import { Component, OnInit } from '@angular/core';
import { ADM_ROUTES, DCNT_ROUTES, INSTR_ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { DecodeTokenService } from 'app/services/decode-token.service';

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public token: any;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private decodeToken: DecodeTokenService,
    ) {}

    ngOnInit() {
      this.token = this.token = {
        iss: null,
        iat: null,
        exp: null,
        nbf: null,
        jti: null,
        sub: null,
        prv: null,
        is_admin: null,
        role: null,
        descrpcn: null,
        username: null,
        email: null
      };
      this.buildMenu();
    }

    public buildMenu(): void {
      this.token = this.decodeToken.decodePayload();
      console.log('from sidebar', this.token);
      $.getScript('./assets/app/js/core/app-menu.js');
      $.getScript('./assets/app/js/core/app.js');

      if (this.token.is_admin === '1' && this.token.role === 'Administrador') {
        this.menuItems = ADM_ROUTES.filter(menuItem => menuItem);
      } else if (this.token.is_admin === '0' && this.token.role === 'Docente') {
        this.menuItems = DCNT_ROUTES.filter(menuItem => menuItem);
      } else {
        this.menuItems = INSTR_ROUTES.filter(menuItem => menuItem);
      }
    }

}
