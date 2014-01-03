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
        
        //Retrieve the current version
        var url = '/repos/:user/:repo/tags';
        Rest({ method: 'GET', url: url })
            .success( function(data, status, headers, config) {
                $scope.version = data[0].name;
                })
            .error( function(data, status, headers, config) {
                Error({ scope: $scope, msg: 'GET ' + url + ' returned: ' + status });
                });
    
        }]);
