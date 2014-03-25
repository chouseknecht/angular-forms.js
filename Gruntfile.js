
/* global module:true */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                'jshintrc': ".jshintrc"
            },
<<<<<<< HEAD
            uses_defaults: ['app/js/sampleApp.js', 'angular-forms.js', 'angular-modal.js']
=======
            uses_defaults: ['app/js/sampleApp.js', 'dist/angular-forms.js', 'dist/angular-modal.js']
>>>>>>> origin/master
        },

        uglify: {
            options: {
                banner: '/*\n *\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n *\n */\n'
            },
            my_target: {
                files: {
<<<<<<< HEAD
                    'angular-forms.min.js': ['angular-forms.js'],
                    'angular-modal.min.js': ['angular-modal.js']
=======
                    'dist/angular-forms.min.js': ['dist/angular-forms.js'],
                    'dist/angular-modal.min.js': ['dist/angular-modal.js']
>>>>>>> origin/master
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
