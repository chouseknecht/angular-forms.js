/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  SampleForm.js
 *
 *  Demonstrate some of the things you can do with akaushi to 
 *  generate clean, consistent forms in your app.
 *  
 */

'use strict';

angular.module('SampleFormDefinition', [])
    .value(
    'SampleForm', {
        name: 'SampleForm',                    // Required. Used to set <form> id attribute
        horizontal: false,                     // Set to true for Bootstrap horizontal form layout 
        
        fields: {
            first_name: {
                label: 'First Name',
                srOnly: true,
                type: 'text',
                placeholder: 'First name',
                required: true,
                autocomplete: false,
                helpText: 'Provide your first name'
                },
            last_name: {
                label: 'Last Name',
                type: 'text',
                srOnly: true,
                placeholder: 'Last name',
                required: true, 
                autocomplete: false,
                helpText: 'Provide your last name'
                },
            username: {
                label: 'Username',
                srOnly: true,
                placeholder: 'Username',
                type: 'text', 
                length: 30,
                required: true,
                autocomplete: false,
                helpText: 'Choose the name you will be known as.'
                },
            password: {
                label: 'Password',
                srOnly: true,
                placeholder: 'Password',
                helpText: 'Create a password. Make it strong!',
                type: 'password', 
                length: 16, 
                autocomplete: false,
                required: true,
                confirm: true      //generate a confirmation password field. associate the two and add validation directive 
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
            }
        });