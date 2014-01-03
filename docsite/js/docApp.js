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

var app = angular.module('docApp', ['RestService', 'Utilities']);

app.controller('docController', ['$scope', 'Rest', 'Error',
    function($scope, Rest, Error) {
        
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

        }]);
