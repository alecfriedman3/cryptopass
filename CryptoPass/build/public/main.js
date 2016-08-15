'use strict';

var app = angular.module('cryptoPass', ['ui.router', require('angular-animate')]);
app.config(function ($urlRouterProvider) {
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

app.controller('creditCardController', function ($scope) {
  $scope.accounts = masterObj.creditCard;
});

app.controller('singleCreditCardController', function ($scope, $stateParams) {
  $scope.account = masterObj.creditCard.filter(function (info) {
    return info.id == $stateParams.id;
  })[0];
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('creditCard', {
    url: '/creditCard',
    templateUrl: 'build/angular/creditCard/creditCard.view.html',
    controller: 'creditCardController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('creditCard.single', {
    url: '/creditCard/:id',
    templateUrl: 'build/angular/creditcard/creditCard.single.view.html',
    controller: 'singleCreditCardController'
  });
});

// reminder of functions and utilities available throughout application
// var utils = require('../../utilities/encrypt.file.js')
// var validate = utils.validate;
// var decryptFile = utils.decryptFile
// var encryptFile = utils.encryptFile
// var masterObj;

app.controller('authController', function ($scope, $state, $rootScope) {

  $scope.master = null;

  $scope.authenticatePassword = function (master) {
    var isValid = validate(master);
    if (!isValid) {
      $scope.master = null;
      return;
    } else if (isValid) {
      decryptFile(master).then(function (obj) {
        masterObj = obj;
        masterPass = master;
        $rootScope.validated = true;
        $rootScope.$evalAsync();
        $state.go('home');
      });
    }
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('auth', {
    url: '/',
    templateUrl: 'build/angular/authenticate/authenticate.view.html',
    controller: 'authController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'build/angular/home/home.view.html'
  });
});

app.controller('identityController', function ($scope) {
  $scope.identity = masterObj.identity;
});

app.controller('singleIdentityController', function ($scope, $stateParams) {
  $scope.identity = masterObj.identity.filter(function (info) {
    return info.id == $stateParams.id;
  })[0];
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('identity', {
    url: '/identity',
    templateUrl: 'build/angular/identity/identity.view.html',
    controller: 'identityController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('identity.single', {
    url: '/identity/:id',
    templateUrl: 'build/angular/identity/identity.single.view.html',
    controller: 'singleIdentityController'
  });
});

app.controller('loginController', function ($scope) {
  console.log('in logins controller');
  $scope.accounts = masterObj.login;
});

app.controller('singleLoginController', function ($scope, $stateParams) {
  $scope.account = masterObj.login.filter(function (info) {
    return info.id == $stateParams.id;
  })[0];
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  };
});

app.controller('addLoginController', function ($scope, $state, $stateParams, $rootScope) {

  $scope.login = {
    name: null,
    username: null,
    password: null
  };

  $scope.generatePassword = function () {

    $scope.login.password = createRandom(20);
  };

  $scope.createLogin = function () {
    var newId = masterObj.login[masterObj.login.length - 1].id + 1;
    $scope.login.id = newId;
    $scope.login.secondaryProp = function () {
      return this.username;
    };
    masterObj.login.push($scope.login);
    var encrypted = encrypt(JSON.stringify(masterObj), masterPass);
    socket.emit('addFromElectron', { data: encrypted });
    $rootScope.$evalAsync();
    $state.go('login.single', { id: newId });
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'build/angular/login/login.view.html',
    controller: 'loginController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('login.single', {
    url: '/login/:id',
    templateUrl: 'build/angular/login/login.single.view.html',
    controller: 'singleLoginController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('login.add', {
    url: '/login/add',
    templateUrl: 'build/angular/login/login.add.view.html',
    controller: 'addLoginController'
  });
});

app.controller('loginsController', function ($scope) {
  console.log('in logins controllesr');
});

app.directive('navBar', function ($state, $stateParams, $rootScope) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'build/angular/nav/nav.directive.html',
    link: function link(scope) {
      scope.active = null;
      scope.show = false;
      scope.navClick = function (str) {
        decryptFile(masterPass).then(function (obj) {
          masterObj = obj;
          $rootScope.$evalAsync();
        });
        if (str == scope.active) return;
        var storedState = JSON.stringify({ name: $state.current.name, id: $stateParams.id });
        window.sessionStorage.setItem(scope.active, storedState);
        if (window.sessionStorage[str]) {
          scope.active = str;
          var stateStr = window.sessionStorage[str];
          var stateObj = JSON.parse(stateStr);
          $state.go(stateObj.name, { id: stateObj.id });
          return;
        }
        scope.active = str;
        scope.show = false;
        $state.go(str);
      };
      scope.showHideDropdown = function () {
        console.log('clicked');
        scope.show = !scope.show;
      };
    }
  };
});

app.controller('noteController', function ($scope) {
  $scope.notes = masterObj.note;
});

app.controller('singleNoteController', function ($scope, $stateParams) {
  $scope.note = masterObj.note.filter(function (info) {
    return info.id == $stateParams.id;
  })[0];
  $scope.updateInfo = false;
  $scope.showForm = function () {
    $scope.updateInfo = !$scope.updateInfo;
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('note', {
    url: '/note',
    templateUrl: 'build/angular/note/note.view.html',
    controller: 'noteController'
  });
});

app.config(function ($stateProvider) {
  $stateProvider.state('note.single', {
    url: '/note/:id',
    templateUrl: 'build/angular/note/note.single.view.html',
    controller: 'singleNoteController'
  });
});

app.controller('settingsController', function ($scope, $stateParams, $timeout) {

  $scope.sidebar = $stateParams.currentSidebar;
  $scope.error = null;
  $scope.changingMasterPass = false;
  $scope.success = null;

  $scope.showForm = function () {
    $scope.changingMasterPass = !$scope.changingMasterPass;
  };

  $scope.changeMasterPassword = function (currentPassword, newPassword1, newPassword2, newPassword3) {
    if (currentPassword === undefined) {
      $scope.changingMasterPass = false;
      return;
    }
    if (validate(currentPassword)) {
      if (newPassword1.length >= 8) {
        if (newPassword1 === newPassword2 && newPassword1 === newPassword3 && newPassword3 === newPassword3) {
          generateSecret(newPassword1);
          encryptFile(masterObj, newPassword1).then(function () {
            return decryptFile(newPassword1);
          }).then(function () {
            masterPass = newPassword1;
            $scope.success = "Successfully updated password!";
            $scope.changingMasterPass = false;
            $scope.currentPassword = '';
            $scope.newPassword1 = '';
            $scope.newPassword2 = '';
            $scope.newPassword3 = '';
            $timeout(function () {
              $scope.success = null;
            }, 2000);
            $scope.$evalAsync();
          });
        } else {
          $scope.error = 'New passwords don\'t match!';
          $timeout(function () {
            $scope.error = null;
          }, 2000);
        }
      } else {
        $scope.error = "New password must be at least 8 characters";
        $timeout(function () {
          $scope.error = null;
        }, 2000);
      }
    } else {
      $scope.error = 'Current password doesn\'t match!';
      $timeout(function () {
        $scope.error = null;
      }, 2000);
    }
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: 'build/angular/settings/settings.view.html',
    controller: 'settingsController',
    params: { currentSidebar: null }
  });
});

var username = require('username');
app.controller('sidebarController', function ($rootScope, $scope) {
  $scope.masterObj = masterObj;
  $scope.username;

  username().then(function (username) {
    $scope.username = username;
    $scope.$evalAsync();
  });
});

var fs = require('fs');

app.directive('sidebarItem', function ($state) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: 'build/angular/sidebar/sidebar.item.html',
    link: function link(scope) {
      scope.secondaryProp = $state.current.name === 'login' ? scope.item.username : $state.current.name === 'creditCard' ? scope.item.cardNumber : scope.item.data;
      scope.getImg = function (str) {
        var fileNames = fs.readdirSync(__dirname + '/build/images/icons/');
        var strArr = str.toLowerCase().split(' ');
        var matches = strArr.filter(function (word) {
          return fileNames.indexOf(word += '.png') > -1;
        });
        return matches.length > 0 ? 'build/images/icons/' + matches[0] + '.png' : 'build/images/icons/key.png';
      };
    }
  };
});

app.directive('sidebar', function ($state) {
  return {
    restrict: 'E',
    scope: {
      navItem: '='
    },
    controller: 'sidebarController',
    templateUrl: 'build/angular/sidebar/sidebar.html',
    link: function link(scope) {
      scope.singleView = function (id) {
        var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '');
        $state.go(stateParent + '.single', { id: id });
      };

      scope.addItem = function () {
        var stateParent = $state.current.name.replace(/\.single/g, '').replace(/\.add/g, '');
        $state.go(stateParent + '.add');
      };

      scope.settingsView = function (navItem, second) {
        $state.go('settings', { currentSidebar: navItem });
      };
    }
  };
});

var settings = require('electron-settings');
var remote = require('electron').remote;
var dialog = remote.dialog;

app.controller('dropboxController', function ($scope) {
  function setScope() {
    settings.get('dropboxPath').then(function (val) {
      if (val) {
        $scope.dropboxAuthenticated = true;
        $scope.buttonText = "Disconnect From Dropbox";
      } else {
        $scope.dropboxAuthenticated = false;
        $scope.buttonText = "Select Dropbox Folder";
      }
      $scope.$evalAsync();
    });
  }
  setScope();

  $scope.dropboxAuth = function () {
    if ($scope.dropboxAuthenticated) {
      settings.delete('dropboxPath').then(function () {
        return setScope();
      });
    } else {
      var dropboxPath = dialog.showOpenDialog({ title: 'Please select your Dropbox folder', properties: ['openDirectory'] });
      settings.set('dropboxPath', dropboxPath[0]).then(function () {
        return setScope();
      });
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNyZWRpdGNhcmQvY3JlZGl0Q2FyZC5jb250cm9sbGVyLmpzIiwiY3JlZGl0Y2FyZC9jcmVkaXRjYXJkLnN0YXRlLmpzIiwiYXV0aGVudGljYXRlL2F1dGhlbnRpY2F0ZS5jb250cm9sbGVyLmpzIiwiYXV0aGVudGljYXRlL2F1dGhlbnRpY2F0ZS5zdGF0ZS5qcyIsImhvbWUvaG9tZS5zdGF0ZS5qcyIsImlkZW50aXR5L2lkZW50aXR5LmNvbnRyb2xsZXIuanMiLCJpZGVudGl0eS9pZGVudGl0eS5zdGF0ZS5qcyIsImxvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJsb2dpbi9sb2dpbi5zdGF0ZS5qcyIsImxvZ2lucy9sb2dpbnMuY29udHJvbGxlci5qcyIsIm5hdi9uYXYuZGlyZWN0aXZlLmpzIiwibm90ZS9ub3RlLmNvbnRyb2xsZXIuanMiLCJub3RlL25vdGUuc3RhdGUuanMiLCJzZXR0aW5ncy9zZXR0aW5ncy5jb250cm9sbGVyLmpzIiwic2V0dGluZ3Mvc2V0dGluZ3Muc3RhdGUuanMiLCJzaWRlYmFyL3NpZGViYXIuY29udHJvbGxlci5qcyIsInNpZGViYXIvc2lkZWJhci5kaXJlY3RpdmUuanMiLCJzZXR0aW5ncy9kcm9wYm94L2Ryb3Bib3guY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQUEsTUFBQSxRQUFBLE1BQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUEsUUFBQSxpQkFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLElBQUEsTUFBQSxDQUFBLFVBQUEsa0JBQUEsRUFBQTtBQUNBO0FBQ0EscUJBQUEsU0FBQSxDQUFBLEdBQUE7QUFFQSxDQUpBOztBQ0ZBLElBQUEsVUFBQSxDQUFBLHNCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxTQUFBLFFBQUEsR0FBQSxVQUFBLFVBQUE7QUFDQSxDQUZBOztBQUlBLElBQUEsVUFBQSxDQUFBLDRCQUFBLEVBQUEsVUFBQSxNQUFBLEVB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OztBQ1JBLElBQUEsVUFBQSxDQUFBLGlCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxVQUFBLEdBQUEsQ0FBQSxzQkFBQTtBQUNBLFNBQUEsUUFBQSxHQUFBLFVBQUEsS0FBQTtBQUNBLENBSEE7O0FBS0EsSUFBQSxVQUFBLENBQUEsdUJBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQSxZQUFBLEVBQUE7QUFDQSxTQUFBLE9BQUEsR0FBQSxVQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUE7QUFBQSxXQUFBLEtBQUEsRUFBQSxJQUFBLGFBQUEsRUFBQTtBQUFBLEdBQUEsRUFBQSxDQUFBLENBQUE7QUFDQSxTQUFBLFVBQUEsR0FBQSxLQUFBO0FBQ0EsU0FBQSxRQUFBLEdBQUEsWUFBQTtBQUNBLFdBQUEsVUFBQSxHQUFBLENBQUEsT0FBQSxVQUFBO0FBQ0EsR0FGQTtBQUdBLENBTkE7O0FBU0EsSUFBQSxVQUFBLENBQUEsb0JBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLFVBQUEsRUFBQTs7QUFFQSxTQUFBLEtBQUEsR0FBQTtBQUNBLFVBQUEsSUFEQTtBQUVBLGNBQUEsSUFGQTtBQUdBLGNBQUE7QUFIQSxHQUFBOztBQU1BLFNBQUEsZ0JBQUEsR0FBQSxZQUFBOztBQUVBLFdBQUEsS0FBQSxDQUFBLFFBQUEsR0FBQSxhQUFBLEVBQUEsQ0FBQTtBQUVBLEdBSkE7O0FBTUEsU0FBQSxXQUFBLEdBQUEsWUFBQTtBQUNBLFFBQUEsUUFBQSxVQUFBLEtBQUEsQ0FBQSxVQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBLEVBQUEsR0FBQSxDQUFBO0FBQ0EsV0FBQSxLQUFBLENBQUEsRUFBQSxHQUFBLEtBQUE7QUFDQSxXQUFBLEtBQUEsQ0FBQSxhQUFBLEdBQUEsWUFBQTtBQUFBLGFBQUEsS0FBQSxRQUFBO0FBQUEsS0FBQTtBQUNBLGNBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxPQUFBLEtBQUE7QUFDQSxRQUFBLFlBQUEsUUFBQSxLQUFBLFNBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxVQUFBLENBQUE7QUFDQSxXQUFBLElBQUEsQ0FBQSxpQkFBQSxFQUFBLEVBQUEsTUFBQSxTQUFBLEVBQUE7QUFDQSxlQUFBLFVBQUE7QUFDQSxXQUFBLEVBQUEsQ0FBQSxjQUFBLEVBQUEsRUFBQSxJQUFBLEtBQUEsRUFBQTtBQUNBLEdBVEE7QUFXQSxDQXpCQTs7QUNkQSxJQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGlCQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQSxTQUFBLFFBREE7QUFFQSxpQkFBQSxxQ0FGQTtBQUdBLGdCQUFBO0FBSEEsR0FBQTtBQUtBLENBTkE7O0FBU0EsSUFBQSxNQUFBLENBQUEsVUFBQSxjQUFBLEVBQUE7QUFDQSxpQkFBQSxLQUFBLENBQUEsY0FBQSxFQUFBO0FBQ0EsU0FBQSxZQURBO0FBRUEsaUJBQUEsNENBRkE7QUFHQSxnQkFBQTtBQUhBLEdBQUE7QUFLQSxDQU5BOztBQVFBLElBQUEsTUFBQSxDQUFBLFVBQUEsY0FBQSxFQUFBO0FBQ0EsaUJBQUEsS0FBQSxDQUFBLFdBQUEsRUFBQTtBQUNBLFNBQUEsWUFEQTtBQUVBLGlCQUFBLHlDQUZBO0FBR0EsZ0JBQUE7QUFIQSxHQUFBO0FBS0EsQ0FOQTs7QUNqQkEsSUFBQSxVQUFBLENBQUEsa0JBQUEsRUFBQSxVQUFBLE1BQUEsRUFBQTtBQUNBLFVBQUEsR0FBQSxDQUFBLHVCQUFBO0FBQ0EsQ0FGQTs7QUNDQSxJQUFBLFNBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBLFVBQUEsRUFBQTtBQUNBLFNBQUE7QUFDQSxjQUFBLEdBREE7QUFFQSxXQUFBLEVBRkE7QUFHQSxpQkFBQSxzQ0FIQTtBQUlBLFVBQUEsY0FBQSxLQUFBLEVBQUE7QUFDQSxZQUFBLE1BQUEsR0FBQSxJQUFBO0FBQ0EsWUFBQSxJQUFBLEdBQUEsS0FBQTtBQUNBLFlBQUEsUUFBQSxHQUFBLFVBQUEsR0FBQSxFQUFBO0FBQ0Esb0JBQUEsVUFBQSxFQUNBLElBREEsQ0FDQSxVQUFBLEdBQUEsRUFBQTtBQUNBLHNCQUFBLEdBQUE7QUFDQSxxQkFBQSxVQUFBO0FBQ0EsU0FKQTtBQUtBLFlBQUEsT0FBQSxNQUFBLE1BQUEsRUFBQTtBQUNBLFlBQUEsY0FBQSxLQUFBLFNBQUEsQ0FBQSxFQUFBLE1BQUEsT0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsYUFBQSxFQUFBLEVBQUEsQ0FBQTtBQUNBLGVBQUEsY0FBQSxDQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsRUFBQSxXQUFBO0FBQ0EsWUFBQSxPQUFBLGNBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtBQUNBLGdCQUFBLE1BQUEsR0FBQSxHQUFBO0FBQ0EsY0FBQSxXQUFBLE9BQUEsY0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBLGNBQUEsV0FBQSxLQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUE7QUFDQSxpQkFBQSxFQUFBLENBQUEsU0FBQSxJQUFBLEVBQUEsRUFBQSxJQUFBLFNBQUEsRUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBLGNBQUEsTUFBQSxHQUFBLEdBQUE7QUFDQSxjQUFBLElBQUEsR0FBQSxLQUFBO0FBQ0EsZUFBQSxFQUFBLENBQUEsR0FBQTtBQUNBLE9BbkJBO0FBb0JBLFlBQUEsZ0JBQUEsR0FBQSxZQUFBO0FBQ0EsZ0JBQUEsR0FBQSxDQUFBLFNBQUE7QUFDQSxjQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsSUFBQTtBQUNBLE9BSEE7QUFJQTtBQS9CQSxHQUFBO0FBaUNBLENBbENBOztBQ0RBLElBQUEsVUFBQSxDQUFBLGdCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxTQUFBLEtBQUEsR0FBQSxVQUFBLElBQUE7QUFDQSxDQUZBOztBQUlBLElBQUEsVUFBQSxDQUFBLHNCQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBO0FBQ0EsU0FBQSxJQUFBLEdBQUEsVUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBO0FBQUEsV0FBQSxLQUFBLEVBQUEsSUFBQSxhQUFBLEVBQUE7QUFBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBO0FB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QUFBLG9CQUFBLEdBQUEsS0FBQTtBQUNBLGVBQUEsVUFBQSxHQUFBLHVCQUFBO0FBQ0E7QUFDQSxhQUFBLFVBQUE7QUFDQSxLQVRBO0FBVUE7QUFDQTs7QUFFQSxTQUFBLFdBQUEsR0FBQSxZQUFBO0FBQ0EsUUFBQSxPQUFBLG9CQUFBLEVBQUE7QUFDQSxlQUFBLE1BQUEsQ0FBQSxhQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsZUFBQSxVQUFBO0FBQUEsT0FBQTtBQUNBLEtBRkEsTUFFQTtBQUNBLFVBQUEsY0FBQSxPQUFBLGNBQUEsQ0FBQSxFQUFBLE9BQUEsbUNBQUEsRUFBQSxZQUFBLENBQUEsZUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUNBLGVBQUEsR0FBQSxDQUFBLGFBQUEsRUFBQSxZQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQTtBQUFBLGVBQUEsVUFBQTtBQUFBLE9BQUE7QUFDQTtBQUNBLEdBUEE7QUFRQSxDQXZCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NyeXB0b1Bhc3MnLCBbJ3VpLnJvdXRlcicsIHJlcXVpcmUoJ2FuZ3VsYXItYW5pbWF0ZScpXSlcbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxufSk7XG4iLCJhcHAuY29udHJvbGxlcignY3JlZGl0Q2FyZENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5jcmVkaXRDYXJkO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ3NpbmdsZUNyZWRpdENhcmRDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpe1xuICAkc2NvcGUuYWNjb3VudCA9IG1hc3Rlck9iai5jcmVkaXRDYXJkLmZpbHRlcihpbmZvID0+IGluZm8uaWQgPT0gJHN0YXRlUGFyYW1zLmlkKVswXVxuICAkc2NvcGUudXBkYXRlSW5mbyA9IGZhbHNlO1xuICAkc2NvcGUuc2hvd0Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgJHNjb3BlLnVwZGF0ZUluZm8gPSAhJHNjb3BlLnVwZGF0ZUluZm87XG4gIH1cbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjcmVkaXRDYXJkJywge1xuICAgIHVybDogJy9jcmVkaXRDYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvY3JlZGl0Q2FyZC9jcmVkaXRDYXJkLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2NyZWRpdENhcmRDb250cm9sbGVyJ1xuICB9KVxufSlcblxuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY3JlZGl0Q2FyZC5zaW5nbGUnLCB7XG4gICAgdXJsOiAnL2NyZWRpdENhcmQvOmlkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvY3JlZGl0Y2FyZC9jcmVkaXRDYXJkLnNpbmdsZS52aWV3Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdzaW5nbGVDcmVkaXRDYXJkQ29udHJvbGxlcidcbiAgfSlcbn0pXG4iLCJcbi8vIHJlbWluZGVyIG9mIGZ1bmN0aW9ucyBhbmQgdXRpbGl0aWVzIGF2YWlsYWJsZSB0aHJvdWdob3V0IGFwcGxpY2F0aW9uXG4vLyB2YXIgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZW5jcnlwdC5maWxlLmpzJylcbi8vIHZhciB2YWxpZGF0ZSA9IHV0aWxzLnZhbGlkYXRlO1xuLy8gdmFyIGRlY3J5cHRGaWxlID0gdXRpbHMuZGVjcnlwdEZpbGVcbi8vIHZhciBlbmNyeXB0RmlsZSA9IHV0aWxzLmVuY3J5cHRGaWxlXG4vLyB2YXIgbWFzdGVyT2JqO1xuXG5hcHAuY29udHJvbGxlcignYXV0aENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJHJvb3RTY29wZSl7XG5cblx0JHNjb3BlLm1hc3RlciA9IG51bGw7XG5cblx0JHNjb3BlLmF1dGhlbnRpY2F0ZVBhc3N3b3JkID0gZnVuY3Rpb24gKG1hc3Rlcil7XG5cdFx0dmFyIGlzVmFsaWQgPSB2YWxpZGF0ZShtYXN0ZXIpXG5cdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHQkc2NvcGUubWFzdGVyID0gbnVsbFxuXHRcdFx0cmV0dXJuXG5cdFx0fSBlbHNlIGlmIChpc1ZhbGlkKXtcblx0XHRcdGRlY3J5cHRGaWxlKG1hc3Rlcilcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChvYmope1xuXHRcdFx0XHRtYXN0ZXJPYmogPSBvYmpcblx0XHRcdFx0bWFzdGVyUGFzcyA9IG1hc3Rlcjtcblx0XHRcdFx0JHJvb3RTY29wZS52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0XHQkcm9vdFNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUnKVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXV0aCcsIHtcbiAgICB1cmw6ICcvJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvYXV0aGVudGljYXRlL2F1dGhlbnRpY2F0ZS52aWV3Lmh0bWwnLFxuICAgIGNvbnRyb2xsZXI6ICdhdXRoQ29udHJvbGxlcidcbiAgfSlcblxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgdXJsOiAnL2hvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9ob21lL2hvbWUudmlldy5odG1sJyxcbiAgICAvLyBjb250cm9sbGVyOiAnYXV0aENvbnRyb2xsZXInXG4gIH0pXG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignaWRlbnRpdHlDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAkc2NvcGUuaWRlbnRpdHkgPSBtYXN0ZXJPYmouaWRlbnRpdHk7XG59KVxuXG5hcHAuY29udHJvbGxlcignc2luZ2xlSWRlbnRpdHlDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpe1xuICAkc2NvcGUuaWRlbnRpdHkgPSBtYXN0ZXJPYmouaWRlbnRpdHkuZmlsdGVyKGluZm8gPT4gaW5mby5pZCA9PSAkc3RhdGVQYXJhbXMuaWQpWzBdXG4gICRzY29wZS51cGRhdGVJbmZvID0gZmFsc2U7XG4gICRzY29wZS5zaG93Rm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkc2NvcGUudXBkYXRlSW5mbyA9ICEkc2NvcGUudXBkYXRlSW5mbztcbiAgfVxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2lkZW50aXR5Jywge1xuICAgIHVybDogJy9pZGVudGl0eScsXG4gICAgdGVtcGxhdGVVcmw6ICdidWlsZC9hbmd1bGFyL2lkZW50aXR5L2lkZW50aXR5LnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2lkZW50aXR5Q29udHJvbGxlcidcbiAgfSlcbn0pXG5cbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2lkZW50aXR5LnNpbmdsZScsIHtcbiAgICB1cmw6ICcvaWRlbnRpdHkvOmlkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvaWRlbnRpdHkvaWRlbnRpdHkuc2luZ2xlLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ3NpbmdsZUlkZW50aXR5Q29udHJvbGxlcidcbiAgfSlcbn0pXG4iLCJhcHAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgY29uc29sZS5sb2coJ2luIGxvZ2lucyBjb250cm9sbGVyJyk7XG4gICRzY29wZS5hY2NvdW50cyA9IG1hc3Rlck9iai5sb2dpbjtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdzaW5nbGVMb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcyl7XG4gICRzY29wZS5hY2NvdW50ID0gbWFzdGVyT2JqLmxvZ2luLmZpbHRlcihpbmZvID0+IGluZm8uaWQgPT0gJHN0YXRlUGFyYW1zLmlkKVswXVxuICAkc2NvcGUudXBkYXRlSW5mbyA9IGZhbHNlO1xuICAkc2NvcGUuc2hvd0Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgJHNjb3BlLnVwZGF0ZUluZm8gPSAhJHNjb3BlLnVwZGF0ZUluZm87XG4gIH1cbn0pXG5cblxuYXBwLmNvbnRyb2xsZXIoJ2FkZExvZ2luQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyb290U2NvcGUpe1xuXG5cdCRzY29wZS5sb2dpbiA9IHtcblx0XHRuYW1lOiBudWxsLFxuXHRcdHVzZXJuYW1lOiBudWxsLFxuXHRcdHBhc3N3b3JkOiBudWxsXG5cdH1cblxuXHQkc2NvcGUuZ2VuZXJhdGVQYXNzd29yZCA9IGZ1bmN0aW9uICgpe1xuXG5cdFx0JHNjb3BlLmxvZ2luLnBhc3N3b3JkID0gY3JlYXRlUmFuZG9tKDIwKVxuXG5cdH1cblxuXHQkc2NvcGUuY3JlYXRlTG9naW4gPSBmdW5jdGlvbiAoKXtcblx0XHR2YXIgbmV3SWQgPSBtYXN0ZXJPYmoubG9naW5bbWFzdGVyT2JqLmxvZ2luLmxlbmd0aCAtIDFdLmlkICsgMVxuXHRcdCRzY29wZS5sb2dpbi5pZCA9IG5ld0lkXG5cdFx0JHNjb3BlLmxvZ2luLnNlY29uZGFyeVByb3AgPSBmdW5jdGlvbiAoKXsgcmV0dXJuIHRoaXMudXNlcm5hbWUgfVxuXHRcdG1hc3Rlck9iai5sb2dpbi5wdXNoKCRzY29wZS5sb2dpbilcblx0XHR2YXIgZW5jcnlwdGVkID0gZW5jcnlwdChKU09OLnN0cmluZ2lmeShtYXN0ZXJPYmopLCBtYXN0ZXJQYXNzKVxuXHRcdHNvY2tldC5lbWl0KCdhZGRGcm9tRWxlY3Ryb24nLCB7ZGF0YTogZW5jcnlwdGVkfSlcblx0XHQkcm9vdFNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4uc2luZ2xlJywge2lkOiBuZXdJZH0pXG5cdH1cblxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuICAgIHVybDogJy9sb2dpbicsXG4gICAgdGVtcGxhdGVVcmw6ICdidWlsZC9hbmd1bGFyL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcbiAgfSlcbn0pXG5cblxuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4uc2luZ2xlJywge1xuICAgIHVybDogJy9sb2dpbi86aWQnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9sb2dpbi9sb2dpbi5zaW5nbGUudmlldy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnc2luZ2xlTG9naW5Db250cm9sbGVyJ1xuICB9KVxufSlcblxuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4uYWRkJywge1xuICAgIHVybDogJy9sb2dpbi9hZGQnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9sb2dpbi9sb2dpbi5hZGQudmlldy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnYWRkTG9naW5Db250cm9sbGVyJ1xuICB9KVxufSlcbiIsImFwcC5jb250cm9sbGVyKCdsb2dpbnNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgY29uc29sZS5sb2coJ2luIGxvZ2lucyBjb250cm9sbGVzcicpO1xufSlcbiIsIlxuYXBwLmRpcmVjdGl2ZSgnbmF2QmFyJywgZnVuY3Rpb24oJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRyb290U2NvcGUpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHt9LFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9uYXYvbmF2LmRpcmVjdGl2ZS5odG1sJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSl7XG4gICAgICBzY29wZS5hY3RpdmUgPSBudWxsO1xuICAgICAgc2NvcGUuc2hvdyA9IGZhbHNlXG4gICAgICBzY29wZS5uYXZDbGljayA9IGZ1bmN0aW9uKHN0cil7XG4gICAgICBcdGRlY3J5cHRGaWxlKG1hc3RlclBhc3MpXG4gICAgICBcdC50aGVuKGZ1bmN0aW9uIChvYmope1xuXHRcdFx0XHRcdG1hc3Rlck9iaiA9IG9ialxuXHRcdFx0XHRcdCRyb290U2NvcGUuJGV2YWxBc3luYygpXG5cdFx0XHRcdH0pXG4gICAgICBcdGlmIChzdHIgPT0gc2NvcGUuYWN0aXZlKSByZXR1cm5cbiAgICAgIFx0dmFyIHN0b3JlZFN0YXRlID0gSlNPTi5zdHJpbmdpZnkoe25hbWU6ICRzdGF0ZS5jdXJyZW50Lm5hbWUsIGlkOiAkc3RhdGVQYXJhbXMuaWR9KVxuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzY29wZS5hY3RpdmUsIHN0b3JlZFN0YXRlKVxuICAgICAgXHRpZiAod2luZG93LnNlc3Npb25TdG9yYWdlW3N0cl0pe1xuICAgICAgXHRcdHNjb3BlLmFjdGl2ZSA9IHN0clxuICAgICAgXHRcdHZhciBzdGF0ZVN0ciA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVtzdHJdXG4gICAgICBcdFx0dmFyIHN0YXRlT2JqID0gSlNPTi5wYXJzZShzdGF0ZVN0cilcbiAgICAgIFx0XHQkc3RhdGUuZ28oc3RhdGVPYmoubmFtZSwge2lkOiBzdGF0ZU9iai5pZH0pXG4gICAgICBcdFx0cmV0dXJuXG4gICAgICBcdH1cbiAgICAgICAgc2NvcGUuYWN0aXZlID0gc3RyO1xuICAgICAgICBzY29wZS5zaG93ID0gZmFsc2U7XG4gICAgICAgICRzdGF0ZS5nbyhzdHIpXG4gICAgICB9XG4gICAgICBzY29wZS5zaG93SGlkZURyb3Bkb3duID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcbiAgICAgICAgc2NvcGUuc2hvdyA9ICFzY29wZS5zaG93O1xuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImFwcC5jb250cm9sbGVyKCdub3RlQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgJHNjb3BlLm5vdGVzID0gbWFzdGVyT2JqLm5vdGU7XG59KVxuXG5hcHAuY29udHJvbGxlcignc2luZ2xlTm90ZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcyl7XG4gICRzY29wZS5ub3RlID0gbWFzdGVyT2JqLm5vdGUuZmlsdGVyKGluZm8gPT4gaW5mby5pZCA9PSAkc3RhdGVQYXJhbXMuaWQpWzBdXG4gICRzY29wZS51cGRhdGVJbmZvID0gZmFsc2U7XG4gICRzY29wZS5zaG93Rm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAkc2NvcGUudXBkYXRlSW5mbyA9ICEkc2NvcGUudXBkYXRlSW5mbztcbiAgfVxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25vdGUnLCB7XG4gICAgdXJsOiAnL25vdGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9ub3RlL25vdGUudmlldy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnbm90ZUNvbnRyb2xsZXInXG4gIH0pXG59KVxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdub3RlLnNpbmdsZScsIHtcbiAgICB1cmw6ICcvbm90ZS86aWQnLFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9ub3RlL25vdGUuc2luZ2xlLnZpZXcuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ3NpbmdsZU5vdGVDb250cm9sbGVyJ1xuICB9KVxufSlcbiIsImFwcC5jb250cm9sbGVyKCdzZXR0aW5nc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgJHRpbWVvdXQpe1xuXG4gICRzY29wZS5zaWRlYmFyID0gJHN0YXRlUGFyYW1zLmN1cnJlbnRTaWRlYmFyO1xuICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAkc2NvcGUuY2hhbmdpbmdNYXN0ZXJQYXNzID0gZmFsc2U7XG4gICRzY29wZS5zdWNjZXNzID0gbnVsbDtcblxuICAkc2NvcGUuc2hvd0Zvcm0gPSBmdW5jdGlvbigpe1xuICAgICRzY29wZS5jaGFuZ2luZ01hc3RlclBhc3MgPSAhJHNjb3BlLmNoYW5naW5nTWFzdGVyUGFzcztcbiAgfVxuXG4gICRzY29wZS5jaGFuZ2VNYXN0ZXJQYXNzd29yZCA9IGZ1bmN0aW9uKGN1cnJlbnRQYXNzd29yZCwgbmV3UGFzc3dvcmQxLCBuZXdQYXNzd29yZDIsIG5ld1Bhc3N3b3JkMyl7XG4gICAgaWYoY3VycmVudFBhc3N3b3JkID09PSB1bmRlZmluZWQpe1xuICAgICAgJHNjb3BlLmNoYW5naW5nTWFzdGVyUGFzcyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZih2YWxpZGF0ZShjdXJyZW50UGFzc3dvcmQpKXtcbiAgICAgIGlmKG5ld1Bhc3N3b3JkMS5sZW5ndGggPj0gOCl7XG4gICAgICAgIGlmKG5ld1Bhc3N3b3JkMSA9PT0gbmV3UGFzc3dvcmQyICYmIG5ld1Bhc3N3b3JkMSA9PT0gbmV3UGFzc3dvcmQzICYmIG5ld1Bhc3N3b3JkMyA9PT0gbmV3UGFzc3dvcmQzKXtcbiAgICAgICAgICBnZW5lcmF0ZVNlY3JldChuZXdQYXNzd29yZDEpO1xuICAgICAgICAgIGVuY3J5cHRGaWxlKG1hc3Rlck9iaiwgbmV3UGFzc3dvcmQxKVxuICAgICAgICAgIC50aGVuKCgpID0+IGRlY3J5cHRGaWxlKG5ld1Bhc3N3b3JkMSkpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIFx0bWFzdGVyUGFzcyA9IG5ld1Bhc3N3b3JkMTtcbiAgICAgICAgICAgICRzY29wZS5zdWNjZXNzID0gXCJTdWNjZXNzZnVsbHkgdXBkYXRlZCBwYXNzd29yZCFcIjtcbiAgICAgICAgICAgICRzY29wZS5jaGFuZ2luZ01hc3RlclBhc3MgPSBmYWxzZVxuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRQYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLm5ld1Bhc3N3b3JkMSA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLm5ld1Bhc3N3b3JkMiA9ICcnO1xuICAgICAgICAgICAgJHNjb3BlLm5ld1Bhc3N3b3JkMyA9ICcnO1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJHNjb3BlLnN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzY29wZS5lcnJvciA9ICdOZXcgcGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2ghJ1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5lcnJvciA9IFwiTmV3IHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzXCJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgICB9LCAyMDAwKVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICRzY29wZS5lcnJvciA9ICdDdXJyZW50IHBhc3N3b3JkIGRvZXNuXFwndCBtYXRjaCEnXG4gICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgfSwgMjAwMClcbiAgICB9XG4gIH1cblxuXG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc2V0dGluZ3MnLCB7XG4gICAgdXJsOiAnL3NldHRpbmdzJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvc2V0dGluZ3Mvc2V0dGluZ3Mudmlldy5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnc2V0dGluZ3NDb250cm9sbGVyJyxcbiAgICBwYXJhbXM6IHtjdXJyZW50U2lkZWJhcjogbnVsbH1cbiAgfSlcbn0pXG4iLCJsZXQgdXNlcm5hbWUgPSByZXF1aXJlKCd1c2VybmFtZScpXG5hcHAuY29udHJvbGxlcignc2lkZWJhckNvbnRyb2xsZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUpe1xuICAkc2NvcGUubWFzdGVyT2JqID0gbWFzdGVyT2JqO1xuICAkc2NvcGUudXNlcm5hbWU7XG5cbiAgdXNlcm5hbWUoKS50aGVuKHVzZXJuYW1lID0+IHtcbiAgICAkc2NvcGUudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICAkc2NvcGUuJGV2YWxBc3luYygpXG4gIH0pXG59KTtcbiIsInZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmFwcC5kaXJlY3RpdmUoJ3NpZGViYXJJdGVtJywgZnVuY3Rpb24oJHN0YXRlKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBpdGVtOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnYnVpbGQvYW5ndWxhci9zaWRlYmFyL3NpZGViYXIuaXRlbS5odG1sJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSl7XG4gICAgICBzY29wZS5zZWNvbmRhcnlQcm9wID0gJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gJ2xvZ2luJyA/IHNjb3BlLml0ZW0udXNlcm5hbWUgOiAkc3RhdGUuY3VycmVudC5uYW1lID09PSAnY3JlZGl0Q2FyZCcgPyBzY29wZS5pdGVtLmNhcmROdW1iZXIgOiBzY29wZS5pdGVtLmRhdGFcbiAgICAgIHNjb3BlLmdldEltZyA9IGZ1bmN0aW9uKHN0cil7XG4gICAgICAgIGxldCBmaWxlTmFtZXMgPSBmcy5yZWFkZGlyU3luYyhfX2Rpcm5hbWUgKycvYnVpbGQvaW1hZ2VzL2ljb25zLycpO1xuICAgICAgICBsZXQgc3RyQXJyID0gc3RyLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgbGV0IG1hdGNoZXMgPSBzdHJBcnIuZmlsdGVyKHdvcmQgPT4gZmlsZU5hbWVzLmluZGV4T2Yod29yZCArPSAnLnBuZycpID4gLTEpXG4gICAgICAgIHJldHVybiBtYXRjaGVzLmxlbmd0aCA+IDAgPyAnYnVpbGQvaW1hZ2VzL2ljb25zLycgKyBtYXRjaGVzWzBdICsgJy5wbmcnIDogJ2J1aWxkL2ltYWdlcy9pY29ucy9rZXkucG5nJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmFwcC5kaXJlY3RpdmUoJ3NpZGViYXInLCBmdW5jdGlvbigkc3RhdGUpe1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIG5hdkl0ZW06ICc9JyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6J3NpZGViYXJDb250cm9sbGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2J1aWxkL2FuZ3VsYXIvc2lkZWJhci9zaWRlYmFyLmh0bWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlKXtcbiAgICBcdHNjb3BlLnNpbmdsZVZpZXcgPSBmdW5jdGlvbiAoaWQpe1xuICAgICAgXHR2YXIgc3RhdGVQYXJlbnQgPSAkc3RhdGUuY3VycmVudC5uYW1lLnJlcGxhY2UoL1xcLnNpbmdsZS9nLCAnJykucmVwbGFjZSgvXFwuYWRkL2csICcnKVxuICAgICAgXHQkc3RhdGUuZ28oc3RhdGVQYXJlbnQgKyAnLnNpbmdsZScsIHtpZDogaWR9KVxuICAgICAgfVxuXG4gICAgXHRzY29wZS5hZGRJdGVtID0gZnVuY3Rpb24gKCl7XG4gICAgXHRcdHZhciBzdGF0ZVBhcmVudCA9ICRzdGF0ZS5jdXJyZW50Lm5hbWUucmVwbGFjZSgvXFwuc2luZ2xlL2csICcnKS5yZXBsYWNlKC9cXC5hZGQvZywgJycpXG4gICAgXHRcdCRzdGF0ZS5nbyhzdGF0ZVBhcmVudCArICcuYWRkJylcbiAgICBcdH1cblxuXG4gICAgICBzY29wZS5zZXR0aW5nc1ZpZXcgPSBmdW5jdGlvbihuYXZJdGVtLCBzZWNvbmQpe1xuICAgICAgICAkc3RhdGUuZ28oJ3NldHRpbmdzJywge2N1cnJlbnRTaWRlYmFyOiBuYXZJdGVtfSlcbiAgICAgIH1cblxuICAgIH1cbiAgfVxufSlcbiIsInZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJ2VsZWN0cm9uLXNldHRpbmdzJyk7XG52YXIgcmVtb3RlID0gcmVxdWlyZSgnZWxlY3Ryb24nKS5yZW1vdGU7XG52YXIgZGlhbG9nID0gcmVtb3RlLmRpYWxvZztcblxuYXBwLmNvbnRyb2xsZXIoJ2Ryb3Bib3hDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKXtcbiAgZnVuY3Rpb24gc2V0U2NvcGUoKXtcbiAgICBzZXR0aW5ncy5nZXQoJ2Ryb3Bib3hQYXRoJykudGhlbih2YWwgPT4ge1xuICAgICAgaWYodmFsKXtcbiAgICAgICAgJHNjb3BlLmRyb3Bib3hBdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLmJ1dHRvblRleHQgPSBcIkRpc2Nvbm5lY3QgRnJvbSBEcm9wYm94XCJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5kcm9wYm94QXV0aGVudGljYXRlZCA9IGZhbHNlXG4gICAgICAgICRzY29wZS5idXR0b25UZXh0ID0gXCJTZWxlY3QgRHJvcGJveCBGb2xkZXJcIlxuICAgICAgfVxuICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKVxuICAgIH0pXG4gIH1cbiAgc2V0U2NvcGUoKVxuXG4gICRzY29wZS5kcm9wYm94QXV0aCA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoJHNjb3BlLmRyb3Bib3hBdXRoZW50aWNhdGVkKXtcbiAgICAgIHNldHRpbmdzLmRlbGV0ZSgnZHJvcGJveFBhdGgnKS50aGVuKCgpID0+IHNldFNjb3BlKCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkcm9wYm94UGF0aCA9IGRpYWxvZy5zaG93T3BlbkRpYWxvZyh7dGl0bGU6ICdQbGVhc2Ugc2VsZWN0IHlvdXIgRHJvcGJveCBmb2xkZXInLCBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXX0pXG4gICAgICBzZXR0aW5ncy5zZXQoJ2Ryb3Bib3hQYXRoJywgZHJvcGJveFBhdGhbMF0pLnRoZW4oKCkgPT4gc2V0U2NvcGUoKSlcbiAgICB9XG4gIH1cbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
