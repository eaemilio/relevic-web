// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from 'src/components/Iconify';

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
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
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
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'Lista de Usuarios', path: PATH_DASHBOARD.user.list },
          { title: 'Nuevo Usuario', path: PATH_DASHBOARD.user.new },
          { title: 'Mi Perfil', path: PATH_DASHBOARD.user.account },
        ],
      },

      // PROVIDER
      {
        title: 'Proveedores',
        path: PATH_DASHBOARD.provider.list,
        icon: <Iconify icon={'heroicons:building-library-20-solid'} width={20} height={20} />,
        children: [
          { title: 'Lista de Proveedores', path: PATH_DASHBOARD.provider.list },
          { title: 'Nuevo Proveedor', path: PATH_DASHBOARD.provider.new },
        ],
      },

      // ROLES
      {
        title: 'Roles',
        path: PATH_DASHBOARD.role.list,
        icon: <Iconify icon={'heroicons:lock-open-20-solid'} width={20} height={20} />,
        children: [
          { title: 'Lista de Roles', path: PATH_DASHBOARD.role.list },
          { title: 'Nuevo Rol', path: PATH_DASHBOARD.role.new },
        ],
      },

      // SERVICE TYPES
      {
        title: 'Tipos de Servicio',
        path: PATH_DASHBOARD.serviceType.list,
        icon: <Iconify icon={'heroicons:globe-alt-20-solid'} width={20} height={20} />,
        children: [
          { title: 'Listado', path: PATH_DASHBOARD.serviceType.list },
          { title: 'Nuevo Tipo de Servicio', path: PATH_DASHBOARD.serviceType.new },
        ],
      },

      // PROVINCE
      {
        title: 'Provincias',
        path: PATH_DASHBOARD.serviceType.list,
        icon: <Iconify icon={'heroicons:flag-20-solid'} width={20} height={20} />,
        children: [
          { title: 'Listado de Provincias', path: PATH_DASHBOARD.province.list },
          { title: 'Nueva Provincia', path: PATH_DASHBOARD.province.new },
        ],
      },
      // E-COMMERCE
      // {
      //   title: 'ecommerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE
      // {
      //   title: 'invoice',
      //   path: PATH_DASHBOARD.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
      //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
      //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
      //   ],
      // },

      // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },

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
