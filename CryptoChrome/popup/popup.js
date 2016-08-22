var EventListener = require('../event.listener')
var socket = io.connect('http://localhost:9999', { reconnect: true });
var angular = require('angular');
var uiRouter = require('angular-ui-router')
var app = angular.module('cryptoPass', ['ui.router'])

var eventListener = new EventListener();

chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
  if (!eventListener[req.eventName]) return
  eventListener.emit(req.eventName, req);
})

app.controller('cryptoCtrl', function($scope, $rootScope, $state) {
  console.log('started angular')

  chrome.extension.sendMessage({ eventName: 'getValid' })

  eventListener.on('sendValid', function(data) {
    $rootScope.accounts = data.accountInfo

    if (data.valid) {
      $state.go('valid')
    } else {
      $state.go('auth')
    }
  })

  eventListener.on('validTimeout', function(data) {
    $state.go('auth')
  })

})

app.config(function($stateProvider) {
  $stateProvider.state('auth', {
      url: '/',
      templateUrl: 'angular/auth.view.html',
      controller: function($scope, $state) {
        $scope.error = null;

        $scope.authenticatePassword = function() {
          // need to validate password from chrome
          chrome.extension.sendMessage({ master: $scope.master, eventName: 'authentication' })
          eventListener.on('validation', function(data) {
            if (data.valid) {
              $state.go('valid')
              return
            }
            $scope.error = true;
            $scope.$digest()
            setTimeout(function() {
              $scope.error = null;
            }, 3000)
          })
        }

      }
    })
    .state('valid', {
      url: '/valid',
      templateUrl: 'angular/valid.view.html',
      controller: function($scope, $state, $rootScope) {
        $scope.username = null;
        $.get('http://localhost:9999/username')
        .then(function (name){
          $scope.username = name;
          $rootScope.$evalAsync()
        })
        if ($rootScope.accounts) {
          $scope.accounts = $rootScope.accounts;
          $rootScope.accounts = null
        }

        $scope.autoFill = function(name, category, username) {
          chrome.extension.sendMessage({ eventName: 'backgroundToFill', name: name, username: username || null, category: category.toLowerCase() })
        }

        eventListener.on('accountInfo', function(data) {
          $scope.accounts = data.data
          $scope.$digest()
        })

      }
    })
})




$(document).ready(function() {
  console.log('ready');

  // open any hrefs to new logins in new tabs
  window.addEventListener('click', function(e) {
    if (e.target.href !== undefined) {
      chrome.tabs.create({ url: e.target.href })
    }
  })

})
