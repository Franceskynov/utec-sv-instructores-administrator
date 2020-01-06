import { Component, OnInit } from '@angular/core';
import { ADM_ROUTES, DCNT_ROUTES, INSTR_ROUTES, CORD_ROUTES } from './sidebar-routes.config';
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

      if (this.token.is_admin === '1' && this.token.role === 'Administrador') {
        this.menuItems = ADM_ROUTES.filter(menuItem => menuItem);
      } else if (this.token.is_admin === '1' && this.token.role === 'Coordinador') {
        this.menuItems = CORD_ROUTES.filter(menuItem => menuItem);
      } else if (this.token.is_admin === '0' && this.token.role === 'Docente') {
        this.menuItems = DCNT_ROUTES.filter(menuItem => menuItem);
      } else {
        this.menuItems = INSTR_ROUTES.filter(menuItem => menuItem);
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

  menuItemOption(index) {
    const AllItems = document.getElementsByClassName('has-sub');
    const menuItem = document.getElementById('mi-' + index);
    if (menuItem.classList.contains('open')) {
      menuItem.classList.remove('open');
    } else {

      for (let el = 0; el < AllItems.length; el++) {
        const idMenu = 'mi-' + index;
        if (AllItems[el].id !== idMenu) {
          AllItems[el].classList.remove('open');
        }
      }
      menuItem.classList.add('open');
    }
  }

  subMenuActived(index) {
    this.menuItemOption(index);
  }


}
