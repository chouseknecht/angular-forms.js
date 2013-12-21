/**********************************************
 * Akaushi.js
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

angular.module('AkaushiModule', [])

.factory('Akaushi', [ '$compile', function($compile) {
    return function(params) { return new( function() {
            
        this.init = function() {
            this.form = params.form;
            this.targetId = params.targetId; 
            this.scope = params.scope;
            }
        
        this.build = function() {
            var html = this.startForm();
            var fld, fld_html, label_html;
            if (this.form.type == 'horizontal') {
                var col_size = (this.inputColSize) ? this.inputColSize : "col-sm-10";
            }
            for (var f in this.form.fields) {
                fld = this.form.fields[f];
                fld_html = '';
                label_html = '';
                switch (fld.type) {
                    case 'text':
                    case 'password':
                        fld_html += this.inputField(f, fld);
                        break;
                }
                if (fld.helpText) {
                    fld_html += "<div class=\"help-text\">" + fld.helpText + "</div>";
                }
                if (fld.label) {
                    label_html = this.fieldLabel(f, fld);
                }
                html += "<div class=\"form-group\">\n";
                html += label_html; 
                html += (this.form.type == 'horizontal') ? "<div class=\"" + col_size + "\">\n" : "";
                html += fld_html;
                html += (this.form.type == 'horizontal') ? "</div>\n" : "";
                html += "</div><!-- form-group -->\n";
            }
            html += "</form>\n";
            console.log(html);
            return html;
            }

        this.inputField = function(f, fld) {
            var html = '';
            html += "<input type=\"" + fld.type + "\" model=\"" + f + "\" name=\"" + f + "\" id=\"fld_" + f +
                "\" ";
            html += this.addInputClass(fld);
            for (var attr in fld) {
                if (attr != 'label' && attr != 'type' && attr != 'srOnly'  && attr != 'class') {
                    html += this.attribute(fld, attr); 
                }
            }
            html += ">";
            return html;
            }

        this.fieldLabel = function(f, fld) {
            var html = '';
            if (this.form.type == 'horizontal') {
                var col_size = (this.labelColSize) ? this.labelColSize : "col-sm-2";
            }
            html += "<label for=\"" + f + "\"";
            if (fld.srOnly || fld.labelClass || this.form.type == 'horizontal') {
                html += " class=\"";
                html += (this.form.type == 'horizontal') ? col_size + " control-label " : "";
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
            if (this.form.type == 'horizontal' || this.form['class']) {
                html += " class=\""; 
                html += (this.form.type == 'horizontal') ? "horizontal" : "";
                html += (this.form['class']) ? " " + this.form['class'] : "";
                html += "\"";
            }
            html += " role=\"form\"";
            html += ">\n";
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
