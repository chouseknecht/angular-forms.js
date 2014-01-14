/*********************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  RobotForm.js
 *
 *  Demonstrate some of the things you can do with angular-forms to 
 *  generate clean, consistent forms in your app.
 *  
 */

'use strict';

angular.module('RobotFormDefinition', [])
    .value(
    'RobotForm', {
        name: 'RobotForm',                     // Required. Used to set <form> id attribute
        horizontal: false,                     // Set to true for Bootstrap horizontal form layout 
        
        fields: {
            name: {
                label: 'Name',
                type: 'text',
                required: true, 
                ngMaxlength: 20,
                helpText: 'Your robot\'s name must be unique.'  
                },
            arms: {
                label: 'Arms',
                type: 'spinner', 
                min: 1,
                max: 4, 
                helpText: 'How many arms should it have?',
                required: true,
                defaultValue: 1
                },
            legs: {
                label: 'Legs',
                type: 'spinner', 
                min: 2, 
                max: 6,
                helpText: 'How many legs should it have?',
                required: true,
                defaultValue: 2
                },
            head_size: {
                label: 'Head size',
                type: 'select',
                placeholder: 'Choose a head size',
                optionArray: [
                    {id: 'small', label: 'Small 1lb'},
                    {id: 'medium', label: 'Medium 3lb'}, 
                    {id: 'large', label: 'Large 5lb'}
                    ],
                required: true,
                defaultValue: 'large'
                },
            eyes: {
                label: 'Eyes',
                groupClass: 'robot-eyes',
                helpText: "What tech do you want in the eyes?",
                type: 'radio_group',
                defaultValue: '2d',
                options: [
                    { value: 'laser', label: 'Lasers' },
                    { value: '2d', label: '2D Cameras' },
                    { value: '3d', label: '3D Cameras' } 
                    ]
                }
            },

        buttons: {
            save: {
                label: "Place my order",
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