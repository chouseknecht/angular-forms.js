/**********************************************
 * navbarCtrl.js
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

    var module = angular.module('sampleApp');

    module.controller('navbarCtrl', ['$scope', '$location', _controller]);

    function _controller($scope, $location) {
        $scope.location = $location.path();
    }

})();