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

angular.module('sampleApp', ['AngularFormsModule', 'SampleFormDefinition', 'CheckBoxFormDefinition', 'RadioFormDefinition'])
    .controller('sampleController', ['$scope', 'AngularForms', 'SampleForm', 'CheckBoxForm', 'RadioForm',
    function($scope, AngularForms, SampleForm, CheckBoxForm, RadioForm) {
        var form = AngularForms({ scope: $scope, targetId: 'basicForm', form: SampleForm });       
        form.inject();
        
        //Copy of our sample form, make a couple quick changes and render as a horizontal form.
        var horizontal = angular.copy(SampleForm); 
        horizontal['horizontal'] = true;
        horizontal['name'] = 'SampleFormHorizontal';
        for (var fld in horizontal.fields) {
            horizontal.fields[fld].srOnly = false;
            horizontal.fields[fld].ngModel = fld + '_horizontal';
            if (horizontal.fields[fld].helpText) {
                horizontal.fields[fld].placeholder = horizontal.fields[fld].helpText;
                delete horizontal.fields[fld].helpText;
            }
            if (fld == 'other_source') {
                horizontal.fields[fld].ngShow = "referral_source_horizontal == 'other'";
                horizontal.fields[fld].ngRequired = "referral_source_horizontal == 'other'";
            }
        }
        var horizontalForm = AngularForms({ scope: $scope, targetId: 'horizontalForm', form: horizontal });       
        horizontalForm.inject();

        $scope.sources = [
            { id: 'google', label: 'Google' },
            { id: 'yahoo', label: 'Yahoo!' },
            { id: 'bing', label: 'Bing' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'word', label: 'A friend told me' },
            { id: 'other', label: 'Other' }
            ];

        $scope.sourceSelected = function() {
            console.log("You selected: ");
            console.log($scope.referal_source);
            }

        var cCheckboxForm = AngularForms({ scope: $scope, targetId: 'checkboxForm', form: CheckBoxForm });       
        cCheckboxForm.inject();

        //Copy the sample checkbox form, make a few changes, and render it as a horizontal form.
        var cHorizontal = angular.copy(CheckBoxForm); 
        cHorizontal['horizontal'] = true;
        cHorizontal['fields']['standard_checkbox'].ngModel = 'standard_checkbox_horizontal';
        delete cHorizontal['fields']['checkbox_group'].groupClass;
        for (var i=0; i < cHorizontal['fields']['checkbox_group']['checkboxes'].length; i++) {
            var c = cHorizontal['fields']['checkbox_group']['checkboxes'][i];
            c.model = c.model + '_horizontal';
            if (c.ngShow) {
                c.ngShow = c.ngShow + '_horizontal';
            }
        }
        var hCheckboxForm = AngularForms({ scope: $scope, targetId: 'checkboxHorizontalForm', form: cHorizontal });       
        hCheckboxForm.inject();

        var radio = AngularForms({ scope: $scope, targetId: 'radioForm', form: RadioForm });       
        radio.inject();

        //Copy the sample radio form, make a few changes, and render it as a horizontal form.
        var hRadio = angular.copy(RadioForm); 
        hRadio['horizontal'] = true;
        for (var fld in hRadio['fields']) {
            if (hRadio['fields'][fld].ngModel) {
                hRadio['fields'][fld].ngModel = hRadio['fields'][fld].ngModel + '_horizontal';
            }
            else {
                console.log('setting ngModel for ' + fld);
                hRadio['fields'][fld].ngModel = fld + '_horizontal';
            }  
        }
        delete hRadio['fields']['radio_group'].groupClass;
        var hRadioForm = AngularForms({ scope: $scope, targetId: 'radioHorizontalForm', form: hRadio });       
        hRadioForm.inject();
        
        }]);