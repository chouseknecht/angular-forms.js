/***********************************************************************
 * Utilities.js
 *
 * Part of angular-forms.js documentation web site. Misc helper functions.
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 */

'use strict';

angular.module('Utilities', ['ui.bootstrap'])
    
    // Use to show an modal error message
    .factory('Error', ['$modal', function($modal) {
    return function(params) { 

        var msg = params.msg; 
        var scope = params.scope;
        
        scope.error_message = params.msg; 
        
        console.log('here');
        
        var errorModalController = function($scope, $modalInstance) {
            $scope.ok = function() { $modalInstance.dismiss() }; 
            }

        var modalInstance = $modal.open({
            scope: scope,
            templateUrl: 'errorModal.html',
            controller: errorModalController
            });
        
        }
        }]);