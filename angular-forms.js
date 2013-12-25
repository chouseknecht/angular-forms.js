/**********************************************
 * angular-forms.js
 *
 * Copyright (c) 2013-2014 Chris Houseknecht
 *
 * Distributed under The MIT License (MIT)
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

.factory('AngularForms', [ '$compile', function($compile) {
    return function(params) { return new( function() {
            
        this.init = function() {
            this.form = params.form;
            this.targetId = params.targetId; 
            this.scope = params.scope;
            }
        
        this.build = function() {
            var html = this.startForm();
            var fld, fld_html, label_html;
            if (this.form.horizontal) {
                var col_size = (this.inputColSize) ? this.inputColSize : "col-sm-10";
            }
            for (var f in this.form.fields) {
                fld = this.form.fields[f];
                fld_html = '';
                label_html = '';
                switch (fld.type) {
                    case 'text':
                    case 'password':
                    case 'email':
                        fld_html += this.inputField(f, fld);
                        break;
                    case 'select':
                        fld_html += this.select(f, fld);
                        break;
                }
                
                if (fld.helpText) {
                    fld_html += "<div class=\"help-text\">" + fld.helpText + "</div>";
                }
                
                fld_html += this.addValidations(f, fld);

                if (fld.label) {
                    label_html = this.fieldLabel(f, fld);
                }
                
                html += "<div class=\"form-group\""; 
                html += (fld['ngHide']) ? this.attribute(fld, 'ngHide') : ""; 
                html += (fld['ngShow']) ? this.attribute(fld, 'ngShow') : ""; 
                html += ">\n";
                html += label_html; 
                html += (this.form.horizontal) ? "<div class=\"" + col_size + "\">\n" : "";
                html += fld_html;
                html += (this.form.horizontal) ? "</div>\n" : "";
                html += "</div><!-- form-group -->\n";
            }
            //Add buttons
            if (this.form.buttons) {
                html += "<div class=\"form-group buttons\">\n";
                if (this.form.horizontal) {
                    var offset = "col-sm-offset-" + (12 - parseInt(col_size.replace(/[a-z,A-Z,-]/g,'')));
                    html += "<div class=\"" + offset + " " + col_size + "\">\n";
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
            html += "<input type=\"" + fld.type + "\" ng-model=\"";
            html += (fld.ngModel) ? fld.ngModel : f;
            html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
            html += this.addInputClass(fld);
            for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class' && attr != 'ngHide' && attr != 'ngShow') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += ">";
            return html;
            }

        this.select = function(f, fld) {
           var html = '';
           html += "<select ng-model=\"";
           html += (fld.ngModel) ? fld.ngModel : f;
           html += "\"";
           html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
           html += this.addInputClass(fld);
           html += "ng-options=\"itm.id as itm.label for itm in " + fld.optionArray + "\" ";
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

        this.addValidations = function(f, fld) {
            var html = '';
            if (fld.required || fld.ngRequired) {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + ".$error.required\">" +
                    "A value is required.</div>\n"  
            }
            if (fld.type == 'email') {
                html += "<div class=\"error\" ng-show=\"!" + this.form.name + "." + f + ".$pristine && " + this.form.name + "." + f + ".$error.email\">" +
                    "Please provide a valid email address.</div>\n" 
            }
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
            html += "class=\"form-control"; 
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
                if (itm !== 'helpText') {
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
                    this.attribute(btn, itm);
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

        this.inject = function() { 
            var e = angular.element(document.getElementById(this.targetId));
            e.append(this.build());
            $compile(e)(this.scope);
            }

        this.init();
        
        })}
    }]);
