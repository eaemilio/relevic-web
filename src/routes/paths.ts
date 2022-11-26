// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),

    cases: {
      root: path(ROOTS_DASHBOARD, '/case'),
      list: path(ROOTS_DASHBOARD, '/case/list'),
      new: path(ROOTS_DASHBOARD, '/case/new'),
      edit: (id: number) => path(ROOTS_DASHBOARD, `/case/${id}`),
      followUp: (id: number) => path(ROOTS_DASHBOARD, `/case/follow-up/${id}`),
    },

    victims: {
      root: path(ROOTS_DASHBOARD, '/victim'),
      list: path(ROOTS_DASHBOARD, '/victim/list'),
      new: path(ROOTS_DASHBOARD, '/victim/new'),
      edit: (id: number) => path(ROOTS_DASHBOARD, `/victim/${id}`),
    },
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/user/${id}`),
  },
  provider: {
    root: path(ROOTS_DASHBOARD, '/provider'),
    list: path(ROOTS_DASHBOARD, '/provider/list'),
    new: path(ROOTS_DASHBOARD, '/provider/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/provider/${id}`),
  },
  role: {
    root: path(ROOTS_DASHBOARD, '/role'),
    list: path(ROOTS_DASHBOARD, '/role/list'),
    new: path(ROOTS_DASHBOARD, '/role/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/role/${id}`),
  },
  serviceType: {
    root: path(ROOTS_DASHBOARD, '/service-type'),
    list: path(ROOTS_DASHBOARD, '/service-type/list'),
    new: path(ROOTS_DASHBOARD, '/service-type/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/service-type/${id}`),
  },
  province: {
    root: path(ROOTS_DASHBOARD, '/province'),
    list: path(ROOTS_DASHBOARD, '/province/list'),
    new: path(ROOTS_DASHBOARD, '/province/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/province/${id}`),
  },
  evaluationArea: {
    root: path(ROOTS_DASHBOARD, '/evaluation-area'),
    list: path(ROOTS_DASHBOARD, '/evaluation-area/list'),
    new: path(ROOTS_DASHBOARD, '/evaluation-area/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/evaluation-area/${id}`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
