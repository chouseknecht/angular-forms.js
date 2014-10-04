
/* global module:true */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                'jshintrc': ".jshintrc"
            },
            uses_defaults: ['app/js/sampleApp.js', 'dist/angular-forms.js', 'dist/angular-modal.js']
        },

        uglify: {
            options: {
                banner: '/*\n *\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n *\n */\n'
            },
            my_target: {
                files: {
                    'dist/angular-forms.min.js': ['dist/angular-forms.js'],
                    'dist/angular-modal.min.js': ['dist/angular-modal.js']
                }
            }
        },
        less: {
            default: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: {
                    "docsite/css/styles.min.css": "docsite/less/styles.less"
                }
            }
        }
    });

    // Load plugins
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['less:default']);

};
