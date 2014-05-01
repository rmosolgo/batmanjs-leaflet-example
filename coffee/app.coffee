Batman.config.pathToApp = window.location.pathname
Batman.config.usePushState = false

class @App extends Batman.App
  @root 'monuments#index'
  @resources 'monuments'
  @on 'run', ->
    @_seedData()


  # Just to make things interesting, make some data
  @_seedData: ->
    total = App.Monument.get('all.length')
    if total is 0
      seeds = {
        "Taj Mahal" : [27.2, 78.0]
        "Washington Monument" : [38.9, -77],
        "Eiffel Tower" : [48.8, 2.3],
        "Great Pyramids" : [29.9, 31.1]
        "Summer Palace" : [39.9, 116.2]
      }
      for name, point of seeds
        m = new App.Monument(name: name, latitude: point[0], longitude: point[1])
        m.save()

$ -> App.run()
