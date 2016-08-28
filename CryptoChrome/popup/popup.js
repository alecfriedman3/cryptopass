var EventListener = require('../event.listener')
var socket = io.connect('http://localhost:38396', { reconnect: true });
var angular = require('angular');
var uiRouter = require('angular-ui-router')
var app = angular.module('cryptoPass', ['ui.router'])
var idGenerator = require('../utilities/hash.utility.js').idGenerator
var createRandom = require('../utilities/pass.gen.js').createRandom
var moment = require('moment')

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
        $.get('http://localhost:38396/username')
        .then(function (name){
          $scope.username = name;
          $rootScope.$evalAsync()
        })
        if ($rootScope.accounts) {
          $scope.accounts = $rootScope.accounts;
          $rootScope.accounts = null
        }

        $scope.toAdd = function (){
          $state.go('add')
        }

        $scope.autoFill = function(name, category, username) {
          chrome.extension.sendMessage({ eventName: 'backgroundToFill', name: name, username: username || null, category: category.toLowerCase() })
        }

        eventListener.on('accountInfo', function(data) {
          $scope.accounts = data.data
          $scope.$digest()
        })

        eventListener.on('sendValid', function(data) {
          if (data.valid){
            $scope.accounts = data.accountInfo
          }
        })

        chrome.extension.sendMessage({ eventName: 'getValid' })

      }
    })
    .state('add', {
      url: '/add',
      templateUrl: 'angular/add.view.html',
      controller: function ($scope, $state){
        $scope.login = {
          name: null,
          username: null,
          password: null,
          website: null
        }

        $scope.generatePassword = function (len, syms, nums){
          if (+syms + +nums > +len){
            $scope.syms = '0';
            $scope.nums = '0';
            return
          }
          $scope.login.password = $scope.password2 = createRandom(+len, +syms, +nums)
          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {eventName: 'loginRes', logins: [$scope.login]})
          })
        }

        $scope.autofill = function (){
          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {eventName: 'loginRes', logins: [$scope.login]})
          })
        }

        $scope.createLogin = function (){
          if ($scope.login.password !== $scope.password2 || !$scope.login.password) {
            alert("Passwords do not match!");
            return
          } else {
            var newId = idGenerator($scope.login)
            $scope.login.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
            $scope.login.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');
            $scope.login.id = newId
            if ($scope.login.website && $scope.login.website.search(/http/) == -1) $scope.login.website = 'http://'+$scope.login.website
            chrome.extension.sendMessage({eventName: 'newLogin', login: $scope.login})
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {eventName: 'autoFill', category: 'logins'})
            })
            $state.go('valid')
          }
        }

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
