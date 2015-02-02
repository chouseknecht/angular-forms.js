/**********************************************
 * angular-forms.js
 *
 * v.3.0.0 (beta)
 *
 * 1-31-2015
 *
 * Copyright (c) 2015 Chris Houseknecht
 *
 * For documentation and help visit angularforms.org
 *
 * Distributed under The MIT License (MIT)
 *
 */

(function() {

    'use strict';

    var module = angular.module('angularForms', []);

    module.directive('angularForms', ['$compile', '$log', '$parse', _directive]);

    function _directive($compile, $log, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                return _link(scope, element, attrs, $compile, $log, $parse);
            }
        };
    }

    var btn,
        col_size = "10",
        form,
        formCss,
        f,
        fld,
        fld_html,
        html,
        label_html,
        offset,
        parentScope;

    var defaultCss = {
        help: 'help-text',
        error: 'error'
    };

    function _link(scope, element, attrs, $compile, $log, $parse) {
        var removeWatch = scope.$watch(
            // wait for the form to become available in the parent scope
            function() {
                var nm = (scope[attrs.formDefinition]) ? scope[attrs.formDefinition].name : undefined;
                if (attrs.formDelay) {
                    var fn = $parse(attrs.formDelay);
                    if (nm && fn(scope)) {
                        console.log('got formdelay: ' + fn(scope));
                        return nm;
                    }
                    return undefined;
                }
                return nm;
            },
            function(newVal, oldVal) {
                if (newVal) {
                    form = scope[attrs.formDefinition];
                    if (attrs.formCss && scope[attrs.formCss]) {
                        formCss = scope[attrs.formCss];
                        // copy defaults for undefined classes
                        for (var key in defaultCss) {
                            if (!formCss[key]) {
                                formCss[key] = defaultCss[key];
                            }
                        }
                    } else {
                        formCss = defaultCss;
                    }
                    parentScope = scope;
                    html = _buildTemplate();
                    element.html(html);
                    var f = element.find('form');
                    $compile(f)(scope);
                    if (attrs.angularForms) {
                        scope[attrs.angularForms] = new Form();
                    }
                    scope.$emit('FormReady', form.name);
                    removeWatch();
                }
            }
        );
    }

    function _buildTemplate() {
        var html = _startForm();

        if (form.horizontal && form.inputColSize) {
            col_size = parseInt(form.inputColSize,10);
        }

        for (f in form.fields) {
            fld = form.fields[f];
            fld_html = '';
            label_html = '';
            switch (fld.type) {
                case 'text':
                case 'password':
                case 'email':
                case 'number':
                case 'spinner':
                    fld_html += _inputField(f, fld);
                    break;
                case 'select':
                    fld_html += _select(f, fld);
                    break;
                case 'checkbox':
                case 'radio':
                    fld_html += _indicator(f, fld);
                    break;
                case 'checkbox_group':
                    fld_html += _checkboxGroup(f, fld);
                    break;
                case 'radio_group':
                    fld_html += _radioGroup(f, fld);
                    break;
                case 'textarea':
                    fld_html += _textArea(f, fld);
                    break;
                case 'custom':
                    fld_html += _customField(f, fld);
            }

            if (fld.helpText) {
                fld_html += "<div class=\"";
                fld_html += formCss.help;
                fld_html += "\">" + fld.helpText + "</div>";
            }

            fld_html += _addValidations(f, fld);

            if (fld.type !== 'checkbox' && fld.type !== 'radio' && fld.label) {
                label_html = _fieldLabel(f, fld);
            }

            if (!form.horizontal) {
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
                html += (fld.groupClass) ? " " + fld.groupClass : "";
                html += "\"";
                html += (fld.ngHide) ? _attribute(fld, 'ngHide') : "";
                html += (fld.ngShow) ? _attribute(fld, 'ngShow') : "";
                html += ">\n";
                html += label_html;
                html += fld_html;
                html += (form.horizontal) ? "</div>\n" : "";
                html += "</div><!-- form-group -->\n";
            }
            else {
                html += "<div class=\"form-group";
                html += (fld.groupClass) ? " " + fld.groupClass : "";
                html += "\"";
                html += (fld.ngHide) ? _attribute(fld, 'ngHide') : "";
                html += (fld.ngShow) ? _attribute(fld, 'ngShow') : "";
                html += ">\n";
                html += label_html;
                if (fld.type === 'checkbox') {
                    offset = "col-sm-offset-" + (12 - col_size);
                    html += "<div class=\"" + offset + " " + col_size + "\">\n";
                    html += "<div class=\"checkbox\">\n";
                }
                else if (fld.type === 'radio') {
                    offset = "col-sm-offset-" + (12 - col_size);
                    html += "<div class=\"" + offset + " " + col_size + "\">\n";
                    html += "<div class=\"radio\">\n";
                }
                else {
                    html += "<div class=\"col-sm-" + col_size + "\">\n";
                }
                html += fld_html;
                html += (fld.type === 'checkbox' || fld.type === 'radio') ? "</div><!-- checkbox/radio -->\n" : "";
                html += "</div>\n";
                html += "</div><!-- form-group -->\n";
            }
        }
        //Add buttons
        if (form.buttons) {
            html += "<div class=\"form-group buttons\">\n";
            if (form.horizontal) {
                offset = "col-sm-offset-" + (12 - col_size);
                html += "<div class=\"" + offset + " col-sm-" + col_size + "\">\n";
            }
            for (btn in form.buttons) {
                html += _button(btn, form.buttons[btn]);
            }
            html += (form.horizontal) ? "</div>\n" : "";
            html += "</div>\n";
        }
        html += "</form>\n";
        return html;
    }

    function _placeholderStar(fld) {
        // Should the placeholder have a leading *
        if (form.starRequired && fld.required) {
            if (fld.label && !fld.srOnly) {
                return '';
            }
            return '* ';
        }
        return '';
    }

    function _inputField (f, fld) {
        var attr, html = '';
        html += (fld.type === 'spinner') ? "<div>\n" : "";
        html += "<input ";
        html += (fld.type !== 'spinner') ? "type=\"" + fld.type + "\" " : "";
        html += (fld.type === 'spinner') ? "af-spinner=\"" + form.name + "\" "  : "";
        html += "ng-model=\"";
        if (form.modelObject) {
            html += (fld.ngModel) ? form.modelObject + '.' + fld.ngModel : form.modelObject + '.' + f;
        } else {
            html += (fld.ngModel) ? fld.ngModel : f;
        }
        html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
        html += _addInputClass(fld);
        html += (fld.ngShow) ? _attribute(fld,'afOnShow') : "";
        html += (fld.ngHide) ? _attribute(fld,'afOnHide') : "";
        if (fld.placeholder) {
            html += " placeholder=\"";
            html += _placeholderStar(fld);
            html += fld.placeholder + "\"";
        }
        for (attr in fld) {
            if (attr !== 'label' && attr !== 'type' && attr !== 'srOnly'  && attr !== 'class' && attr !== 'ngHide' &&
                attr !== 'ngShow' && attr !== 'placeholder') {
                html += _attribute(fld, attr);
            }
        }
        html += ">";
        html += (fld.type === 'spinner') ? "</div>\n" : "";
        return html;
    }

    function _textArea(f, fld) {
        var attr, html = '';
        html += "<textarea ng-model=\"";
        if (form.modelObject) {
            html += (fld.ngModel) ? form.modelObject + '.' + fld.ngModel : form.modelObject + '.' + f;
        } else {
            html += (fld.ngModel) ? fld.ngModel : f;
        }
        html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
        html += _addInputClass(fld);
        html += (!fld.rows) ? "rows=\"5\" " : "";  //default to 5 rows
        html += (fld.ngShow) ? _attribute(fld, 'afOnShow') : "";
        html += (fld.ngHide) ? _attribute(fld, 'afOnHide') : "";
        for (attr in fld) {
            if (attr !== 'label' && attr !== 'type' && attr !== 'srOnly'  && attr !== 'class' &&
                attr !== 'ngHide' && attr !== 'ngShow') {
                html += _attribute(fld, attr);
            }
        }
        html += "></textarea>";
        return html;
    }

    function _customField(f, fld) {
        // custom field supports label and html property for now.
        return fld.html;
    }

    function _select(f, fld) {
        var attr, html = '';
        html += "<select ng-model=\"";
        if (form.modelObject) {
            html += (fld.ngModel) ? form.modelObject + '.' + fld.ngModel : form.modelObject + '.' + f;
        } else {
            html += (fld.ngModel) ? fld.ngModel : f;
        }
        html += "\"";
        html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
        html += _addInputClass(fld);
        if (fld.optionArray) {
            if (typeof fld.optionArray === 'object') {
                // optionArray defined as an inline array
                parentScope[form.name + '_' + f + '_options'] = fld.optionArray;
                html += "ng-options=\"itm.id as itm.label for itm in " + form.name + '_' + f + '_options' + "\" ";
            }
            else {
                // optionArray is a string, the name of an existing scope variable
                html += "ng-options=\"itm.id as itm.label for itm in " + fld.optionArray + "\" ";
            }
        }
        for (attr in fld) {
            if (attr !== 'label' && attr !== 'type' && attr !== 'srOnly'  && attr !== 'class' && attr !== 'optionArray' &&
                attr !== 'placeholder' && attr !== 'ngHide' && attr !== 'ngShow') {
                html += _attribute(fld, attr);
            }
        }
        html += (fld.ngShow) ? _attribute(fld, 'afOnShow') : "";
        html += (fld.ngHide) ? _attribute(fld, 'afOnHide') : "";
        html += ">";
        html += (fld.placeholder) ? "\n<option value=\"\">" + fld.placeholder + "</option>\n" : "";
        html += "</select>\n";
        return html;
    }

    function _indicator(f, fld) {
        //checkboxes and radio buttons
        var attr, html = '';
        html += "<input type=\"" + fld.type + "\" ng-model=\"";
        if (form.modelObject) {
            html += (fld.ngModel) ? form.modelObject + '.' + fld.ngModel : form.modelObject + '.' + f;
        } else {
            html += (fld.ngModel) ? fld.ngModel : f;
        }
        html += "\" name=\"" + f + "\" id=\"fld_" + f + "\" ";
        html += (fld['class']) ? "class=\"" + fld['class'] + "\" " : "";
        for (attr in fld) {
            if (attr !== 'label' && attr !== 'type' && attr !== 'srOnly'  && attr !== 'class' && attr !== 'ngHide' &&
                attr !== 'ngShow') {
                html += _attribute(fld, attr);
            }
        }
        html += ">";
        if (fld.type === 'checkbox' || fld.type === 'radio') {
            html = _labelWrap(f, fld, html);
        }
        return html;
    }

    function _checkboxGroup(f, fld) {
        var i, html = '';
        html += "<div class=\"checkbox-group\">\n";
        for (i=0; i < fld.checkboxes.length; i++) {
            fld.checkboxes[i].type = 'checkbox';
            fld.checkboxes[i].labelClass = 'checkbox-inline';
            html += _indicator(fld.checkboxes[i].model, fld.checkboxes[i]);
        }
        html += "</div><!-- checkbox-group -->\n";
        return html;
    }

    function _radioGroup(f, fld) {
        var i, html = '';
        html += "<div class=\"radio-group\">\n";
        for (i=0; i < fld.options.length; i++) {
            fld.options[i].type = 'radio';
            fld.options[i].labelClass = 'radio-inline';
            html += _indicator(f, fld.options[i]);
        }
        html += "</div><!-- radio-group -->\n";
        return html;
    }

    function _labelWrap(f, fld, html) {
        // For checkboxes and readio buttons, wrap the input element with a label element
        var h = '';
        h += "<label ";
        if (fld.labelClass) {
            h += "class=\"" + fld.labelClass + "\" ";
        }
        h += (fld.ngShow) ? _attribute(fld, 'ngShow') : "";
        h += (fld.ngHide) ? _attribute(fld, 'ngHide') : "";
        h+= ">" + html + " " + fld.label + "</label>\n";
        return h;
    }

    function _addValidations(f, fld) {
        var msg, html = '<div class="field-error-group">\n';
        if (fld.required || fld.ngRequired) {
            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"!" + form.name + "." + f + ".$pristine && " +
                form.name + "." + f + ".$error.required\">" + "A value is required.</div>\n";
        }
        if (fld.type === 'email') {
            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"!" + form.name + "." + f + ".$pristine && " +
                form.name + "." + f + ".$error.email\">" + "Please provide a valid email address.</div>\n";
        }
        if (fld.type === 'number') {
            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"" + form.name + "." + f +
                ".$error.number\">" + "Please provide a numeric value.</div>\n";
        }
        if (fld.ngMinlength) {
            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"!" + form.name + "." + f +
                ".$pristine && " + form.name + "." + f +
                ".$error.minlength\">" + "Must contain a minimum of " + fld.ngMinlength + " characters.</div>\n";
        }
        if (fld.ngMaxlength) {
            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"!" + form.name + "." + f + ".$pristine && " +
                form.name + "." + f + ".$error.maxlength\">" + "Length must be less than " +
                fld.ngMaxlength + " characters.</div>\n";
        }
        if (fld.ngPattern) {
            msg = (fld.patternErrorMsg) ? fld.patternErrorMsg : 'Please provide a valid value';

            html += "<div class=\"";
            html += formCss.error;
            html += "\" ng-show=\"!" + form.name + "." + f + ".$pristine && " +
                form.name + "." + f + ".$error.pattern\">" + msg + "</div>\n";
        }
        html += "<div class=\"";
        html += formCss.error;
        html += "\" ng-show=\"!" + form.name + "." + f + ".$pristine && " + form.name + "_" + f +
            "_error\" ng-bind=\"" + form.name + "_" + f + "_error\"></div>\n";
        html += '</div>';
        return html;
    };

    function _fieldLabel(f, fld) {
        var label_size, html = '';
        if (form.horizontal) {
            label_size = "col-sm-" + (12 - col_size);
        }
        html += "<label for=\"" + f + "\"";
        if (fld.srOnly || fld.labelClass || form.horizontal) {
            html += " class=\"";
            html += (form.horizontal) ? label_size + " control-label " : "";
            html += (fld.srOnly) ? "sr-only " : "";
            html += (fld.labelClass) ? fld.labelClass : "";
            html += "\"";
        }
        html += ">";
        if (form.starRequired && fld.required && !fld.srOnly) {
            html += "* ";
        }
        html += fld.label + "</label>\n";
        return html;
    }

    function _startForm() {
        var html = '';
        html += "<form";
        html += " name=\"" + form.name + "\"";
        if (form.horizontal || form['class']) {
            html += " class=\"";
            html += (form.horizontal) ? "form-horizontal" : "";
            html += (form['class']) ? " " + form['class'] : "";
            html += "\"";
        }
        html += " role=\"form\"";
        html += " novalidate >\n";
        return html;
    }

    function _addInputClass (fld) {
        var html = '';
        html += "class=\"";
        // remove the form-control directive on spinner
        html += (fld.type !== 'spinner') ? "form-control" : "";
        html += (fld['class']) ? " " + fld['class'] : "";
        html += "\"";
        return html;
    }

    function _attribute(obj, itm) {
        var d, html = '';
        if (itm.match(/^ng/)) {
            d = itm.replace(/^ng/, '').toLowerCase();
            html += ' ng-' + d + '="' + obj[itm] + '"';
        } else if (itm === 'afOnHide') {
            html += ' af-on-hide="' + obj.ngHide + '"';
        } else if (itm === 'afOnShow') {
            html += ' af-on-show="' + obj.ngShow + '"';
        } else {
            if (itm !== 'helpText' && itm !== 'labelClass' && itm !== 'defaultValue') {
                switch (itm) {
                case 'required':
                    html += " required";
                    break;
                case 'autocomplete':
                    html += " autocomplete=\"";
                    html += (obj.autocomplete === true || obj.autocomplete === 'on') ? "on\"" : "off\"";
                    break;
                default:
                    if (obj[itm]) {
                        html += " " + itm + "=\"" + obj[itm] + "\" ";
                    } else {
                        // allow undefined directives
                        html += " " + itm + " ";
                    }
                }
            }
        }
        return html;
    }

    function _button(b, btn) {
        var itm, html = "<button type=\"button\" class=\"btn";
        html += (btn['class']) ? " " + btn['class'] : " btn-default";
        html += "\"";
        for (itm in btn) {
            if (itm !== 'class' && itm !== 'icon' && itm !== 'label') {
                html += _attribute(btn, itm);
            }
        }
        if (!btn.ngDisabled && b === 'save') {
            // Disable save button when form is untouched or invalid
            html += " ng-disabled=\"" + form.name + ".$invalid || " + form.name + ".$pristine\"";
        }
        if (!btn.ngDisabled && b === 'reset') {
            // Disable reset button when for is untouched
            html += " ng-disabled=\"" + form.name + ".$pristine\"";
        }
        html += ">";
        html += (btn.icon) ? "<i class=\"fa " + btn.icon + "\"></i> " : "";
        html += (btn.label) ? btn.label : "";
        html += "</button>\n";
        return html;
    }


    function Form() {
        this.setError = function(f, msg) {
            // Custom validation- set field to invalid state and show the error msg.
            // Note - the following triggers field state changes without setting the form
            // to an invalid state. If the form becomes invalid, the Save button becomes
            // disabled, and the user is forced to reset the form.
            parentScope[form.name + '_' + f + '_error'] = msg;
            if (parentScope[form.name][f]) {
                parentScope[form.name][f].$pristine = false;
                parentScope[form.name][f].$dirty = true;
            }
            $('#fld_' + f).removeClass('ng-pristine').removeClass('ng-valid').removeClass('ng-valid-custom-error')
                .addClass('ng-dirty').addClass('ng-invalid').addClass('ng-invalid-custom-error');
        };

        this.clearError = function(f) {
            // Custom validation - remove a custom error message from a single field
            parentscope[form.name + '_' + f + '_error'] = null;
            $('#fld_' + f).addClass('ng-valid').addClass('ng-valid-custom-error')
                .removeClass('ng-invalid').removeClass('ng-invalid-custom-error');
        };

        this.clearErrors = function() {
            // Call as first step in form save to clear custom error messages and classess
            for (var f in form.fields) {
                parentScope[form.name + '_' + f + '_error'] = '';
                if (parentScope[form.name][f]) {
                    parentScope[form.name][f].$setValidity('custom-error', true);  //fixes classes for us
                    parentScope[form.name][f].$setPristine();
                }
            }
        };

        this.resetForm = function(master_obj) {
            // Pass an object of model:value pairs, and the form will be reset
            // to the supplied values. Usefull for editting existing data.
            // Otherwise, form is reset to default values supplied in form object
            // (using defaultValue) or ''.
            var f, fld, master, model, val;
            master = (master_obj === undefined) ? {} : master_obj;
            for (f in form.fields) {
                fld = form.fields[f];
                model = (fld.ngModel) ? fld.ngModel : f;
                if (fld.type === 'spinner') {
                    if (master[model]) {
                        val = master[model];
                    }
                    else if (fld.defaultValue) {
                        val = fld.defaultValue;
                    } else {
                        val = '';
                    }
                    $('#fld_' + f).spinner('value', val);
                }
                else if (master[model]) {
                    if (form.modelObject) {
                        parentScope[form.modelObject][model] = master[model];
                    } else {
                        parentScope[model] = master[model];
                    }
                }
                else if (!fld.defaultValue) {
                    if (form.modelObject) {
                        parentScope[form.modelObject][model] = fld.defaultValue;
                    } else {
                        parentScope[model] = fld.defaultValue;
                    }
                } else {
                    if (form.modelObject) {
                        parentScope[form.modelObject][model] = '';
                    } else {
                        parentScope[model] = '';
                    }
                }
                // Clear validation errors
                if (parentScope[form.name][f]) {
                    parentScope[form.name][f].$setPristine();
                    parentScope[form.name][f].$setValidity('custom-error', true);
                }
                parentScope[form.name + '_' + f + '_error'] = '';
            }
        };
    }


    // Custom directives

    /*
     * Add jqueryui spinner to 'spinner' type input
     *
     */
    module.directive('afSpinner', [ function() {

        return {
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {

                var form = attr.afSpinner;
                $(element).spinner({
                    change: function() {
                        scope[attr.ngModel] = $(this).spinner('value');
                    },
                    spin: function() {
                        scope[form].$setDirty();
                        ctrl.$dirty = true;
                        ctrl.$pristine = false;
                        if (!scope.$$phase) {
                            scope.$digest();
                        }
                    }
                });
                $(element).on('click', function() {
                    $(this).select();
                });
            }
        };
    }]);

    /*
     * When fields are hidden or shown, they need to be added/removed from the form controller.
     * Otherwise, form validation gets honked.
     *
     * Inspiration came from this: http://plnkr.co/edit/Ota7pM0iznUmjvWO8zAW?p=preview
     */
    module.directive('afOnShow', function () {
        return {
            require: '^form',
            restrict: 'A',
            link: function (scope, element, attrs, form) {
                var control;

                // add a watch to the ngShow attribute, assuming ngShow is a scope variable
                scope.$watch(attrs.afOnShow, function(value) {
                    if (!control) {
                        control = form[element.attr("name")];
                    }
                    if (value === true) {
                        form.$addControl(control);
                        angular.forEach(control.$error, function(validity, validationToken) {
                            form.$setValidity(validationToken, !validity, control);
                        });
                    } else {
                        form.$removeControl(control);
                    }
                });
            }
        };
    });

    /*
     * And handle ngHide...
     *
     */
    module.directive('afOnHide', function () {
        return {
            require: '^form',
            restrict: 'A',
            link: function (scope, element, attrs, form) {
                var control;

                // add a watch to the ngHide attribute, assuming it contains a scope variable
                scope.$watch(attrs.afOnHide, function (value) {
                    if (!control) {
                        control = form[element.attr("name")];
                    }
                    if (!value) {
                        form.$addControl(control);
                        angular.forEach(control.$error, function (validity, validationToken) {
                            form.$setValidity(validationToken, !validity, control);
                        });
                    } else {
                        form.$removeControl(control);
                    }
                });
            }
        };
    });

})();
