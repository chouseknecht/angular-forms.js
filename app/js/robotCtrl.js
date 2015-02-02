/**********************************************
 * robotCtrl.js
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

    module.controller('robotCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'RobotForm',
        _controller
    ]);

    function _controller(
        $scope,
        $rootScope,
        $location,
        RobotForm) {

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
    }

})();