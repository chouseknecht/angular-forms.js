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

var app = angular.module('docApp', ['ngRoute', 'RestService', 'Utilities', 'AngularFormsModule', 'SampleFormDefinition'])
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
        
        $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
            // When the path changes, update the navbar
            var path = $location.path();
            $('.navbar ul li a').each(function(idx) {
                var href = $(this).attr('href').replace(/^#/,'');
                if (href == path) {
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
        
        var form = AngularForms({ scope: $scope, targetId: 'exampleForm', form: SampleForm });
        
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

        // Get version info and download URL
        if ($scope.removeRepoLoad) {
            $scope.removeRepoLoad();
        }
        $scope.removeRepoLoad = $scope.$on('RepoLoaded', function(e, html_url) {
            //Retrieve the current version
            var url = '/repos/:user/:repo/releases';
            Rest({ method: 'GET', url: url })
                .success( function(data, status, headers, config) {
                    $scope.version = data[0].tag_name;
                    $scope.version_name = data[0].name; 
                    $scope.download_url = html_url + '/releases/download/' + data[0].tag_name + '/' + data[0].assets[0].name;
                    })
                .error( function(data, status, headers, config) {
                    Error({ scope: $scope, msg: 'GET ' + url + ' returned: ' + status });
                    });
            });
        
        // Get repo info
        var url = '/repos/:user/:repo'; 
        Rest({ method: 'GET', url: url })
            .success( function(data, status, headers, config) {
                $scope.$emit('RepoLoaded', data.html_url);
                })
            .error( function(data, status, headers, config) {
                Error({ scope: $scope, msg: 'GET ' + url + ' returned: ' + status });
                });
        
        $scope.destroyForm = function() {
            $scope.destroyFormHide = true;
            $scope.exampleFormReady =  false;
            $('#exampleForm').empty();
            }

        $scope.showForm = function() {
            $scope.destroyFormHide = false;
            $('#exampleForm').empty(); 
            form.inject();
            $scope.exampleFormReady =  true;
            }

        $scope.save = function() {
            alert('Your changes were saved!');
            form.clearErrors();
            form.resetForm();
            }
        
        $scope.reset = function() {
            form.clearErrors();
            form.resetForm();
            }

        }]);

app.controller('referenceController', ['$scope', '$location', function($scope, $location) {
        }]);
