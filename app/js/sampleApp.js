/**********************************************
 * sampleApp.js
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 * Distributed as part of angular-forms.js under The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

'use strict';

angular.module('sampleApp', ['ngRoute','AngularFormsModule', 'AngularModalModule', 'SampleFormDefinition', 'CheckBoxFormDefinition',
    'RadioFormDefinition', 'RobotFormDefinition', 'ExampleModal1Definition'])
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'sampleController'
        })
        .when('/robots', {
            templateUrl: 'partials/robot.html',
            controller: 'robotController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }])

    .run(['$location', '$rootScope', function($location, $rootScope) {
        
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
    }])
    
    .controller('navbarController', ['$scope', '$location', function($scope, $location) {
        $scope.location = $location.path();
    }])

    .controller('sampleController', ['$scope', '$rootScope', '$location', '$sce', 'AngularForms', 'AngularModal', 'SampleForm',
    'CheckBoxForm', 'RadioForm', 'ExampleModal1',
    function($scope, $rootScope, $location, $sce, AngularForms, AngularModal, SampleForm, CheckBoxForm, RadioForm, ExampleModal1) {
        
        var c, i, fld, form, horizontalForm, horizontalAf, checkboxAf, cbHorizontalForm, cbHorizontalFormAf,
            radio, hRadio, hRadioForm;

        //Inject the sample form
        form = new AngularForms({ scope: $scope, targetId: 'basicForm', form: SampleForm });
        form.inject();
        $scope.reset = function() {
            form.resetForm();
        };
        
        //Copy of our sample form, make a couple quick changes and render as a horizontal form.
        horizontalForm = angular.copy(SampleForm);
        horizontalForm.horizontal = true;
        horizontalForm.name = 'SampleFormHorizontal';
        for (fld in horizontalForm.fields) {
            horizontalForm.fields[fld].srOnly = false;
            horizontalForm.fields[fld].ngModel = fld + '_horizontal';
            if (horizontalForm.fields[fld].helpText) {
                horizontalForm.fields[fld].placeholder = horizontalForm.fields[fld].helpText;
                delete horizontalForm.fields[fld].helpText;
            }
            if (fld === 'other_source') {
                horizontalForm.fields[fld].ngShow = 'referral_source_horizontal == \"other\"';
                horizontalForm.fields[fld].ngRequired = 'referral_source_horizontal == \"other\"';
            }
        }
        horizontalForm.buttons.reset.ngClick = 'horizontalReset()';
        horizontalAf = new AngularForms({ scope: $scope, targetId: 'horizontalForm', form: horizontalForm });
        horizontalAf.inject();
        $scope.horizontalReset = function() {
            horizontalAf.resetForm();
        };

        $scope.sources = [
            { id: 'google', label: 'Google' },
            { id: 'yahoo', label: 'Yahoo!' },
            { id: 'bing', label: 'Bing' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'word', label: 'A friend told me' },
            { id: 'other', label: 'Other' }
        ];

        checkboxAf = new AngularForms({ scope: $scope, targetId: 'checkboxForm', form: CheckBoxForm });
        checkboxAf.inject();

        //Copy the sample checkbox form, make a few changes, and render it as a horizontal form.
        cbHorizontalForm = angular.copy(CheckBoxForm);
        cbHorizontalForm.horizontal = true;
        cbHorizontalForm.fields.standard_checkbox.ngModel = 'standard_checkbox_horizontal';
        delete cbHorizontalForm.fields.checkbox_group.groupClass;
        for (i=0; i < cbHorizontalForm.fields.checkbox_group.checkboxes.length; i++) {
            c = cbHorizontalForm.fields.checkbox_group.checkboxes[i];
            c.model = c.model + '_horizontal';
            if (c.ngShow) {
                c.ngShow = c.ngShow + '_horizontal';
            }
        }
        cbHorizontalFormAf = new AngularForms({ scope: $scope, targetId: 'checkboxHorizontalForm', form: cbHorizontalForm });
        cbHorizontalFormAf.inject();

        radio = new AngularForms({ scope: $scope, targetId: 'radioForm', form: RadioForm });
        radio.inject();

        //Copy the sample radio form, make a few changes, and render it as a horizontal form.
        hRadio = angular.copy(RadioForm);
        hRadio.horizontal = true;
        for (fld in hRadio.fields) {
            if (hRadio.fields[fld].ngModel) {
                hRadio.fields[fld].ngModel = hRadio.fields[fld].ngModel + '_horizontal';
            }
            else {
                hRadio.fields[fld].ngModel = fld + '_horizontal';
            }
        }
        delete hRadio.fields.radio_group.groupClass;
        hRadioForm = new AngularForms({ scope: $scope, targetId: 'radioHorizontalForm', form: hRadio });
        hRadioForm.inject();

        // Modal dialog testing
        $scope.testModal = function() {
            var modal = new AngularModal({ scope: $scope, modal: ExampleModal1, targetId: 'modal-target' });
            modal.inject();
            $scope.exampleModal1Header = 'Example Modal Dialog';
            $scope.sayHello(); //call to set default values
            $scope[ExampleModal1.name + '_show'] = true;
        };

        $scope.sayHello = function() {
            if ($scope.sayHelloLabel === 'Say Hello!') {
                $scope.exampleModal1HTML = $sce.trustAsHtml('<h5>Hello!</h5> <p>Here we are, dynamically injecting html into the modal ' +
                    ' and changing btn attributes and classes all by adjust $scope variables. Awesome!</p>');
                $scope.sayHelloLabel = 'Revert';
                $scope.sayHelloIcon = 'fa-refresh';
                $scope.sayHelloClass = 'btn btn-success';
            }
            else {
                $scope.exampleModal1HTML = $sce.trustAsHtml('<p>Click the hello button or click close to dismiss this message.</p>');
                $scope.sayHelloLabel = 'Say Hello';
                $scope.sayHelloIcon = 'fa-bullhorm';
                $scope.sayHelloClass = 'btn btn-primary';
            }
        };

    }])

    .controller('robotController', ['$scope', '$rootScope', '$location', 'AngularForms', 'RobotForm',
    function($scope, $rootScope, $location, AngularForms, RobotForm) {
        
        $scope.order_complete = false;

        //Inject the robot order form
        var form = new AngularForms({ scope: $scope, targetId: 'orderForm', form: RobotForm });
        form.inject();
        form.resetForm();
        
        $scope.reset = function() {
            form.resetForm();
        };
        
        $scope.save = function() {
            var errors = 0;
            form.clearErrors(); // clear custom error messages
            if ($scope.arms > 2 && $scope.legs < 3) {
                $scope[RobotForm.name + '_legs_error'] = 'More than 2 arms requires a minimum of 3 legs';
                $scope[RobotForm.name].legs.$pristine = false;
                $scope[RobotForm.name].legs.$dirty = true;
                errors++;
            }
            if ($scope.legs < 3 && $scope.head_size === 'large') {
                $scope[RobotForm.name + '_head_size_error'] = 'A large head requires a minimum of 3 legs';
                $scope[RobotForm.name].head_size.$pristine = false;
                $scope[RobotForm.name].head_size.$dirty = true;
                errors++;
            }
            if ($scope.name.toLowerCase() === 'bob' || $scope.name.toLowerCase() === 'dave' || $scope.name.toLowerCase() === 'mike') {
                $scope[RobotForm.name + '_name_error'] = 'That name is already taken';
                errors++;
            }
            if (errors === 0) {
                // wait a half tick so screen can repaint (showing error messages cleared) before displaying alert dialog
                setTimeout(function() { alert('Congratuations! We\'re building your robot.'); }, 500);
            }
        };

    }]);








