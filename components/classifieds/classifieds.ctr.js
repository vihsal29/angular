(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            var vm = this;

            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.editClassified = editClassified;
            vm.saveClassified = saveClassified;
            vm.deleteClassified = deleteClassified;
            vm.saveEdit = saveEdit;
            vm.classifieds;
            vm.categories;
            vm.classified;
            vm.editing;

            vm.classifieds = classifiedsFactory.ref;
            vm.classifieds.$loaded().then(function (classifieds) {
                vm.categories = getCategories(classifieds);
            });

                $scope.$on('newClassified', function (event, classified) {
                   vm.classifieds.$add(classified);
                    showToast('Classified Saved!');
                });

                $scope.$on('editSaved', function (event, message) {
                    showToast(message);
                });

                function openSidebar() {
                    $state.go('classifieds.new');
                }

                function closeSidebar() {
                    $mdSidenav('left').close();
                }

                function saveClassified(classified) {
                    if (vm.classified) {
                        classified.contact = contact;
                        vm.classifieds.push(classified);
                        vm.classified = {};
                        closeSidebar();
                        showToast("Classified Saved!");
                    }
                }

                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id
                    });
                }

                function saveEdit() {
                    vm.editing = false;
                    vm.classified = {};
                    closeSidebar();
                    showToast("Classified Edited!");
                }

                function deleteClassified(event, classified) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + classified.title + '?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);
                    $mdDialog.show(confirm).then(function () {
                        vm.classifieds.$remove(classified);
                        showToast('Classified Deleted!');
                    }, function () {

                    });
                }

                function showToast(message) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(3000)
                    );
                }

                function getCategories(classifieds) {

                    var categories = [];

                    angular.forEach(classifieds, function (item) {
                        angular.forEach(item.categories, function (category) {
                            categories.push(category);
                        });
                    });
                    return _.uniq(categories);
                }


            });
 })();
