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

var app = angular.module('docApp', ['RestService', 'Utilities', 'AngularFormsModule', 'SampleFormDefinition']);

app.controller('docController', ['$scope', 'Rest', 'Error', 'AngularForms', 'SampleForm',
    function($scope, Rest, Error, AngularForms, SampleForm) {
        
        var form = AngularForms({ scope: $scope, targetId: 'exampleForm', form: SampleForm });
        
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
        
        $scope.showForm = function() {  
            form.inject();
            $scope.exampleFormReady =  true;
            }

        $scope.save = function() { alert('Your changes were saved!'); }
        $scope.reset = function() { form.clearErrors(); form.resetForm(); }

        }]);
