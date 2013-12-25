/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  CheckBoxForm.js
 *
 *  Demonstrate using checkboxes and checkbox groups
 *  
 */

'use strict';

angular.module('CheckBoxFormDefinition', [])
    .value(
    'CheckBoxForm', {
        name: 'checkbox_form',           // Required. Used to set <form> id attribute
        
        fields: {
            sound_on: {
                label: 'Inline checkbox',
                helpText: 'Example of an inline checkbox', 
                type: 'checkbox',
                inline: true
                },
            not_inline: {
                label: 'Regular checkbox',
                helpText: 'Example of a regular checkbox',
                type: 'checkbox',
                }
            },

        buttons: {
            save: {
                label: "Save",
                icon: "fa-check",
                ngClick: "save()",
                'class': 'btn-primary btn-sm'
                },
            reset: {
                label: "Reset",
                icon: "fa-minus-circle",
                ngClick: "reset()",
                'class': 'btn-default btn-sm'
                }
            },
    });