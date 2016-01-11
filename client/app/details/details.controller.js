'use strict';

(function() {

class DetailsCtrl {

  constructor($http, $scope, socket, $stateParams, $compile) {
    this.$http = $http;
    this.detailsData = [];

    $scope.answersArray = [];
    var buttonIndexNumber = 2;

    
    $http.get('/api/things/'+ $stateParams.detailId).then(response => {
            
      this.detailsData = response.data.details;
        
      socket.syncUpdates('detail', this.detailsData);
    });  
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('detail');
    });
      
     
      
      $scope.addDetail = function() {
     
                                                                
          $scope.answersArray[0] = $scope.newAnswer1;
          $scope.answersArray[1] = $scope.newAnswer2;
          $scope.answersArray[2] = $scope.newAnswer3;
          $scope.answersArray[3] = $scope.newAnswer4;
          $scope.answersArray[4] = $scope.newAnswer5;
          $scope.answersArray.length = buttonIndexNumber;

          
           $http.post('/api/details', { question: $scope.newQuestion, answer: $scope.answersArray, correctAnswer : $scope.correctAnswer, groupId : $scope.details.detailsData.length+1, detailId: $stateParams.detailId});
          
          
          $scope.newQuestion ="";
          $scope.newAnswer1 = "";
          $scope.newAnswer2 ="";
          $scope.newAnswer3="";
          $scope.newAnswer4="";
          $scope.newAnswer5="";
      }
      
      $scope.addAnswerHTML = function(formName) {
         if (buttonIndexNumber < 5)
         {
             buttonIndexNumber++;
            var newInput = document.createElement('input');
            
           
             
            setAttributes(newInput, {"type": "text", "class" : "form-control ng-valid ng-dirty ng-valid-parse ng-untouched", "placeholder" : "Add a possible answer to the question", "ng-model" : "newAnswer" + buttonIndexNumber})
            
                 
            document.getElementById(formName).appendChild(newInput);                      $compile(newInput)($scope)//angular update html element zodat verandering zichtbaar is.                                     
         }
        
        }
         $scope.removeAnswerHTML = function(divName) {
            if (buttonIndexNumber > 2)
            {
                var inputs =  document.getElementById(divName); 
                var lastInputs = inputs.lastElementChild;
                inputs.removeChild(lastInputs);
                buttonIndexNumber--;
                
            }
            
        }

         $scope.isThisChecked = function(elementId, radiobuttonId) {
             $scope.correctAnswer = radiobuttonId;
             
            $http.put('/api/details/'+ elementId, {correctAnswer : $scope.correctAnswer});
            
             $scope.correctAnswer = "";
         }
         
         
          function setAttributes(el, options) {
               Object.keys(options).forEach(function(attr) {
                 el.setAttribute(attr, options[attr]);
               })
            }
      
    }
  
  }
  
angular.module('ebvrApp')
  .controller('DetailsCtrl', DetailsCtrl);

})();
