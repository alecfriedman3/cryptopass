app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('logins', {
    url: '/logins',
    templateUrl: 'templates/logins.html',
    controller: 'loginsCtrl'
  })
$urlRouterProvider.otherwise('/page1/home')

});


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('loginDeatails', {
    url: '/loginDeatails',
    templateUrl: 'templates/loginDeatails.html',
    controller: 'loginDeatailsCtrl'
  })
$urlRouterProvider.otherwise('/page1/home')

});

//login add state:
// app.config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider.state('logins', {
//     url: '/logins',
//     templateUrl: 'templates/logins.html',
//     controller: 'loginsCtrl'
//   })
// $urlRouterProvider.otherwise('/page1/home')

// });
