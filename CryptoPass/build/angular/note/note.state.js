app.config(function($stateProvider) {
  $stateProvider.state('note', {
    url: '/note',
    templateUrl: 'build/angular/note/note.view.html',
    controller: 'noteController'
  })
})

app.config(function($stateProvider) {
  $stateProvider.state('note.add', {
    url: '/note/add',
    templateUrl: 'build/angular/note/note.add.view.html',
    controller: 'addNoteController'
  })
})

app.config(function($stateProvider) {
  $stateProvider.state('note.single', {
    url: '/note/:id',
    templateUrl: 'build/angular/note/note.single.view.html',
    controller: 'singleNoteController'
  })
})
