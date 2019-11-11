import { RouteInfo } from './sidebar.metadata';

const ADMIN_ROUTES: RouteInfo[] = [
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
    {
      path: '/admin/instructores/instructoria',
      title: 'Instructorias',
      icon: '',
      class: 'menu-item',
      badge: '',
      badgeClass: '',
      isExternalLink: false,
      isNavHeader: false,
      submenu: []
    },
    {
      path: '/admin/instructores/historial',
      title: 'Historial de asistencia',
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
        path: '/admin/reporting/dashboard',
        title: 'Dashboard',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
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
        title: 'Instructorias',
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
      {
        path: '/admin/reporting/notas',
        title: 'Notas',
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
        path: '/admin/configuraciones/escuelas',
        title: 'Escuelas',
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
      // {
      //   path: '/admin/configuraciones/horario',
      //   title: 'Horarios',
      //   icon: '',
      //   class: 'menu-item',
      //   badge: '',
      //   badgeClass: '',
      //   isExternalLink: false,
      //   isNavHeader: false,
      //   submenu: []
      // },
      {
        path: '/admin/configuraciones/edificio',
        title: 'Edificios',
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
      {
        path: '/admin/configuraciones/especialidad',
        title: 'Especialidad',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/capacitacion',
        title: 'Capacitacion',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/usuarios',
        title: 'Usuarios',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/configuraciones/preferencias',
        title: 'Preferencias del sistema',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  }];
const DOCENTE_ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Instructorias',
    icon: 'ft-book',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: 'badge badge badge-primary badge-pill float-right mr-2',
    isExternalLink: false, isNavHeader: false,
    submenu: [
      {
        path: '/docente/dashboard',
        title: 'Dashboard',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/docente/instructoria',
        title: 'Instructoria',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/docente/materias',
        title: 'Materias impartidas',
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
const INSTRUCTOR_ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Instructor',
    icon: 'ft-book',
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: 'badge badge badge-primary badge-pill float-right mr-2',
    isExternalLink: false, isNavHeader: false,
    submenu: [
      {
        path: '/instructor/dashboard',
        title: 'Dashboard',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/instructor/instructoria',
        title: 'Instructoria',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/instructor/historial',
        title: 'Historial',
        icon: '',
        class: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/instructor/horasSociales',
        title: 'Horas sociales',
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
];

export const ADM_ROUTES: RouteInfo[] = [...ADMIN_ROUTES];
export const DCNT_ROUTES: RouteInfo[] = [...DOCENTE_ROUTES];
export const INSTR_ROUTES: RouteInfo[] = [...INSTRUCTOR_ROUTES];
