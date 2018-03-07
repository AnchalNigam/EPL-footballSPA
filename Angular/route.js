footballApp.config(['$routeProvider', function($routeProvider){

       $routeProvider
        .when('/',{                                               //Main page
            // location of the template
        	templateUrl		: 'views/all-matches.html',
        	 // Which controller it should use 
            controller      : 'allmatchesController',
            // what is the alias of that controller.
            controllerAs    : 'myMatches'
        	
        })
        .when('/match/:roundIndex/:matchIndex',{                                               //Single Match page
            // location of the template
        	templateUrl		: 'views/singlematch.html',
        	 // Which controller it should use 
            controller      : 'singleMatchController',
            // what is the alias of that controller.
            controllerAs    : 'singleMatch'
        	
        })
        .when('/statistics/:teamName/:keycode',{                                               //Team Statistics
            // location of the template
            templateUrl     : 'views/teamstatistics.html',
             // Which controller it should use 
            controller      : 'statController',
            // what is the alias of that controller.
            controllerAs    : 'statistics'
            
        })
         .when('/news',{                                               //Team Statistics
            // location of the template
            templateUrl     : 'views/news.html',
             // Which controller it should use 
            controller      : 'newsController',
            // what is the alias of that controller.
            controllerAs    : 'myNews'
            
        })
 

        .otherwise(
           {
           templateUrl:'views/404.html'                     //404 PAGE
       }
        );
         

}]);