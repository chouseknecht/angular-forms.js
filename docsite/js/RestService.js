/***********************************************************************
 * Rest.js
 *
 * Part of angular-forms.js documentation web site. Wrapper for $http to
 * make github api calls easier.
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 *
 *  Rest({ data: <JSON object>, url: <string>, method: <string = GET|PUT|POST|OPTION|DELETE>,
 *      headers: <JSON object of key: value pairs });
 *
 *  Note: for url value, leave off the 'base' portion, which in this case is 'https://api.github.com'.
 *  Use ':user' and ':repo' rather than hard coding user and repo name values.
 *
 */

'use strict';

angular.module('RestService', [])
    .factory('Rest', [ '$http', function($http) {
    return function(params) { 
        
        var data = params.data; 
        var urlIn = params.url; 
        var method = params.method;
        var headers = params.headers;
        
        // config
        var base = "https://api.github.com";
        var user = "chouseknecht";
        var repo = "angular-forms.js";

        var url = base + urlIn.replace(/:user/, user).replace(/:repo/, repo);

        return $http({
            method: method,
            url: url,
            data: data,
            headers: headers
            });
    }
    }]);
