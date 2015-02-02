/**********************************************
 * sampleApp.js
 *
 * Copyright (c) 2015 Chris Houseknecht
 *
 * For documentation and support visit angularforms.org
 *
 * Distributed as part of angular-forms.js under The MIT License (MIT)
 *
 */

(function() {

    'use strict';

    var module = angular.module('sampleApp', [
        'ngRoute',
        'angularForms',
        'SampleFormDefinition',
        'CheckBoxFormDefinition',
        'RadioFormDefinition',
        'RobotFormDefinition'
    ]);

    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'sampleCtrl'
        })
        .when('/robots', {
            templateUrl: 'partials/robot.html',
            controller: 'robotCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);

    module.run(['$location', '$rootScope', function($location, $rootScope) {

        $rootScope.$on('$routeChangeSuccess', function() {
            // When the path changes, update the navbar
            var path = $location.path();
            $('.navbar ul li a').each(function() {
                var href = $(this).attr('href').replace(/^#/,'');
                if (href === path) {
                    $(this).parent().addClass('active');
                }
                else {
                    $(this).parent().removeClass('active');
                }
            });
        });
    }]);

})();








