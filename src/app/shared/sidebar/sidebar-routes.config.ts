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
        path: '/admin/instructores/catalogo',
        title: 'Catalogo',
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
    title: 'Docentes',
    icon: 'ft-users',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: 'badge badge badge-primary badge-pill float-right mr-2',
    isExternalLink: false, isNavHeader: false,
    submenu: [
      {
        path: '/admin/docentes/directorio',
        title: 'Directorio',
        icon: '',
        class: '',
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
        path: '/admin/reporting/instructores',
        title: 'Instructores inscritos',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/reporting/asistencia',
        title: 'Asistencia a materias',
        icon: '',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/reporting/docentes',
        title: 'Docentes inscritos',
        icon: '',
        class: '',
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
        path: '/admin/configuraciones/materias',
        title: 'Materias',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/ciclo',
        title: 'Ciclos',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/facultad',
        title: 'Facultades',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/horario',
        title: 'Horarios',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/aula',
        title: 'Aula',
        icon: '',
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
