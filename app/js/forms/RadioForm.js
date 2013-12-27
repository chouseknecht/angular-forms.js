/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  RadioForm.js
 *
 *  Demonstrate using radio buttons and radio button groups
 *  
 */

'use strict';

angular.module('RadioFormDefinition', [])
    .value(
    'RadioForm', {
        name: 'radio_form',           // Required. Used to set <form> id attribute
        
        fields: {
            radio1: {
                label: 'This is radio button option 1',
                type: 'radio',
                ngModel: 'radio_one',
                value: 'one'
                },
            radio2: {
                label: 'This is radio button option 2',
                type: 'radio',
                ngModel: 'radio_one',
                value: 'two'
                },
            radio_group: {
                label: 'Radio Group',
                groupClass: 'radio-options-group',
                helpText: "Show radios in an inline group using the \'radio_group\' type.",
                type: 'radio_group',
                options: [
                    { label: 'Radio option 1', value: 'one' },
                    { label: 'Radio option 2', value: 'two' },
                    { label: 'Radio option 3', value: 'three' } 
                    ]
                }
            }
    });