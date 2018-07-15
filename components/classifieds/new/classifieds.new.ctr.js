(function (){

    "use strict"

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl' , function ($scope ,$state ,$mdDialog,$timeout , $mdSidenav, classifiedsFactory) {

            var vm = this ;

            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function (){
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen' , function (sidenav){
                if(sidenav === false){
                    $mdSidenav('left')
                        .close()
                        .then(function(){
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidebar() {
                vm.sidenavOpen = false;
            }
            
            function saveClassified(classified) {
                if(classified){
                    classified.contact = {
                        name:"Vishal Ranjan",
                        mobile:"56414652346764564353",
                        email:"fake@fake.fake"
                    }
                   $scope.$emit('newClassified' ,classified );
                   vm.sidenavOpen = false;
                }
            }    

        });
})();