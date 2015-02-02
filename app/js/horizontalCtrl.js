(function() {

    'use strict';

    var module = angular.module('sampleApp');

    module.controller('horizontalCtrl', ['$scope', 'SampleForm', _controller]);

    function _controller($scope, SampleForm) {
        //Copy of our sample form, make a couple quick changes and render as a horizontal form.
        //The directive will not fire until $scope.hzReady evaluates to true

        $scope.horizontalForm = angular.copy(SampleForm);
        $scope.horizontalForm.horizontal = true;
        $scope.horizontalForm.name = 'SampleFormHorizontal';

        for (var fld in $scope.horizontalForm.fields) {
            $scope.horizontalForm.fields[fld].srOnly = false;
            $scope.horizontalForm.fields[fld].ngModel = fld + '_hz';
            if ($scope.horizontalForm.fields[fld].helpText) {
                $scope.horizontalForm.fields[fld].placeholder = $scope.horizontalForm.fields[fld].helpText;
                delete $scope.horizontalForm.fields[fld].helpText;
            }
            if (fld === 'other_source') {
                $scope.horizontalForm.fields[fld].ngShow = "referral_source_hz == 'other'";
                $scope.horizontalForm.fields[fld].ngRequired = "referral_source_hz == 'other'";
            }
        }
        $scope.horizontalForm.buttons.reset.ngClick = 'hzReset()';

        $scope.hzReady = true;

        $scope.hzReset = function() {
            $scope.afHorizontalForm.resetForm();
        };

    }
})();