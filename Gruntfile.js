
/* global module:true */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                'jshintrc': ".jshintrc"
            },
            uses_defaults: ['app/js/sampleApp.js', 'angular-forms.js', 'angular-modal.js']
        },

        uglify: {
            options: {
                banner: '/*\n *\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n *\n */\n'
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
