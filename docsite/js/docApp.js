/**********************************************
 * docApp.js
 *
 * Part of angular-forms.js documentation web site.
 *
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 */

'use strict';

var app = angular.module('docApp', ['ngRoute', 'RestService', 'Utilities', 'AngularFormsModule', 'SampleFormDefinition',
    'RobotFormDefinition'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/docsite/partials/index_partial.html',
            controller: 'mainController'
        })
        .when('/reference', {
            templateUrl: '/docsite/partials/reference_partial.html',
            controller: 'referenceController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }])

    .run(['$location', '$rootScope', function($location, $rootScope) {
        
        $rootScope.$on("$routeChangeSuccess", function() {
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

app.controller('mainController', ['$scope', 'Rest', 'Error', 'AngularForms', 'SampleForm',
    function($scope, Rest, Error, AngularForms, SampleForm) {
        
        var form = AngularForms({ scope: $scope, targetId: 'exampleForm', form: SampleForm }),
            url;
        
        $scope.destroyFormHide = true;
        $scope.exampleFormReady =  false;

        $scope.sources = [
            { id: 'google', label: 'Google' },
            { id: 'yahoo', label: 'Yahoo!' },
            { id: 'bing', label: 'Bing' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'word', label: 'A friend told me' },
            { id: 'other', label: 'Other' }
        ];
       
        $('.fade-in').show(500);

        // Get version info and download URL
        if ($scope.removeRepoLoad) {
            $scope.removeRepoLoad();
        }
        $scope.removeRepoLoad = $scope.$on('RepoLoaded', function(e, html_url) {
            //Retrieve the current version
            var url = '/repos/:user/:repo/releases';
            Rest({ method: 'GET', url: url })
                .success( function(data) {
                    $scope.version = data[0].tag_name;
                    $scope.version_name = data[0].name;
                    $scope.download_url = html_url + '/releases/download/' + data[0].tag_name + '/' + data[0].assets[0].name;
                })
                .error( function(data, status) {
                    Error({ scope: $scope, msg: 'GET ' + url + ' returned: ' + status });
                });
        });
        
        // Get repo info
        url = '/repos/:user/:repo';
        Rest({ method: 'GET', url: url })
            .success( function(data) {
                $scope.$emit('RepoLoaded', data.html_url);
            })
            .error( function(data, status) {
                Error({ scope: $scope, msg: 'GET ' + url + ' returned: ' + status });
            });
        
        $scope.destroyForm = function() {
            $scope.destroyFormHide = true;
            $scope.exampleFormReady =  false;
            $('#exampleForm').empty();
        };

        $scope.showForm = function() {
            $scope.destroyFormHide = false;
            $('#exampleForm').empty();
            form.inject();
            $scope.exampleFormReady =  true;
        };

        $scope.save = function() {
            alert('Your changes were saved!');
            form.clearErrors();
            form.resetForm();
        };
        
        $scope.reset = function() {
            form.clearErrors();
            form.resetForm();
        };

    }
]);

app.controller('referenceController', ['$scope', 'RobotForm', 'AngularForms',
    function($scope, RobotForm, AngularForms) {

        $('.fade-in').show(500);
        
        /* Setup the robot order form. This gets displayed under Error handling. */

        $scope.order_complete = false;

        //Inject the robot order form
        var form = AngularForms({ scope: $scope, targetId: 'orderForm', form: RobotForm });
        form.inject();
        form.resetForm();
        
        $scope.reset = function() {
            form.resetForm();
        };
        
        $scope.save = function() {
            var errors = 0;
            form.clearErrors(); // clear custom error messages
            if ($scope.arms > 2 && $scope.legs < 3) {
                form.setError('legs', 'More than 2 arms requires a minimum of 3 legs');
                errors++;
            }
            if ($scope.legs < 3 && $scope.head_size === 'large') {
                form.setError('head_size', 'A large head requires a minimum of 3 legs');
                errors++;
            }
            if ($scope.name.toLowerCase() === 'bob' || $scope.name.toLowerCase() === 'dave' || $scope.name.toLowerCase() === 'mike') {
                form.setError('name', 'That name is already taken');
                errors++;
            }
            if (errors === 0) {
                // wait a half tick so screen can repaint (showing error messages cleared) before displaying alert dialog
                setTimeout(function() { alert('Congratuations! We\'re building your robot.'); }, 500);
            }
        };
        
        // Affix parameters
        $scope.getHeaderHeight = function() { return $('.jumbotron').outerHeight(true); };
        $scope.getFooterHeight = function() { return $('.footer').outerHeight(true) + 25; };
    }
]);

// Make twitter bootstrap Affix work
app.directive('afAffix', [ function() {
    return {
        link: function(scope, element, attr) {
            // apply TB affix
            var options = {};
            if (attr.topOffset) {
                if (/^\d+$/.test(attr.topOffset)) {
                    options.top = parseInt(attr.topOffset,10);
                }
                else if (scope[attr.topOffset]) {
                    // user passed a scope variable
                    options.top = scope[attr.topOffset];
                }
            }
            if (attr.bottomOffset) {
                if (/^\d+$/.test(attr.bottomOffset)) {
                    options.bottom = parseInt(attr.bottomOffset,10);
                }
                else if (scope[attr.bottomOffset]) {
                    // user passed a scope variable
                    options.bottom = scope[attr.bottomOffset];
                }
            }
            console.log('affixed');
            console.log(options);
            $(element).affix({ offset: options });
        }
    };
}]);

