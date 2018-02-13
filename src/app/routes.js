
export default {
  Main : {
    text : 'BrainWave',
    path : '/',
  },

  Game : {
    path : '/game',
  },

  Team : {
    text : 'Профиль',
    path : '/profile',
  },

  About : {
    text : 'About',
    path : '/about',
  },

  SignUp : {
    text : 'Sign Up',
    path : '/signup',
  },

  Login : {
    text : 'Sign In',
    path : '/signin',
  },

  ResetPassword : {
    text : 'Reset password',
    path : '/reset_password',
    params : '/:userId/:token+',
  },

  Forbidden : {
    text : 'HTTP Forbidden (403)',
    path : '/forbidden',
  },
};
