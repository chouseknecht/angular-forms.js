angular-forms
=============

AngularForms makes it easy to build forms for your AngularJS app. Create forms as JSON objects, and let AngularForms generate, compile and inject 
the HTML into your app, complete with Angular directives, validation and Twitter Bootstrap styling.

For full documentation and help getting started visit [http://angularforms.org](http://www.angularforms.org)

v1.0.4 Beta release 


Requirements
============

* [AngularJS 1.2.6+](http://www.angularjs.org)
* [Twitter Bootstrap 3.0.3+](http://www.getbootstrap.com)
* [FontAwesome 4.0.3+](http://www.fontawesome.io) 
* [JQuery 2.0.3+](http://www.jqueryui.com)
* [JQuery UI 1.10.3+](http://www.jqueryui.com)

Note that Angular-forms.js is being developed with the latest stable versions of any required packages. It is quite possible that earlier version will work just fine.

Installation
============

The recommended way to add the required items and angular-forms.js to your project is to use [bower](http://www.bower.io).

    bower install angular-forms.js
    
Add the follwing stylesheets and scripts to your app: 

    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bower_components/components-font-awesome/css/font-awesome.min.css" /> 

    <script src="/bower_components/jquery/jquery.min.js"></script>
    <script src="/bower_components/jqueryui/ui/minified/jquery-ui.min.js"></script>
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

At the moment there are no tests. They will be added shortly. In the meantime, install the sample app, as detailed above, and add new features or changes to the sample app and demonstrate that things are working as expected. Lint and minify the javascript using [Grunt](http://gruntjs.com)
    
