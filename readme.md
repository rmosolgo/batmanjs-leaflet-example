# Using Leaflet.js with Batman.js

[Live on Bl.ocks](http://bl.ocks.org/rmosolgo/11443841)

This is a proof-of-concept custom `Batman.View` that ties batman.js structures to [leaflet.js](http://leafletjs.com). I've always liked leaflet and I wanted to give it a try!

The whole application is [in this gist](http://bl.ocks.org/rmosolgo/11443841) as `application.coffee`, with the templates preloaded in the compiled `application.js` (implemented in [`Gulpfile.js`](https://github.com/rmosolgo/batmanjs-leaflet-example/blob/master/Gulpfile.js)).

You can also see the [leaflet view file](https://github.com/rmosolgo/batmanjs-leaflet-example/blob/master/coffee/leaflet_view.coffee).

This custom view is an example of:

- Beefy batman.js view for using another JS library
- exposing options with `@option` in the view definition
- using [gulp.js to build batman.js apps](https://github.com/rmosolgo/batmanjs-leaflet-example/blob/master/Gulpfile.js)
- Using a [`Batman.SetObserver` in application code](https://github.com/rmosolgo/batmanjs-leaflet-example/blob/master/coffee/leaflet_view.coffee#L174-L180)