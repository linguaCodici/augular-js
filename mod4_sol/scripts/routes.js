(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories_list.template.html',
            controller: 'categoriesController as cateCtrl',
            resolve: {
                // categories: ['MenuDataService', function(MenuDataService){
                //     return MenuDataService.getAllCategories();
                // }]
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories()
                    .then(function(response) {
                        console.log(response.data);
                        return response.data;
                    });
                }]
            }
        })

        .state('items', {
            url: '/items/{cat_id}',
            templateUrl: 'templates/items_list.template.html',
            controller: 'itemsController as itemCtrl',
            resolve: {
                items: ['MenuDataService', '$stateParams',
                    function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.cat_id)
                        .then(function(response) {
                            console.log(response.data.menu_items);
                            return response.data.menu_items;
                        }
                    )}
                ]
            }
        });
    }

})();
