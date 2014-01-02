angular-forms
=============

Turn forms into reusable JSON objects. With angular-forms.js concentrate on building your app and not all the details of creating and validating forms. Let angular-forms.js generate the HTML, CSS and validation for you. 

Generated forms are built with Twitter Bootstrap elements baked in, so you don't even have to think about styling. Indicate the desired form style, basic or horizontal, in the JSON from definition, and the form is generated accordingly.

Requirements
============

* [AngularJS 1.2.6+](http://www.angularjs.org)
* [Twitter Bootstrap 3.0.3+](http://www.getbootstrap.com)
* [FontAwesome 4.0.3+](http://www.fontawesome.io) 

Note that Angular-forms.js is being developed with the latest stable versions of any required packages. It is quite possible that earlier version will work just fine.

Installation
============

The recommended way to add the required items and angular-forms.js to your project is to use [bower](http://www.bower.io). 

Steps to install with bower:

    bower install angular
    bower install bootstrap
    bower install angular-forms.js
    bower install components-font-awesome

Add the follwing stylesheets and scripts to your app: 

    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bower_components/components-font-awesome/css/font-awesome.min.css" /> 
    <script src="/bower_components/angular/angular.min.js"></script> 
    <script src="/bower_components/angular-forms.js/angular-forms.min.js"></script>

Note the above script and link element examples assume bower was used for installation and that packages were installed in bower_components. If that is not the case, adjust accordingly. 

Sample Application
================== 

A sample application is included to provide a getting started example as well as aid in development. To use the sampe app, clone the angular-forms.js repo, install dependencies, and run the included web server. The following assumes the repo will be clones into ~/projects:

    cd ~/projects
    git clone git@github.com:chouseknecht/angular-forms.js.git  
    cd angular-forms.js 
    bower install

Start the web server:

    cd ~/projects/angular-forms.js
    ./scripts/web-server.js

Point your browser to: http://localhost:8000/app/index.html

Contributing
============

At the moment there are no tests. They will be added shortly. In the meantime, install the sample app, as detailed above, and add new features or changes to the sample app and demonstrate that things are working as expected.    

Use the compile.sh script to minify:

    cd ~/projects/angular-forms.js
    ./scripts/compile.sh
    
