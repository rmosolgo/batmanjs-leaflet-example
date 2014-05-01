# Using Leaflet.js with Batman.js

This is a proof-of-concept custom `Batman.View` that ties batman.js structures to [leaflet.js](http://leafletjs.com). I've always liked leaflet and I wanted to give it a try!

The whole application is in this gist as `application.coffee`, with the templates preloaded in the compiled `application.js` (implemented in `Gulpfile.js`). You can also see the leaflet view file.

This custom view is an example of:

- integrating external javascript libraries with Batman.js
- exposing options with `@option` in the view definition
- Using a `Batman.SetObserver` in application code