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
            standard_checkbox: {
                label: 'Checkbox',
                helpText: 'This is a standard checkbox',
                type: 'checkbox'
                },
            checkbox_group: {
                label: 'Options',
                groupClass: 'options-group',
                helpText: "Put related checkboxes inline together using the \'checkbox_group\' type. Click Option 1 to see additional options.",
                type: 'checkbox_group',
                checkboxes: [
                    { model: "option1", label: "Option 1" },
                    { model: "option2", label: "Option 2" }, 
                    { model: "option3", label: "Option 3", ngShow: "option1" },
                    { model: "option4", label: "Option 4", ngShow: "option1" }
                    ]
                }
            }

    });