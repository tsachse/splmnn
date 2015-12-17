require.config({
  paths: {
    'ng-admin' : '../node_modules/ng-admin/build/ng-admin.min',
    'text' : 'text',
    'sections' : 'sections/config',
    'media' : 'media/config'
  },

  shim: {
    'my_app': {
      deps: ['ng-admin','sections','media','text']
    }
  },

  deps: ['run']

  
});


