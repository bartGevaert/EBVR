'use strict';

(function() {

class QuizCtrl 
{

    constructor($http, $scope, socket, $stateParams, $compile) 
    {
       

        this.$http = $http;
        $scope.detailsData = [];
        $scope.thingData= [];
        $scope.count;
        $scope.questionData = [];

        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('thing');
        });
      

        
        $http.get('/api/things/'+ $stateParams.quizId).then(response => 
        {
            $scope.detailsData = response.data.details;
             $scope.id = $scope.detailsData[0].currentQuestion;
            $scope.questionData = $scope.detailsData[$scope.id];   
           
            $scope.count =  $scope.detailsData.length;
            socket.syncUpdates('detail', $scope.detailsData);
        });
    
         
        
        $scope.nextQuestion = function() {
            
            if($scope.id < $scope.detailsData.length-1)
            {
                $scope.id++;
                $scope.questionData = $scope.detailsData[$scope.id];
                
                 $http.put('/api/details/' + $scope.detailsData[0]._id, {currentQuestion : $scope.id});
         $scope.juist = "";
                $scope.selectedAll = false;
            }

  
            
        };
         $scope.previousQuestion = function() {
            if($scope.id >= 1)
            {
                 $scope.id--;
                 $scope.questionData = $scope.detailsData[$scope.id];
                
                $http.put('/api/details/' + $scope.detailsData[0]._id, {currentQuestion : $scope.id});
                $scope.juist = "";
                $scope.selectedAll = false;
                
            }
 
        };
         

        $scope.getPercentage = function () {
            return ((($scope.id + 1) * 100) / $scope.count);
        }
        $scope.getTotal = function () {
            return $scope.id;
        }
         $scope.getAnswer = function (id,index) {
             console.log($scope.detailsData[$scope.id].correctAnswer);
           if ($scope.detailsData[$scope.id].correctAnswer == index)
           {
               $scope.juist = "juist";
           }
             else
             {
                 $scope.juist = "fout";
             }
        }
  
    }
}
  
angular.module('ebvrApp')
  .controller('QuizCtrl', QuizCtrl);
})();