app.config(function($stateProvider) {
  $stateProvider.state('note', {
    url: '/note',
    templateUrl: 'build/angular/note/note.view.html',
    controller: 'noteController'
  })
})

app.config(function($stateProvider) {
  $stateProvider.state('note.single', {
    url: '/note/:id',
    templateUrl: 'build/angular/note/note.single.view.html',
    controller: 'singleNoteController'
  })
})
