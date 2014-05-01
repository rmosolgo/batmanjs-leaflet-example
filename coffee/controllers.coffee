class App.ApplicationController extends Batman.Controller

class App.MonumentsController extends App.ApplicationController
  routingKey: 'monuments'

  index: (params) ->
    @set 'monuments', App.Monument.get('all')

  new: ->
    @set 'monument', new App.Monument(latitude: 0, longitude: 0)
    @render(source: 'monuments/edit')

  edit: (params) ->
    # force integer from params
    monumentId = +params.id
    App.Monument.find monumentId, (err, monument) =>
      @set 'monument', monument.transaction()

  saveMonument: (monument) ->
    monument.save (err, r) ->
      throw err if err?
      Batman.redirect("/")

  destroyMonument: (monument) -> monument.destroy()
