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
    // $scope.authenticate = false;
  chrome.extension.sendMessage({ eventName: 'getValid' })

  eventListener.on('sendValid', function(data) {
    // $scope.authenticate = data.valid
    if (data.valid) {
      $state.go('valid', data.accountInfo)
    } else {
      $state.go('auth')
    }
    // $scope.$digest()
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

        $scope.authenticatePassword = function() {
          // need to validate password from chrome
          chrome.extension.sendMessage({ master: $scope.master, eventName: 'authentication' })
          eventListener.on('validation', function(data) {
              if (data.valid) {
                $state.go('valid')
              }
            })
        }

      }
    })
    .state('valid', {
      url: '/valid',
      templateUrl: 'angular/valid.view.html',
      // params: {
      //   accounts: null
      // },
      controller: function($scope, $state) {
        // $scope.accounts = $state.params.accounts
        console.log($scope.accounts)

        $scope.autoFill = function(name) {
          chrome.extension.sendMessage({ eventName: 'backgroundToFill', name: name })
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
