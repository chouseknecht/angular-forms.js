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

angular.module('Akaushi', [])
    .factory('Akaushi', [ function() {
    return new (function(params) {
    
        this.init = function(params) {
            this.form = params.form; 
            this.id = params.id;
            this.html = '';
            }
    
        this.build = function() {
            this.html += this.startForm();
            for (fld in this.form.fields) {
                switch (fld.type) {
                    case 'text':
                    case 'password':
                        this.html += this.Field(fld);
                        break;
                }     
            }
            }

        this.Field = function(fld) {
            var html = '';
            html += "<input type=\"" + fld.type + "\" model=\"" + fld.model + "\" name=\"" + fld.name + "\" id=\"fld_" + fld.name +
                "\" "; 
            html += (fld.required) ? "required" : "";
            html += (fld.autocomplete) ? this.attribute(fld, autocomplete);
            }

        this.startForm = function() {
            var html = '';
            html += "<form role=\"form\" ";
            html += (this.form['class']) ? this.attribute(this.form, 'class') : "";
            html += ">\n";
            return html;
            }

        this.attribute = function(obj, itm) {
            return " " + itm + "=\"" + obj[itm] + "\" ";
            }

        this.init();
        }    
    }
    }]);
