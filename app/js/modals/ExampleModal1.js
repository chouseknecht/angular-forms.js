/********************************************************
 *  Copyright (c) 2013-2014 Chris Houseknecht
 *
 *  ExampleModal1.js
 *
 *  Demonstrate generating and injecting a modal dialog
 *  
 */

'use strict';

angular.module('ExampleModal1Definition', [])
    .value('ExampleModal1', {
        name: 'example_modal_1',              // Required. Used to set id/name attributes
        width: 400,                             
        height: 150,
        title: "{{ exampleModal1Header }}",   //provide data bind expression or text
        'class': '',
        
        body: {
            text: '',                         //supply text
            ngBindHtml: "exampleModal1HTML",  //or bind in HTML
            'class': '' 
            },
        
        footer: {
            'class': ''
            },
        
        buttons: {
            say_hello: {
                label: "{{ sayHelloLabel }}",
                icon: "{{ sayHelloIcon }}",
                'class': "btn btn-primary",
                ngClick: "sayHello()"
            },
            close: {
                label: "Close",
                icon: "fa fa-times",
                'class': 'btn btn-default',
                dismiss: true
            }
        }
    });