(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/


})




angular.module('viewCustom')
.controller('prmTopBarBeforeCtrl',[function () {
    var vm=this;
    vm.$onInit=function () {

    };

}]);

angular.module('viewCustom')
.component('prmTopBarBefore',{
    bindings:{parentCtrl:'<'},
    controller: 'prmTopBarBeforeCtrl',
    controllerAs:'vm',
    templateUrl:'/primo-explore/custom/01JHU_INST-JHU/html/prm-topbar-before.html'
});
