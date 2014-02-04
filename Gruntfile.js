module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
        options: {
            "browser": true,
            "esnext": true,
            "globals": { "angular": true, "$":true, "alert": true },
            "globalstrict": true,
            "strict": false,
            "quotmark": true,
            "smarttabs": true,
            "trailing": true,
            "undef": true,
            "unused": true,
            "eqeqeq": true
        },
        uses_defaults: ['app/js/sampleApp.js', 'angular-forms.js', 'angular-modal.js']
    },

    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        my_target: {
            files: {
                'angular-forms.min.js': ['angular-forms.js'],
                'angular-modal.min.js': ['angular-modal.js']
            }
        }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);

};
