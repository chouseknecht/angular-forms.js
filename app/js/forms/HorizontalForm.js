/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  HorizontalForm.js
 *
 *  Demonstrate generating a horizontal form with akaushi.
 *  
 */

'use strict';

angular.module('HorizontalFormDefinition', [])
    .value(
    'HorizontalForm', {
        name: 'HorizontalForm',                // Required. Used to set <form> id attribute
        horizontal: true,                      // Set to true for Bootstrap horizontal form layout 
        
        fields: {
            first_name: {
                label: 'First Name',
                type: 'text',
                placeholder: 'Provide your first name',
                required: true,
                autocomplete: false},
            last_name: {
                label: 'Last Name',
                type: 'text',
                placeholder: 'Provide your last name',
                required: true, 
                autocomplete: false},
            username: {
                label: 'Username',
                placeholder: 'Choose the name you will be known as',
                type: 'text', 
                length: 30,
                required: true,
                autocomplete: false
                },
            password: {
                label: 'Password',
                placeholder: 'Create a password. Make it strong!',
                type: 'password', 
                length: 16, 
                autocomplete: false,
                confirm: true      //generate a confirmation password field. associate the two and add validation directive 
                }
            },

        buttons: {
            save: {
                label: "Save",
                icon: "fa-check",
                ngClick: "horizontalSave()",
                'class': 'btn-primary btn-sm'
                },
            reset: {
                label: "Reset",
                icon: "fa-minus-circle",
                ngClick: "horizontalReset()",
                'class': 'btn-default btn-sm'
                }
            }
        });