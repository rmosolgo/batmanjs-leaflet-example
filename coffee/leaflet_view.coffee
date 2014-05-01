# LeafletView puts markers on a map for an item or a collection of items.
# Items must have `latitude` and `longitude` accessors, which the view will use
#
# Usage:
#   div data-view='LeafletView' data-view-collection='items'
#   div data-view='LeafletView' data-view-item='singleItem' data-view-draggable='true'
# Options:
#   - `item` : A single item to plot
#   - `collection` : A collection of items to plot
#   - `zoom` : initial zoom
#   - `draggable` : if true, dragging the marker will update the item
#
class App.LeafletView extends Batman.View
  # .leaflet-view must have a fixed height
  html: "<div class='leaflet-view'></div>"

  @option 'collection', 'item', 'zoom', 'draggable'
  DEFAULT_ZOOM: 0
  DEFAULT_MAX_ZOOM: 18
  DEFAULT_MIN_ZOOM: 0
  DEFAULT_HEIGHT: 200
  DEFAULT_LATITUDE: 0
  DEFAULT_LONGITUDE: 0
  # Replace this with your own tile URL
  TILE_URL: 'https://{s}.tiles.mapbox.com/v3/rmosolgo.i36eh459/{z}/{x}/{y}.png'

  @observeOption: (option) ->
    @option(option)
    @::observeOption = option

  constructor: ->
    super
    # We'll use this to add and remove markers
    # when items are added and removed from the collection
    @_itemToMarker = new Batman.Hash
    # Using observeOnce allows it to handle immediate bindings
    # and delayed bindings
    @observeOnce @observeOption, (val, undef) ->
      if @get('leafletReady')
        @startObserving(val)
      else
        @once 'leafletReady', ->
          @startObserving(val)

  # Child classes must implement `startObserving`, which
  # Leaflet view will call when it's ready (in the observer above)
  startObserving: (observeOption) ->
    console.warn "#{@constructor.name} must implement startObserving and setup observeOption!"

  @::on 'viewDidAppear', ->
    # only initialize once...
    return if @leaflet?
    # General leaflet setup:
    $(@node.firstChild).css("height", @DEFAULT_HEIGHT)
    @leaflet = L.map(@node.firstChild)
    @leaflet._batmanView = @
    tileLayer = L.tileLayer(@TILE_URL, {
      attribution: "Map Data from Mapbox"
      maxZoom: @DEFAULT_MAX_ZOOM
      minZoom: @DEFAULT_MIN_ZOOM
    })
    # When ready, notify the observe setup in `constructor`
    tileLayer.once 'load', =>
      @set('leafletReady', true)
      @fire 'leafletReady'
    tileLayer.addTo(@leaflet)
    @_markerLayer = L.featureGroup([])
    @_markerLayer.addTo(@leaflet)
    # Center on an ititial point, otherwise it won't initialize right:
    initialPoint = [
      @DEFAULT_LATITUDE,
      @DEFAULT_LONGITUDE
    ]
    initialZoom = @get('zoom') || @DEFAULT_ZOOM
    @leaflet.setView(initialPoint, initialZoom, animate: false)
    # for debugging :)
    window.lastLeaflet = @leaflet


  addMarker: (item, {centerOnItem, centerOnAll}={}) ->
    point = [item.get('latitude'), item.get('longitude')]
    draggable =  @get('draggable') || false
    marker = L.marker(point, {draggable})
    if draggable?
      marker.on 'dragend', =>
        # Use preventUpdate so that we don't trigger _updateMarker
        @preventUpdate = true
        latLng = marker.getLatLng()
        item.set 'latitude', latLng.lat
        item.set 'longitude', latLng.lng
        if centerOnItem
          @centerOnPoint([latLng.lat, latLng.lng])
        if centerOnAll
          @centerOnAll()
        @preventUpdate = false
    if @onClick?
      # will be called with view as @
      marker.on 'click', (e) =>
        @onClick.call(@, item, marker, e)

    marker.addTo(@_markerLayer)
    @_itemToMarker.set item, marker
    if centerOnItem
      @centerOnPoint(point)
    if centerOnAll
      @centerOnAll()

  centerOnPoint: (point, zoom) ->
    @leaflet.setView(point, zoom ? @leaflet.getZoom())

  centerOnAll: ({resetIfEmpty, animate}={}) ->
    resetIfEmpty ?= true
    animate ?= false
    if @_markerLayer.getLayers()
      bounds = @_markerLayer.getBounds()
      point = bounds.getCenter()
      @leaflet.fitBounds(bounds, {animate})
    else if resetIfEmpty
      @centerOnPoint([0, 0], 0)

  removeMarker: (item, {centerOnItem, centerOnAll}={}) ->
    marker = @_itemToMarker.get(item)
    @_markerLayer.removeLayer(marker)
    @_itemToMarker.unset(item)
    if centerOnAll
      @centerOnAll()

  updateMarker: (item, {centerOnItem, centerOnAll}={}) ->
    return if @preventUpdate
    marker = @_itemToMarker.get(item)
    point = [item.get('latitude'), item.get('longitude')]
    marker.setLatLng(point)
    if centerOnItem
      @centerOnPoint(point)
    if centerOnAll
      @centerOnAll()

  # Do a little extra cleanup...
  die: ->
    @leaflet = null
    @_itemToMarker = null
    super

# Extend LeafletView to bind to a single item with `data-view-item`
class App.LeafletPointView extends App.LeafletView
  @observeOption('item')
  DEFAULT_ZOOM: 6

  startObserving: (item) ->
    @observe 'item.latitude', (nv, ov) ->
      @updateMarker(@get('item'), centerOnItem: true) if nv?
    @observe 'item.longitude', (nv, ov) ->
      @updateMarker(@get('item'), centerOnItem: true) if nv?
    @addMarker(item, centerOnItem: true)

# Extend LeafletView to accept a Batman.Set as `data-view-collection`,
# observing the set and its members for changes
class App.LeafletCollectionPointView extends App.LeafletView
  @observeOption('collection')

  startObserving: (collection) ->
    @_observeCollection(collection)
    @centerOnAll()

  # on click, edit the item!
  onClick: (item, marker, event) ->
    Batman.redirect
      controller: item.constructor.get('resourceName')
      id: item.get('id')
      action: 'edit'

  # SetObserver automatically observes the set, I just have to add handlers for
  # items added, removed and modified.
  _observeCollection: (collection) ->
    @_setObserver = new Batman.SetObserver(collection)
    @_setObserver.observedItemKeys = ['latitude', 'longitude']
    @_setObserver.observerForItemAndKey = (item) =>
      (newValue, oldValue) => @_handleItemModified(item, newValue, oldValue)
    @_setObserver.on 'itemsWereAdded', @_handleItemsAdded.bind(@)
    @_setObserver.on 'itemsWereRemoved', @_handleItemsRemoved.bind(@)

    if existingItems = collection.toArray()
      @_handleItemsAdded(existingItems)
    @_setObserver.startObserving()

  # Only animate the _last_ add or remove, otherwise
  # leaflet goes crazy trying to keep up.
  _handleItemsAdded: (items, indexes) ->
    for item, i in items
      if i is (items.length - 1)
        @addMarker(item, centerOnAll: true)
      else
        @addMarker(item)

  _handleItemsRemoved: (items, indexes) ->
    for item, i in items
      if i is (items.length - 1)
        @removeMarker(item, centerOnAll: true)
      else
        @removeMarker(item)

  _handleItemModified: (item, newValue, oldValue) ->
    @updateMarker(item, centerOnAll: true)

  # Make sure to kill the setObserver...
  die: ->
    @_setObserver?.stopObserving()
    @_setObserver = null
    super
