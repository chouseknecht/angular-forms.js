/**********************************************
 * sampleApp.js
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 * The MIT License (MIT)
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

angular.module('sampleApp', ['AkaushiModule', 'SampleFormDefinition'])
    .controller('sampleController', ['$scope', 'Akaushi', 'SampleForm', 
    function($scope, Akaushi, SampleForm) {
        var form = Akaushi({ scope: $scope, targetId: 'basicForm', form: SampleForm });       
        form.inject();
        
        //Copy of our sample form, make a couple quick changes and render as a horizontal form.
        var horizontal = angular.copy(SampleForm); 
        horizontal['horizontal'] = true;
        for (var fld in horizontal.fields) {
             horizontal.fields[fld].srOnly = false;
             if (horizontal.fields[fld].helpText) {
                 horizontal.fields[fld].placeholder = horizontal.fields[fld].helpText;
                 delete horizontal.fields[fld].helpText;
             }
        }
        var horizontalForm = Akaushi({ scope: $scope, targetId: 'horizontalForm', form: horizontal });       
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

        //if (!$scope.$$phase) {
        //    $scope.$digest();
        //}
        
        }]);