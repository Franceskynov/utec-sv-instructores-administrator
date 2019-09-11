import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Instructores',
    icon: 'ft-book',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: 'badge badge badge-primary badge-pill float-right mr-2',
    isExternalLink: false, isNavHeader: false,
    submenu: [
      {
        path: '/instructores/catalogo',
        title: 'Catalogo',
        icon: 'ft-list',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Docentes',
    icon: 'ft-users',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: 'badge badge badge-primary badge-pill float-right mr-2',
    isExternalLink: false, isNavHeader: false,
    submenu: [
      {
        path: '/docentes/directorio',
        title: 'Directorio',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Reportes',
    icon: 'ft-bar-chart-2',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/reporting/instructors',
        title: 'Instructores inscritos',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/reporting/subjects',
        title: 'Asistencia a materias',
        icon: 'ft-paperclip',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/reporting/teachers',
        title: 'Docentes inscritos',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Configuraciones',
    icon: 'ft-settings',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/configuraciones/materias',
        title: 'Materias',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/configuraciones/ciclo',
        title: 'Ciclos',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/configuraciones/facultad',
        title: 'Facultades',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/configuraciones/horario',
        title: 'Horarios',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/configuraciones/aula',
        title: 'Aula',
        icon: 'ft-user-check',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  }

];
