/**********************************************
 * angular-forms.js
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of angular-forms.js and associated documentation files (the "Software"), to deal
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


angular.module('AngularFormsModule', [])

.factory('Empty', [ function() {
    return function(x) {
        // Utility function. Returns true if a string or numeric is empty.
        return (x == null || x == undefined || x == '') ? true : false;
    }
    }])

.factory('AngularForms', [ '$compile', 'Empty', function($compile, Empty) {
    return function(params) { return new( function() {
            
        this.init = function() {
            this.form = params.form;
            this.targetId = params.targetId; 
            this.scope = params.scope;
            this.col_size = "col-sm-10";
            }
        
        this.build = function() {
            var html = this.startForm();
            var fld, fld_html, label_html;
            if (this.form.horizontal && this.inputColSize) {
                this.col_size = this.form.inputColSize;
            }
            for (var f in this.form.fields) {
                fld = this.form.fields[f];
                fld_html = '';
                label_html = '';
                switch (fld.type) {
                    case 'text':
                    case 'password':
                    case 'email':
                    case 'number':
                    case 'spinner':
                        fld_html += this.inputField(f, fld);
                        break;
                    case 'select':
                        fld_html += this.select(f, fld);
                        break;
                    case 'checkbox':
                    case 'radio':
                        fld_html += this.indicator(f, fld);
                        break;
                    case 'checkbox_group':
                        fld_html += this.checkboxGroup(f, fld);
                        break;
                    case 'radio_group':
                        fld_html += this.radioGroup(f, fld);
                        break;
                    case 'textarea':
                        fld_html += this.textArea(f, fld);
                        break;
                }
                
                if (fld.helpText) {
                    fld_html += "<div class=\"help-text\">" + fld.helpText + "</div>";
                }
                
                fld_html += this.addValidations(f, fld);
                
                if (fld.type != 'checkbox' && fld.type != 'radio' && fld.label) {
                    label_html = this.fieldLabel(f, fld);
                }

                if (!this.form.horizontal) {
                    html += "<div class=\"";
                    switch (fld.type) {
                        case 'checkbox':
                            html += 'checkbox';
                            break;
                        case 'radio':
                            html += 'radio';
                            break;
                        default:
                            html += "form-group";
                    }
                    html += (fld['groupClass']) ? " " + fld['groupClass'] : "";
                    html += "\"";
                    html += (fld['ngHide']) ? this.attribute(fld, 'ngHide') : ""; 
                    html += (fld['ngShow']) ? this.attribute(fld, 'ngShow') : "";
                    html += ">\n";
                    html += label_html;
                    html += fld_html;
                    html += (this.form.horizontal) ? "</div>\n" : "";
                    html += "</div><!-- form-group -->\n";
                }
                else {
                    html += "<div class=\"form-group";
                    html += (fld['groupClass']) ? " " + fld['groupClass'] : "";
                    html += "\"";
                    html += (fld['ngHide']) ? this.attribute(fld, 'ngHide') : ""; 
                    html += (fld['ngShow']) ? this.attribute(fld, 'ngShow') : "";
                    html += ">\n";
                    html += label_html;
                    if (fld.type == 'checkbox') {
                        var offset = "col-sm-offset-" + (12 - parseInt(this.col_size.replace(/[a-z,A-Z,-]/g,'')));
                        html += "<div class=\"" + offset + " " + this.col_size + "\">\n";
                        html += "<div class=\"checkbox\">\n";
                    }
                    else if (fld.type == 'radio') {
                        var offset = "col-sm-offset-" + (12 - parseInt(this.col_size.replace(/[a-z,A-Z,-]/g,'')));
                        html += "<div class=\"" + offset + " " + this.col_size + "\">\n";
                        html += "<div class=\"radio\">\n";
                    }
                    else { 
                        html += "<div class=\"" + this.col_size + "\">\n";
                    }
                    html += fld_html;
                    html += (fld.type == 'checkbox' || fld.type == 'radio') ? "</div><!-- checkbox/radio -->\n" : "";
                    html += "</div>\n";
                    html += "</div><!-- form-group -->\n";
                }
            }
            //Add buttons
            if (this.form.buttons) {
                html += "<div class=\"form-group buttons\">\n";
                if (this.form.horizontal) {
                    var offset = "col-sm-offset-" + (12 - parseInt(this.col_size.replace(/[a-z,A-Z,-]/g,'')));
                    html += "<div class=\"" + offset + " " + this.col_size + "\">\n";
                }
                for (var btn in this.form.buttons) {
                    html += this.button(btn, this.form.buttons[btn]);
                }
                html += (this.form.horizontal) ? "</div>\n" : "";
                html += "</div>\n";
            }
            html += "</form>\n";
            return html;
            }

        this.inputField = function(f, fld) {
            var html = '';
            html += (fld.type == 'spinner') ? "<div>\n" : "";
            html += "<input "; 
            html += (fld.type != 'spinner') ? "type=\"" + fld.type + "\" " : "";
            html += (fld.type == 'spinner') ? "af-spinner=\"" + this.form.name + "\" "  : "";
            html += "ng-model=\"";
            html += (fld.ngModel) ? fld.ngModel : f;
            html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
            html += this.addInputClass(fld);
            for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class' && attr != 'ngHide' && attr != 'ngShow') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += ">";
            html += (fld.type == 'spinner') ? "</div>\n" : "";
            return html;
            }

        this.textArea = function(f, fld) {
            var html = '';
            html += "<textarea ng-model=\"";
            html += (fld.ngModel) ? fld.ngModel : f;
            html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
            html += this.addInputClass(fld);
            html += (!fld.rows) ? "rows=\"5\" " : "";  //default to 5 rows
            for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class' && attr != 'ngHide' && attr != 'ngShow') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += "></textarea>";
            return html;
            }

        this.select = function(f, fld) {
           var html = '';
           html += "<select ng-model=\"";
           html += (fld.ngModel) ? fld.ngModel : f;
           html += "\"";
           html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
           html += this.addInputClass(fld);
           if (typeof fld.optionArray == 'object') {
              // optionArray defined as an inline array
              this.scope[this.form.name + '_' + f + '_options'] = fld.optionArray; 
              html += "ng-options=\"itm.id as itm.label for itm in " + this.form.name + '_' + f + '_options' + "\" ";
           }
           else { 
              // optionArray is a string, the name of an existing scope variable
              html += "ng-options=\"itm.id as itm.label for itm in " + fld.optionArray + "\" ";
           }
           for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class' && attr != 'optionArray' && attr != 'placeholder'
                    && attr != 'ngHide' && attr != 'ngShow') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += ">";
            html += (fld.placeholder) ? "\n<option value=\"\">" + fld.placeholder + "</option>\n" : "";
            html += "</select>\n";
            return html;
            }

        this.indicator = function(f, fld) {
            //checkboxes and radio buttons
            var html = '';
            html += "<input type=\"" + fld.type + "\" ng-model=\"";
            html += (fld.ngModel) ? fld.ngModel : f;
            html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
            html += (fld['class']) ? "class=\"" + fld['class'] + "\" " : "";
            for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class' && attr != 'ngHide' && attr != 'ngShow') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += ">";
            if (fld.type == 'checkbox' || fld.type == 'radio') {
                html = this.labelWrap(f, fld, html);
            }
            return html;
            }

        this.checkboxGroup = function(f, fld) {
            var html = '';
            html += "<div class=\"checkbox-group\">\n";
            for (var i=0; i < fld.checkboxes.length; i++) {
                fld.checkboxes[i].type = 'checkbox';
                fld.checkboxes[i].labelClass = 'checkbox-inline';
                html += this.indicator(fld.checkboxes[i].model, fld.checkboxes[i]);
            }
            html += "</div><!-- checkbox-group -->\n";
            return html;    
            }

        this.radioGroup = function(f, fld) {
            var html = '';
            html += "<div class=\"radio-group\">\n";
            for (var i=0; i < fld.options.length; i++) {
                fld.options[i].type = 'radio';
                fld.options[i].labelClass = 'radio-inline';
                fld.options[i].ngModel = (fld.ngModel) ? fld.ngModel : f;
                html += this.indicator(f, fld.options[i]);
            }
            html += "</div><!-- radio-group -->\n";
            return html;    
            }

        this.labelWrap = function(f, fld, html) {
            // For checkboxes and readio buttons, wrap the input element with a label element
            var h = '';
            if (this.form)
            h += "<label";
            h += (fld.labelClass) ? " class=\"" + fld.labelClass + "\"" : "";
            h += (fld.ngShow) ? this.attribute(fld, 'ngShow') : "";
            h += (fld.ngHide) ? this.attribute(fld, 'ngHide') : "";
            h+= ">" + html + " " + fld.label + "</label>\n";
            return h; 
            }

        this.addValidations = function(f, fld) {
            var html = '';
            if (fld.required || fld.ngRequired) {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + 
                    ".$error.required\">" + "A value is required.</div>\n";  
            }
            if (fld.type == 'email') {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + 
                    ".$error.email\">" + "Please provide a valid email address.</div>\n";
            }
            if (fld.type == 'number') {
                html += "<div class=\"error\" ng-show=\"" + this.form.name + "." + f + 
                    ".$error.number\">" + "Please provide a numeric value.</div>\n"; 
            }
            if (fld.ngMinlength) {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + 
                    ".$error.minlength\">" + "Must contain a minimum of " + fld.ngMinlength + " characters.</div>\n";
            }
            if (fld.ngMaxlength) {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + 
                    ".$error.maxlength\">" + "Length must be less than " + fld.ngMaxlength + " characters.</div>\n";
            }
            if (fld.ngPattern) {
                var msg = (fld.patternErrorMsg) ? fld.patternErrorMsg : 'Please provide a valid value';  
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + 
                    ".$error.pattern\">" + msg + "</div>\n";
            }
            html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "_" + f + 
                "_error\" ng-bind=\"" + this.form.name + "_" + f + "_error\"></div>\n";
            return html;
            }

        this.fieldLabel = function(f, fld) {
            var html = '';
            if (this.form.horizontal) {
                var col_size = (this.labelColSize) ? this.labelColSize : "col-sm-2";
            }
            html += "<label for=\"" + f + "\"";
            if (fld.srOnly || fld.labelClass || this.form.horizontal) {
                html += " class=\"";
                html += (this.form.horizontal) ? col_size + " control-label " : "";
                html += (fld.srOnly) ? "sr-only " : "";
                html += (fld.labelClass) ? fld.labelClass : "";
                html += "\"";
            }
            html += ">" + fld.label + "</label>\n";
            return html;
            }

        this.startForm = function() {
            var html = '';
            html += "<form";
            html += " name=\"" + this.form.name + "\"";
            if (this.form.horizontal || this.form['class']) {
                html += " class=\""; 
                html += (this.form.horizontal) ? "form-horizontal" : "";
                html += (this.form['class']) ? " " + this.form['class'] : "";
                html += "\"";
            }
            html += " role=\"form\"";
            html += " novalidate >\n";
            return html;
            }
         
        this.addInputClass = function(fld) {
            var html = '';
            html += "class=\"";
            // remove the form-control directive on spinner
            html += (fld.type != 'spinner') ? "form-control" : ""; 
            html += (fld['class']) ? " " + fld['class'] : "";
            html += "\"";
            return html;
            }

        this.attribute = function(obj, itm) {
            var html = '';
            if (itm.match(/^ng/)) {
                var d = itm.replace(/^ng/,'').toLowerCase();
                html += ' ng-' + d + '="' + obj[itm] + '"';
            }
            else {
                if (itm != 'helpText' && itm != 'labelClass' && itm != 'defaultValue') {
                    switch (itm) {
                        case 'required': 
                            html += " required";
                            break;
                        case 'autocomplete':
                            html += " autocomplete=\"";
                            html += (obj.autocomplete == true || obj.autocomplete == 'on') ? "on\"" : "off\"";
                            break;
                        default: 
                            html += " " + itm + "=\"" + obj[itm] + "\" ";
                        }
                }
            }
            return html;
            }

        this.button = function(b, btn) {
            var html = "<button type=\"button\" class=\"btn";
            html += (btn['class']) ? " " + btn['class'] : " btn-default";
            html += "\"";
            for (var itm in btn) {
                if (itm != 'class' && itm != 'icon' && itm != 'label') {
                    html += this.attribute(btn, itm);
                }
            }
            if (!btn.ngDisabled && b == 'save') {
                // Disable save button when form is untouched or invalid
                html += " ng-disabled=\"" + this.form.name + ".$invalid || " + this.form.name + ".$pristine\"";
            }
            if (!btn.ngDisabled && b == 'reset') {
                // Disable reset button when for is untouched
                html += " ng-disabled=\"" + this.form.name + ".$pristine\"";
            }
            html += ">";
            html += (btn['icon']) ? "<i class=\"fa " + btn['icon'] + "\"></i> " : "";
            html += (btn['label']) ? btn['label'] : "";
            html += "</button>\n";
            return html;
            }
        
        // external methods 

        this.inject = function() {
            // Build the form and compile, inserting it into the DOM 
            var e = angular.element(document.getElementById(this.targetId));
            e.append(this.build());
            $compile(e)(this.scope);
            }

        this.clearErrors = function() {
            for (var f in this.form.fields)
                this.scope[this.form.name + '_' + f + '_error'] = '';
            }

        this.resetForm = function(master_obj) {
            // Pass an object of model:value pairs, and the form will be reset
            // to the supplied values. Usefule for editting existing data. 
            // Otherwise, form is reset to default values supplied in form object 
            // (using defaultValue) or ''. 
            var fld, model, idx, val;
            var master = (Empty(master_obj)) ? {} : master_obj;
            for (var f in this.form.fields) {
                fld = this.form.fields[f];
                model = (fld.ngModel) ? fld.ngModel : f;
                if (fld.type == 'spinner') {
                    if (!Empty(master[model])) {
                        val = master[model];
                    }
                    else if (!Empty(fld.defaultValue)) {
                        val = fld.defaultValue;
                    }
                    else {
                        val = '';
                    }
                    $('#fld_' + f).spinner('value', val);
                }
                else if (master[model]) {
                    this.scope[model] = master[model];
                }
                else if (!Empty(fld.defaultValue)) {
                    this.scope[model] = fld.defaultValue; 
                }
                else {
                    this.scope[model] = '';
                }
                // Clear validation errors
                this.scope[this.form.name][f].$setPristine();
                this.scope[this.form.name + '_' + f + '_error'] = '';
            }
            }   

        this.init();
        
        })}
    }])

// Custom directives 

.directive('afSpinner', [ function($document) {
    return {  
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            // Add jquerui spinner to 'spinner' type input
            var form = attr.afSpinner;
            $(element).spinner({
                change: function(e, ui) {
                    scope[attr.ngModel] = $(this).spinner('value');
                    },
                spin: function(e, ui) {
                    scope[form].$setDirty();
                    ctrl.$dirty = true; 
                    ctrl.$pristine = false;
                    if (!scope.$$phase) {
                        scope.$digest();
                    }
                    }
                });
            }
    }
    }]);
