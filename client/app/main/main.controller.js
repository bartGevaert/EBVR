'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $compile, ngDialog) {
    this.$http = $http;
    this.awesomeThings = [];

      
    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
      
          $scope.FormData = {
        Password:'' };
      
        $scope.FormData1 = {
        PasswordAttempt:'' };
      
        
      
      
      
      $scope.setPassword = function(id) {
ngDialog.openConfirm({            
            template: '<div><ul><p>set password:   <input type="text" ng-model="FormData.Password"/></p>' +
             
               '<input type="button" value="confirm" ng-click="confirm(FormData)"/>' +
                '<input type="button" value="close" ng-click="closeThisDialog()"/></ul></div>' ,
            plain: true,
            scope:$scope      
        }).then(function(value){
            $http.put('/api/things/'+ id, {password : value.Password});
    value.Password = '';    
        },function(reject){
            console.log(reject);
            
});
      };
      
      $scope.goToQuestions  = function(linkId) {
          location.href = "/details/"+linkId;

      }
      
      $scope.askPassword = function(id,index) {
           $http.get('/api/things/'+id).then(response => {
                 
                $scope.password = response.data.password;
                if ($scope.password  == "")
                    {
                        location.href = "/quiz/"+id;

                    } else
                    {
                          ngDialog.openConfirm({            
             template: '<div><ul><p>ENTER PASSWORD:   <input type="text" ng-model="FormData1.PasswordAttempt"/></p>' +
             
               '<input type="button" value="confirm" ng-click="confirm(FormData1)"/>' +
                '<input type="button" value="close" ng-click="closeThisDialog()"/></ul></div>' ,
            plain: true,
            scope:$scope      
        }).then(function(value){
               
            if ($scope.password  == value.PasswordAttempt)
                    {
                        location.href = "/quiz/"+id;

                    }
            
        },function(reject){
            console.log(reject);
            
});
                    }
             });
          
        
     
      }
      
       function setAttributes(el, options) {
               Object.keys(options).forEach(function(attr) {
                 el.setAttribute(attr, options[attr]);
               })
            }          
  }

    
  addThing() {
  
      this.$http.post('/api/things', { name: this.newThing ,info :  this.newDescription, password : "", currentQuestion : 0});
      this.newThing = '';
      this.newDescription= '';
    
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
    
     
}
    
    

angular.module('ebvrApp')
  .controller('MainController', MainController);

})();
