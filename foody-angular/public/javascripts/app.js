angular.module('foody', ['tml', 'ui.router'])
    .config(/*@ngInject*/ function ($urlRouterProvider, $stateProvider)
    {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('', '/');
        
        $stateProvider
            .state('root', {
                url: "",
                resolve: {
                    data: function ($http)
                    {
                        return $http.get('/api/data.json')
                            .then(function (response)
                            {
                                return response.data;
                            });
                    }  
                },
                template: "<ui-view></ui-view>"
            })
            .state('recipe', {
                url: "/recipe/:id",
                parent: 'root',
                resolve: {
                    recipe: function ($stateParams, data)
                    {
                        return _.find(data.recipes, { id: $stateParams.id });
                    }  
                },
                controller: function ($scope, recipe)
                {
                    $scope.recipe = recipe;
                },
                templateUrl: "/includes/recipe.html"
            })
            .state('index', {
                parent: 'root',
                url: "/",
                resolve: {
                    //Imagine there's a nice API returning these bits of data
                    categories: function (data)
                    {
                        return data.categories;
                    },
                    recipes: function (data)
                    {
                        var recipes = data.recipes;

                        return _.groupBy(recipes, 'category');
                    }
                },
                controller: function ($scope, categories, recipes)
                {
                    $scope.categories = categories;  
                    $scope.recipes = recipes;  
                },
                templateUrl: '/includes/main.html'
            });
    });


//Initialize TML after DOM ready
angular.element(document).ready(function() {
    tml.init({
        key: "50eb9d459cd289057f16f71ebc8df9ecd33475b4c2798cfc347165081ddb0abe",
        token: "4bfecca14a8af2c60158ff5c940aa1aeb7a1796fbe37b1500de6fa2dcf7aecef",
        debug: true,
        agent: {
          host: "https://tools.translationexchange.com/agent/staging/agent.min.js",
          type: "agent"
        },
        onLoad: function(app) {
            //bootstrap angular app after tml starts
            angular.bootstrap(document, ['foody']);
        }
    });
});