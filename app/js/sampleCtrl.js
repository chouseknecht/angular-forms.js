/**********************************************
 * sampleCtrl.js
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

    module.controller('sampleCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        '$sce',
        'SampleForm',
        'CheckBoxForm',
        'RadioForm',
        _controller]);

    function _controller(
        $scope,
        $rootScope,
        $location,
        $sce,
        SampleForm,
        CheckBoxForm,
        RadioForm) {

        $scope.basicForm = SampleForm;

        $scope.reset = function() { };

        $scope.sources = [
            { id: 'google', label: 'Google' },
            { id: 'yahoo', label: 'Yahoo!' },
            { id: 'bing', label: 'Bing' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'word', label: 'A friend told me' },
            { id: 'other', label: 'Other' }
        ];

        $scope.$on('FormReady', function(e, formName) {
            console.log(formName + ': ready!');
        });

        /*
        checkboxAf = AngularForms({ scope: $scope, targetId: 'checkboxForm', form: CheckBoxForm });
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
        cbHorizontalFormAf = AngularForms({ scope: $scope, targetId: 'checkboxHorizontalForm', form: cbHorizontalForm });
        cbHorizontalFormAf.inject();

        radio = AngularForms({ scope: $scope, targetId: 'radioForm', form: RadioForm });
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
        hRadioForm = AngularForms({ scope: $scope, targetId: 'radioHorizontalForm', form: hRadio });
        hRadioForm.inject();

        // Modal dialog testing
        $scope.testModal = function() {
            var modal = AngularModal({ scope: $scope, modal: ExampleModal1, targetId: 'modal-target' });
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
        */
    }

})();