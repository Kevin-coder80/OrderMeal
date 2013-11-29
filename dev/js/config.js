requirejs.config( {
  baseUrl: '../',
  paths: {
    libs: 'libs/js',
    js: 'dev/js'
  },
  shim: {
    'libs/jquery.easing': {
      deps: ['libs/jquery']
    },
    'libs/jquery.bookblock': {
      deps: ['libs/jquery']
    },
    'js/orddering-dishes': {
      deps: ['libs/jquery']
    }
  }
} );