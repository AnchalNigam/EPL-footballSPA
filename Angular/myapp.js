var footballApp = angular.module("footballApp", ["ngRoute","chart.js"]);

//Controller for displaying all Matches list
footballApp.controller('allmatchesController',['$http',function($http) {
   var main=this;
   this.allmatches2015=[];
   this.allmatches2016=[];
   this.allmatches=[];
  

    this.EPL_2015 = function(){
    	$http({
        method:"GET",
        url: "data/EPL-2015.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2015=response.data.rounds;
          
          EPL_2016(main.allmatches2015);
         

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2015 matches

 var EPL_2016 = function(allmatches2015){
	    
    	$http({
        method:"GET",
        url: "data/EPL-2016.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2016=response.data.rounds;
         
          main.allmatches=main.allmatches2015.concat(main.allmatches2016);
        

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2015 matches


this.EPL_2015();

}]);
//Controller for displaying all Matches list END


//Controller for displaying SINGLE Matches 
footballApp.controller('singleMatchController',['$http','$routeParams',function($http,$routeParams) {
	this.roundNameIndex=$routeParams.roundIndex;
	this.matchIndex=$routeParams.matchIndex;
	this.roundName="";
	this.winnerName="";
	
    var main=this;
   this.allmatches2015=[];
   this.allmatches2016=[];
   this.singlematch=[];
  

    this.EPL_2015 = function(){
    	$http({
        method:"GET",
        url: "data/EPL-2015.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2015=response.data.rounds;
          
          EPL_2016(main.allmatches2015);
         

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2015 matches

 var EPL_2016 = function(allmatches2015){
	    
    	$http({
        method:"GET",
        url: "data/EPL-2016.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2016=response.data.rounds;
         
          main.allmatches=main.allmatches2015.concat(main.allmatches2016);
         
          main.singlematch=main.allmatches[main.roundNameIndex].matches[main.matchIndex];
          main.roundName=main.allmatches[main.roundNameIndex].name;
          
          if(main.singlematch.score1>main.singlematch.score2){
          	main.winnerName=main.singlematch.team1.name;
          }
          else if(main.singlematch.score1<main.singlematch.score2){
          	main.winnerName=main.singlematch.team2.name;
          }
          else{
          	main.winnerName="Match is Draw";
          }

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2015 matches
/*this.singlematch=this.allmatches[this.roundNameIndex][this.matchIndex];*/
this.EPL_2015();



}]);
//Controller for displaying SINGLE Matches  END


//Controller for displaying STATISTICS

footballApp.controller('statController',['$http','$routeParams',function($http,$routeParams) {

  var main=this;
  this.keycode=$routeParams.keycode;
  this.teamName=$routeParams.teamName;
  /*EPL 2015 STATISTICS*/
  this.EPL_2015_totMatch=0;
  this.EPL_2015_win=0;
  this.EPL_2015_lose=0;
  this.EPL_2015_draw=0;
  this.EPL_2015_goal=0;
  this.EPL_2015_Charts=[];
  this.EPL_2015_overall=[];

  /*EPL 2015 STATISTICS END*/

  /*EPL 2016 STATISTICS*/
  this.EPL_2016_totMatch=0;
  this.EPL_2016_win=0;
  this.EPL_2016_lose=0;
  this.EPL_2016_draw=0;
  this.EPL_2016_goal=0;
  this.EPL_2016_Charts=[];
  this.EPL_2016_overall=[];
  /*EPL 2016 STATISTICS END*/

   /*EPL overall STATISTICS*/
  this.EPL_totMatch=0;
  this.EPL_win=0;
  this.EPL_lose=0;
  this.EPL_draw=0;
  this.EPL_goal=0;
  this.EPL_Charts=[];
  /*EPL overall STATISTICS END*/


  /*EPL 2015 FUNCTION*/
  this.EPL_2015 = function(){
    	$http({
        method:"GET",
        url: "data/EPL-2015.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2015=response.data.rounds;
          statistics_2015(main.allmatches2015);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2015 

/*EPL 2016 FUNCTION*/
  var EPL_2016 = function(EPL_2015_overall){
    	$http({
        method:"GET",
        url: "data/EPL-2016.json"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.allmatches2016=response.data.rounds;
          statistics_2016(main.allmatches2016,main.EPL_2015_overall);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

}// end load all EPL 2016

 var statistics_2015 = function(allmatches2015){                     //Calculaion of Statistics OF 2015 EPL and piechart
 	for(i in main.allmatches2015){
 		for(j in main.allmatches2015[i].matches){
 			if(main.allmatches2015[i].matches[j].team1.key==main.keycode){
 				main.EPL_2015_totMatch+=1;
 				main.EPL_2015_goal+=main.allmatches2015[i].matches[j].score1;
 				if(main.allmatches2015[i].matches[j].score1>main.allmatches2015[i].matches[j].score2){
 					main.EPL_2015_win+=1;
 				}
 				else if(main.allmatches2015[i].matches[j].score1<main.allmatches2015[i].matches[j].score2){
 					main.EPL_2015_lose+=1;
 				}
 				else{
 					main.EPL_2015_draw+=1;
 				}

 			}
 			else if(main.allmatches2015[i].matches[j].team2.key==main.keycode){
 				main.EPL_2015_totMatch+=1;
 				main.EPL_2015_goal+=main.allmatches2015[i].matches[j].score2;
 				if(main.allmatches2015[i].matches[j].score1<main.allmatches2015[i].matches[j].score2){
 					main.EPL_2015_win+=1;
 				}
 				else if(main.allmatches2015[i].matches[j].score1>main.allmatches2015[i].matches[j].score2){
 					main.EPL_2015_lose+=1;
 				}
 				else{
 					main.EPL_2015_draw+=1;
 				}



 			}
 		}
 	}
 	//PIE CHART PART
 	if(main.EPL_2015_totMatch!=0){
 	var win_calc=((main.EPL_2015_win/main.EPL_2015_totMatch)*100).toFixed(2);
 	var lost_calc=((main.EPL_2015_lose/main.EPL_2015_totMatch)*100).toFixed(2);
 	var draw_calc=((main.EPL_2015_draw/main.EPL_2015_totMatch)*100).toFixed(2);
 	main.EPL_2015_Charts.push(win_calc,lost_calc,draw_calc);
     }
     else{
    	main.EPL_2015_Charts.push(0,0,0);
    }
    //END OF PIE CHART 

    main.EPL_2015_overall.push(main.EPL_2015_totMatch,main.EPL_2015_win,main.EPL_2015_lose,main.EPL_2015_draw,main.EPL_2015_goal);
   //CALLING EPL 2016 FUNCTION AND PASSING 2015 MATCH VALUES
    EPL_2016(main.EPL_2015_overall);


 };


 var statistics_2016 = function(allmatches2016,EPL_2015_overall){                     //Calculaion of Statistics OF 2016 EPL and piechart
 	for(i in main.allmatches2016){
 		for(j in main.allmatches2016[i].matches){
 			if(main.allmatches2016[i].matches[j].team1.key==main.keycode){
 				main.EPL_2016_totMatch+=1;
 				main.EPL_2016_goal+=main.allmatches2016[i].matches[j].score1;
 				if(main.allmatches2016[i].matches[j].score1>main.allmatches2016[i].matches[j].score2){
 					main.EPL_2016_win+=1;
 				}
 				else if(main.allmatches2016[i].matches[j].score1<main.allmatches2016[i].matches[j].score2){
 					main.EPL_2016_lose+=1;
 				}
 				else{
 					main.EPL_2016_draw+=1;
 				}

 			}
 			else if(main.allmatches2016[i].matches[j].team2.key==main.keycode){
 				main.EPL_2016_totMatch+=1;
 				main.EPL_2016_goal+=main.allmatches2016[i].matches[j].score2;
 				if(main.allmatches2016[i].matches[j].score1<main.allmatches2016[i].matches[j].score2){
 					main.EPL_2016_win+=1;
 				}
 				else if(main.allmatches2016[i].matches[j].score1>main.allmatches2016[i].matches[j].score2){
 					main.EPL_2016_lose+=1;
 				}
 				else{
 					main.EPL_2016_draw+=1;
 				}



 			}
 		}
 	}
 	//PIE CHART PART 
 	if(main.EPL_2016_totMatch!=0){
 	var win_calc=((main.EPL_2016_win/main.EPL_2016_totMatch)*100).toFixed(2);
 	var lost_calc=((main.EPL_2016_lose/main.EPL_2016_totMatch)*100).toFixed(2);
 	var draw_calc=((main.EPL_2016_draw/main.EPL_2016_totMatch)*100).toFixed(2);
 	main.EPL_2016_Charts.push(win_calc,lost_calc,draw_calc);
    }
    else{
    	main.EPL_2016_Charts.push(0,0,0);
    }
//PIE CHART PART END

     main.EPL_2016_overall.push(main.EPL_2016_totMatch,main.EPL_2016_win,main.EPL_2016_lose,main.EPL_2016_draw,main.EPL_2016_goal);
     overall_statistics(main.EPL_2015_overall,main.EPL_2016_overall);
   


 };


//FUNCTION FOR OVER ALL CALCULATION 2015/2016/2017
var overall_statistics=function(EPL_2015_overall,EPL_2016_overall){
	main.EPL_totMatch=main.EPL_2015_overall[0]+main.EPL_2016_overall[0];
	main.EPL_win=main.EPL_2015_overall[1]+main.EPL_2016_overall[1];
	
	main.EPL_lose=main.EPL_2015_overall[2]+main.EPL_2016_overall[2];
	main.EPL_draw=main.EPL_2015_overall[3]+main.EPL_2016_overall[3];
	main.EPL_goal=main.EPL_2015_overall[4]+main.EPL_2016_overall[4];
	if(main.EPL_totMatch!=0){
 	var win_calc=((main.EPL_win/main.EPL_totMatch)*100).toFixed(2);
 	var lost_calc=((main.EPL_lose/main.EPL_totMatch)*100).toFixed(2);
 	var draw_calc=((main.EPL_draw/main.EPL_totMatch)*100).toFixed(2);
 	main.EPL_Charts.push(win_calc,lost_calc,draw_calc);
    }
    else{
    	main.EPL_Charts.push(0,0,0);
    }



}
//END 

this.EPL_2015();

// Pie Chart
this.chartPieLabels = ["Total Won","Total Lost","Total Draw"];

this.chartPieOptions = {
maintainAspectRatio: true,
responsive: true
}
this.chartPieColours =['#999999', '#2fb467', '#cc3321', '#494750'];
  

	}]);

//Controller for displaying STATISTICS END

//controller for news feed
footballApp.controller('newsController',['$http', function($http) {
   var main=this;
   this.footballNews=[];
   this.footballNews = function(){
   
      $http({
        method:"GET",
        url: "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=0f7a319a1d824142a7e15415275f97a1"
          
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        
          main.footballNews=response.data.articles;
           console.log(main.footballNews);
         

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all International News

this.footballNews();





}]);