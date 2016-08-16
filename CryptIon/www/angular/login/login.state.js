app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'www/angular/login/login.view.html',
    controller: 'loginsCtrl'
  })
$urlRouterProvider.otherwise('/page1/home')

});

//used to be loginDeatails
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('loginDeatails', {
    // url: '/login/:id',
    // templateUrl: 'build/angular/login/login.single.view.html',
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
