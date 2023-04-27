import {
    LAYOUT, 
    MENU_BEHAVIOUR,
    NAV_COLOR, 
    MENU_PLACEMENT, 
    RADIUS, 
    THEME_COLOR, 
    USER_ROLE } 
    from 'constants.js';

// export const IS_DEMO = localstorage.getItem("isLogin");
export const IS_DEMO = localStorage.getItem("isLogin") == "true" ? true : false;
export const IS_AUTH_GUARD_ACTIVE = true;
// export const SERVICE_URL = 'http://billy247.com:3002/api/v1';
export const SERVICE_URL = 'http://192.168.1.68:8000/api/v1';

export const USE_MULTI_LANGUAGE = true;

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
// export const REACT_HELMET_PROPS = {
//   defaultTitle: 'Acorn Admin Template',
//   titleTemplate: '%s | Acorn Admin Template',
// };

export const REACT_HELMET_PROPS = {
  defaultTitle: "Billy",
  titleTemplate: "Billy",
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboard/',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Vertical,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Unpinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightPurple,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name :'Shunya Ekai',
  thumb: '/img/profile/profile-12.png',
  // role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'elearning-portal';
