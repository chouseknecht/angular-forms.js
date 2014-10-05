/**********************************************
 * angular-modal.js
 *
 * Copyright (c) 2014 Chris Houseknecht
 *
 * For documentation and support visit angularforms.org
 *
 * Distributed under The MIT License (MIT)
 *
 */

'use strict';

angular.module('angularforms.modal', [])

    .factory('AngularModal', [ '$compile', function($compile) {
        return function(params) {

            var fn = function() {

                this.init = function() {
                    this.modal = params.modal;
                    this.targetId = params.targetId;
                    this.parent_scope = params.scope;
                };

                this.build = function() {
                    var attrib, b, btn, html = '';

                    // modal container
                    html += "<div id=\"" + this.modal.name + "\" af-modal ng-show=\"" + this.modal.name + "_show\" ";
                    html += this.attribute(this.modal, 'class', 'af-modal');
                    html += (this.modal.height) ? " " + "data-height=\"" + this.modal.height + "\"" : "";
                    html += (this.modal.width) ? " " + "data-width=\"" + this.modal.width + "\"" : "";
                    html += ">\n";

                    // modal header
                    html += "<div class=\"af-modal-header\">" + this.modal.title + "</div>\n";

                    // modal body
                    html += "<div " + this.attribute(this.modal.body,'class', 'af-modal-body');
                    html += (this.modal.body.ngBindHtml) ? " " + this.attribute(this.modal.body, 'ngBindHtml') : "";
                    html += ">";
                    html += (this.modal.body.text) ? this.modal.body.text : "";
                    html += "</div>\n";

                    // modal footer
                    html += "<div " + this.attribute(this.modal.footer, 'class','af-modal-footer') + ">\n";
                    //html += "<div class=\"af-modal-buttons\">\n";
                    for (btn in this.modal.buttons) {
                        b = this.modal.buttons[btn];
                        html += "<button type=\"button\"";
                        for (attrib in b) {
                            if (attrib !== 'icon' && attrib !== 'label') {
                                html += ' ' + this.attribute(b, attrib);
                            }
                        }
                        html += ">";
                        html += (b.icon) ? this.attribute(b, 'icon') : "";
                        html += (b.label) ? " " + b.label : "";
                        html += "</button>\n";
                    }
                    //html += "</div>\n";
                    html += "</div>\n";
                    html += "</div><!-- modal -->\n";
                    return html;
                };

                this.attribute = function(obj, itm, val) {
                    var d, i, attr;
                    if (/^ng/.test(itm)) {
                        d = itm.replace(/^ng/,'');
                        attr = 'ng';
                        for (i=0; i < d.length; i++) {
                            if (/[A-Z]/.test(d.charAt(i))) {
                                attr += '-' + d.charAt(i).toLowerCase();
                            }
                            else {
                                attr += d.charAt(i);
                            }
                        }
                        attr += "=\"" + obj[itm] + "\"";
                    }
                    else if (itm === 'class') {
                        attr = "class=\"";
                        attr += (val) ? val : " ";    //add internal classes
                        attr += (obj['class']) ? obj['class'] : "";  //add user classes
                        attr = attr.replace(/ $/,'');
                        attr += "\"";
                    }
                    else if (itm === 'icon') {
                        attr = "<i class=\"fa " + obj.icon + "\"></i>";
                    }
                    else if (itm === 'dismiss') {
                        attr = "ng-click=\"modalHide('" + this.modal.name + "', $event)\"";
                    }
                    else {
                        attr = " " + itm + "=\"" + obj[itm] + "\" ";
                    }
                    return attr;
                };

                this.inject = function() {
                    // Build the modal and compile, inserting it into the DOM.
                    var e = angular.element(document.getElementById(this.targetId));
                    e.empty().append(this.build());
                    $compile(e)(this.parent_scope);

                    this.parent_scope.modalHide = function(modal_id, e) {
                        var scope = angular.element(e.target).scope();
                        scope[modal_id + '_show'] = false;
                    };
                };

                this.init();
            };
            return new fn();
        };
    }])

    .directive('afModal', [ function() {
        return {
            link: function(scope, element, attr) {
                // keep width <= viewport width
                var left, top, wWidth, wHeight, width, height, headerHeight, footerHeight,
                    bodyHeight;
                wWidth = $(document).width();
                wHeight = $(window).height();
                width = attr.width;
                height = (attr.height) ? attr.height : 500;
                headerHeight = parseInt($(element).find('.af-modal-header').css('height').replace(/px/,''),10);
                footerHeight = parseInt($(element).find('.af-modal-footer').css('height').replace(/px/,''),10);
                bodyHeight = height - (headerHeight + footerHeight);
                width = (width) ? width : 500;
                width = (width > wWidth) ? wWidth : width;
                left = (wWidth > width) ? Math.floor((wWidth - width) / 2) : 0;
                top = (height < wHeight) ? Math.floor((wHeight - height) / 2) : 0;
                $(element).css({ 'top': top, 'left': left });
                $(element).find('.af-modal-body').css({ height: bodyHeight });
                $(element)
                    .width(width)
                    .draggable()
                    .resizable({
                        minWidth: width,
                        minHeight: height,
                        stop: function(e, ui) {
                            // preserve header and footer heights and adjust body height after resize
                            var height = parseInt(ui.element.css('height').replace(/px/,''),10),
                                bodyHeight = height - (headerHeight + footerHeight);
                            ui.element.find('.af-header-height').css({ height: (headerHeight + 'px') });
                            ui.element.find('.af-footer-height').css({ height: (footerHeight + 'px') });
                            ui.element.find('.af-modal-body').css({ height: (bodyHeight + 'px') });
                        }
                    });

            }
        };
    }]);


