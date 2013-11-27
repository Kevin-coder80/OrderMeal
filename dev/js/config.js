requirejs.config( {
  baseUrl: '../',
  paths: {
    libs: 'libs/js',
    js: 'dev/js'
  },
  shim: {
    'libs/jquery.bookblock': {
      deps: ['libs/jquery'],
      exports: 'BookBlock'
    }
  }
} );

requirejs( ['js/bookblock'] );