// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from 'src/components/Iconify';
import { ModuleType } from 'src/@types/module';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // CASOS
      {
        title: 'Casos',
        path: PATH_DASHBOARD.general.cases.root,
        icon: <Iconify icon={'bi:inbox-fill'} width={20} height={20} />,
      },
      {
        title: 'Víctimas',
        path: PATH_DASHBOARD.general.victims.root,
        icon: <Iconify icon={'bi:person-video2'} width={20} height={20} />,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administración',
    items: [
      // USER
      {
        title: 'Usuarios',
        path: PATH_DASHBOARD.user.list,
        icon: <Iconify icon={'heroicons:user-circle-20-solid'} width={20} height={20} />,
        children: [
          { title: 'Lista de Usuarios', path: PATH_DASHBOARD.user.list, moduleId: ModuleType.USER },
          { title: 'Nuevo Usuario', path: PATH_DASHBOARD.user.new, moduleId: ModuleType.USER },
          { title: 'Mi Cuenta', path: PATH_DASHBOARD.user.account },
        ],
      },

      // PROVIDER
      {
        title: 'Proveedores',
        moduleId: ModuleType.PROVIDER,
        onlyRootProvider: true,
        path: PATH_DASHBOARD.provider.list,
        icon: <Iconify icon={'heroicons:building-library-20-solid'} width={20} height={20} />,
        children: [
          {
            title: 'Lista de Proveedores',
            path: PATH_DASHBOARD.provider.list,
            moduleId: ModuleType.PROVIDER,
            onlyRootProvider: true,
          },
          {
            title: 'Nuevo Proveedor',
            path: PATH_DASHBOARD.provider.new,
            moduleId: ModuleType.PROVIDER,
            onlyRootProvider: true,
          },
        ],
      },

      // ROLES
      {
        title: 'Roles',
        moduleId: ModuleType.ROLE,
        onlyRootProvider: true,
        path: PATH_DASHBOARD.role.list,
        icon: <Iconify icon={'heroicons:lock-open-20-solid'} width={20} height={20} />,
        children: [
          {
            title: 'Lista de Roles',
            path: PATH_DASHBOARD.role.list,
            moduleId: ModuleType.ROLE,
            onlyRootProvider: true,
          },
          {
            title: 'Nuevo Rol',
            path: PATH_DASHBOARD.role.new,
            moduleId: ModuleType.ROLE,
            onlyRootProvider: true,
          },
        ],
      },

      // SERVICE TYPES
      {
        title: 'Tipos de Servicio',
        moduleId: ModuleType.SERVICE_TYPE,
        path: PATH_DASHBOARD.serviceType.list,
        onlyRootProvider: true,
        icon: <Iconify icon={'heroicons:globe-alt-20-solid'} width={20} height={20} />,
        children: [
          {
            title: 'Listado',
            path: PATH_DASHBOARD.serviceType.list,
            moduleId: ModuleType.SERVICE_TYPE,
            onlyRootProvider: true,
          },
          {
            title: 'Nuevo Tipo de Servicio',
            path: PATH_DASHBOARD.serviceType.new,
            moduleId: ModuleType.SERVICE_TYPE,
            onlyRootProvider: true,
          },
        ],
      },

      // PROVINCE
      {
        title: 'Provincias',
        moduleId: ModuleType.PROVINCE,
        onlyRootProvider: true,
        path: PATH_DASHBOARD.serviceType.list,
        icon: <Iconify icon={'heroicons:flag-20-solid'} width={20} height={20} />,
        children: [
          {
            title: 'Listado de Provincias',
            path: PATH_DASHBOARD.province.list,
            moduleId: ModuleType.PROVINCE,
            onlyRootProvider: true,
          },
          {
            title: 'Nueva Provincia',
            path: PATH_DASHBOARD.province.new,
            moduleId: ModuleType.PROVINCE,
            onlyRootProvider: true,
          },
        ],
      },

      // EVALUATION AREA
      {
        title: 'Áreas de Evaluación',
        // moduleId: ModuleType.EVALUATION_AREA, FIXME
        path: PATH_DASHBOARD.evaluationArea.list,
        onlyRootProvider: true,
        icon: <Iconify icon={'heroicons:pencil-square-20-solid'} width={20} height={20} />,
        children: [
          {
            title: 'Listado',
            path: PATH_DASHBOARD.evaluationArea.list,
            onlyRootProvider: true,
            // moduleId: ModuleType.EVALUATION_AREA, FIXME
          },
          {
            title: 'Nueva área de evaluación',
            path: PATH_DASHBOARD.evaluationArea.new,
            onlyRootProvider: true,
            // moduleId: ModuleType.EVALUATION_AREA, FIXME
          },
        ],
      },
    ],
  },

  // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.menuItem,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level_1',
  //       path: '#/dashboard/menu_level_1',
  //       icon: ICONS.menuItem,
  //       children: [
  //         { title: 'menu_level_2a', path: '#/dashboard/menu_level_1/menu_level_2a' },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level_1/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     { title: 'item_disabled', path: '#disabled', icon: ICONS.menuItem, disabled: true },
  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.menuItem,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     { title: 'item_external_link', path: 'https://www.google.com/', icon: ICONS.menuItem },
  //   ],
  // },
];

export default navConfig;
