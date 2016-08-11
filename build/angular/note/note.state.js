app.config(function($stateProvider) {
  $stateProvider.state('note', {
    url: '/note',
    templateUrl: 'build/angular/note/note.view.html',
    controller: 'noteController'
  })
})
