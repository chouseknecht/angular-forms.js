/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  SampleForm.js
 *
 *  Demonstrate some of the things you can do with angular-forms to
 *  generate clean, consistent forms in your app.
 *
 */

'use strict';

angular.module('SampleFormDefinition', [])
    .value(
    'SampleForm', {
        name: 'SampleForm',                    // Required. Used to set <form> id attribute
        horizontal: false,                     // Set to true for Bootstrap horizontal form layout
        starRequired: true,

        fields: {
            first_name: {
                label: 'First Name',
                srOnly: true,
                type: 'text',
                placeholder: 'First name',
                required: true,
                autocomplete: false,
                helpText: 'Provide your first name.'
            },
            last_name: {
                label: 'Last Name',
                type: 'text',
                srOnly: true,
                placeholder: 'Last name',
                required: true,
                autocomplete: false,
                helpText: 'Provide your last name.'
            },
            email_address: {
                label: 'Email',
                type: 'email',
                srOnly: true,
                placeholder: 'Email address',
                required: true,
                autocomplete: false,
                helpText: 'Your primary email address.'
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
            },
            employees: {
                label: 'Employee count',
                srOnly: true,
                placeholder: 'Number of employees',
                type: 'number',
                helpText: 'How many employees do you have?',
                required: true,
                ngMinimum: 0,
                ngMaximum: 200
            },
            referral_source: {
                label: 'Referral source',
                srOnly: true,
                placeholder: 'Select a referral source',
                type: 'select',
                required: true,
                helpText: 'How did you hear about us?',
                optionArray: 'sources'
            },
            other_source: {
                label: 'Other',
                srOnly: true,
                placeholder: 'Other source',
                type: 'text',
                ngShow: "referral_source == 'other'",
                required: true,
                helpText: 'What is the Other source?'
            },
            about_you: {
                label: 'About you',
                srOnly: true,
                placeholder:'About you',
                type: 'textarea',
                helpText: 'Tell us a bit about yourself'
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
                icon: "fa-rotate-left",
                ngClick: "reset()",
                'class': 'btn-default btn-sm'
            }
        }
    });
