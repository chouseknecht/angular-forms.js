angular-forms
=============

AngularForms makes it easy to build forms for your AngularJS app. Create forms as JSON objects, and let AngularForms generate, compile and inject
the HTML into your app, complete with Angular directives, validation and Twitter Bootstrap styling.

For full documentation and help getting started visit [http://angularforms.org](http://www.angularforms.org)

Latest stable release: v2.0.2

Devel Branch WIP
----------------
* Adding unit tests

Requirements
------------

* [AngularJS 1.2.6+](http://www.angularjs.org)
* [Twitter Bootstrap 3.0.3+](http://www.getbootstrap.com)
* [FontAwesome 4.0.3+](http://www.fontawesome.io)
* [JQuery 2.0.3+](http://www.jqueryui.com)
* [JQuery UI 1.10.3+](http://www.jqueryui.com)

Note that Angular-forms.js is being developed with the latest stable versions of any required packages. It is quite possible that earlier version will work just fine.

Installation
------------

The recommended way to add the required items and angular-forms.js to your project is to use [bower](http://www.bower.io).

    bower install angular-forms.js

Add the follwing stylesheets and scripts to your app:

    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bower_components/components-font-awesome/css/font-awesome.min.css">

    <script src="/bower_components/jquery/jquery.min.js"></script>
    <script src="/bower_components/jqueryui/ui/minified/jquery-ui.min.js"></script>
    <script src="/bower_components/angular/angular.min.js"></script>
    <script src="/bower_components/angular-forms.js/angular-forms.min.js"></script>

###Notes
* the above assume bower installation and with packages installed in bower_components
* jQueryUI is only required when using the spinner control


Sample Application
------------------

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
------------

At the moment there are no tests. They will be added shortly. In the meantime, install the sample app, as detailed above, and add new features or changes to the sample app and demonstrate that things are working as expected. Lint and minify the javascript using [Grunt](http://gruntjs.com)


Release Notes
-------------
####2.0.2
* Added support for custom type fields. Use any HTML or an ng-template to create a completely custom element.
* Added modelObject property to form definition. Value will be prepended to ng-model, providing a convenient way to define models within an object.   

####2.0.1
* ngOptions now works properly on select elements
* Removed unnecessary control-label class from checkbox label
* Fixed duplicate objectModel appearing on radio buttons

####2.0.0
* Fixed hide/show fields and form validation. When fields are hidden using the ng-hide direcitve, they will now be removed from the angular form controller. When fields are shown using ng-show, they will be added to the angular form controller. Previously fields were not automatically added and removed from the controller, and this often caused the form to be in an invalid state due to errors on a hidden field. The user could not fix the problem, and the save button would be disabled.
* Added a clearError() method to clear errors on a single field.
* Code cleanup: removed afEmpty factory
* Changing the module name to angularforms from AngularFormsModule. The factory is still called AngularForms.
* For the modal module, changed the name  to angularforms.modal from AngularFormsModalModule.

