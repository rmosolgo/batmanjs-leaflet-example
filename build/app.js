(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.config.pathToApp = window.location.pathname;

  Batman.config.usePushState = false;

  this.App = (function(_super) {
    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.root('monuments#index');

    App.resources('monuments');

    App.on('run', function() {
      return this._seedData();
    });

    App._seedData = function() {
      var m, name, point, seeds, total, _results;
      total = App.Monument.get('all.length');
      if (total === 0) {
        seeds = {
          "Taj Mahal": [27.2, 78.0],
          "Washington Monument": [38.9, -77],
          "Eiffel Tower": [48.8, 2.3],
          "Great Pyramids": [29.9, 31.1],
          "Summer Palace": [39.9, 116.2]
        };
        _results = [];
        for (name in seeds) {
          point = seeds[name];
          m = new App.Monument({
            name: name,
            latitude: point[0],
            longitude: point[1]
          });
          _results.push(m.save());
        }
        return _results;
      }
    };

    return App;

  })(Batman.App);

  $(function() {
    return App.run();
  });

  App.ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      return ApplicationController.__super__.constructor.apply(this, arguments);
    }

    return ApplicationController;

  })(Batman.Controller);

  App.MonumentsController = (function(_super) {
    __extends(MonumentsController, _super);

    function MonumentsController() {
      return MonumentsController.__super__.constructor.apply(this, arguments);
    }

    MonumentsController.prototype.routingKey = 'monuments';

    MonumentsController.prototype.index = function(params) {
      return this.set('monuments', App.Monument.get('all'));
    };

    MonumentsController.prototype["new"] = function() {
      this.set('monument', new App.Monument({
        latitude: 0,
        longitude: 0
      }));
      return this.render({
        source: 'monuments/edit'
      });
    };

    MonumentsController.prototype.edit = function(params) {
      var monumentId;
      monumentId = +params.id;
      return App.Monument.find(monumentId, (function(_this) {
        return function(err, monument) {
          return _this.set('monument', monument.transaction());
        };
      })(this));
    };

    MonumentsController.prototype.saveMonument = function(monument) {
      return monument.save(function(err, r) {
        if (err != null) {
          throw err;
        }
        return Batman.redirect("/");
      });
    };

    MonumentsController.prototype.destroyMonument = function(monument) {
      return monument.destroy();
    };

    return MonumentsController;

  })(App.ApplicationController);

  App.LeafletView = (function(_super) {
    __extends(LeafletView, _super);

    LeafletView.prototype.html = "<div class='leaflet-view'></div>";

    LeafletView.option('collection', 'item', 'zoom', 'draggable');

    LeafletView.prototype.DEFAULT_ZOOM = 0;

    LeafletView.prototype.DEFAULT_MAX_ZOOM = 18;

    LeafletView.prototype.DEFAULT_MIN_ZOOM = 0;

    LeafletView.prototype.DEFAULT_HEIGHT = 200;

    LeafletView.prototype.DEFAULT_LATITUDE = 0;

    LeafletView.prototype.DEFAULT_LONGITUDE = 0;

    LeafletView.prototype.TILE_URL = 'https://{s}.tiles.mapbox.com/v3/rmosolgo.i36eh459/{z}/{x}/{y}.png';

    LeafletView.observeOption = function(option) {
      this.option(option);
      return this.prototype.observeOption = option;
    };

    function LeafletView() {
      LeafletView.__super__.constructor.apply(this, arguments);
      this._itemToMarker = new Batman.Hash;
      this.observeOnce(this.observeOption, function(val, undef) {
        if (this.get('leafletReady')) {
          return this.startObserving(val);
        } else {
          return this.once('leafletReady', function() {
            return this.startObserving(val);
          });
        }
      });
    }

    LeafletView.prototype.startObserving = function(observeOption) {
      return console.warn("" + this.constructor.name + " must implement startObserving and setup observeOption!");
    };

    LeafletView.prototype.on('viewDidAppear', function() {
      var initialPoint, initialZoom, tileLayer;
      if (this.leaflet != null) {
        return;
      }
      $(this.node.firstChild).css("height", this.DEFAULT_HEIGHT);
      this.leaflet = L.map(this.node.firstChild);
      this.leaflet._batmanView = this;
      tileLayer = L.tileLayer(this.TILE_URL, {
        attribution: "Map Data from Mapbox",
        maxZoom: this.DEFAULT_MAX_ZOOM,
        minZoom: this.DEFAULT_MIN_ZOOM
      });
      tileLayer.once('load', (function(_this) {
        return function() {
          _this.set('leafletReady', true);
          return _this.fire('leafletReady');
        };
      })(this));
      tileLayer.addTo(this.leaflet);
      this._markerLayer = L.featureGroup([]);
      this._markerLayer.addTo(this.leaflet);
      initialPoint = [this.DEFAULT_LATITUDE, this.DEFAULT_LONGITUDE];
      initialZoom = this.get('zoom') || this.DEFAULT_ZOOM;
      this.leaflet.setView(initialPoint, initialZoom, {
        animate: false
      });
      return window.lastLeaflet = this.leaflet;
    });

    LeafletView.prototype.addMarker = function(item, _arg) {
      var centerOnAll, centerOnItem, draggable, marker, point, _ref;
      _ref = _arg != null ? _arg : {}, centerOnItem = _ref.centerOnItem, centerOnAll = _ref.centerOnAll;
      point = [item.get('latitude'), item.get('longitude')];
      draggable = this.get('draggable') || false;
      marker = L.marker(point, {
        draggable: draggable
      });
      if (draggable != null) {
        marker.on('dragend', (function(_this) {
          return function() {
            var latLng;
            _this.preventUpdate = true;
            latLng = marker.getLatLng();
            item.set('latitude', latLng.lat);
            item.set('longitude', latLng.lng);
            if (centerOnItem) {
              _this.centerOnPoint([latLng.lat, latLng.lng]);
            }
            if (centerOnAll) {
              _this.centerOnAll();
            }
            return _this.preventUpdate = false;
          };
        })(this));
      }
      if (this.onClick != null) {
        marker.on('click', (function(_this) {
          return function(e) {
            return _this.onClick.call(_this, item, marker, e);
          };
        })(this));
      }
      marker.addTo(this._markerLayer);
      this._itemToMarker.set(item, marker);
      if (centerOnItem) {
        this.centerOnPoint(point);
      }
      if (centerOnAll) {
        return this.centerOnAll();
      }
    };

    LeafletView.prototype.centerOnPoint = function(point, zoom) {
      return this.leaflet.setView(point, zoom != null ? zoom : this.leaflet.getZoom());
    };

    LeafletView.prototype.centerOnAll = function(_arg) {
      var animate, bounds, point, resetIfEmpty, _ref;
      _ref = _arg != null ? _arg : {}, resetIfEmpty = _ref.resetIfEmpty, animate = _ref.animate;
      if (resetIfEmpty == null) {
        resetIfEmpty = true;
      }
      if (animate == null) {
        animate = false;
      }
      if (this._markerLayer.getLayers()) {
        bounds = this._markerLayer.getBounds();
        point = bounds.getCenter();
        return this.leaflet.fitBounds(bounds, {
          animate: animate
        });
      } else if (resetIfEmpty) {
        return this.centerOnPoint([0, 0], 0);
      }
    };

    LeafletView.prototype.removeMarker = function(item, _arg) {
      var centerOnAll, centerOnItem, marker, _ref;
      _ref = _arg != null ? _arg : {}, centerOnItem = _ref.centerOnItem, centerOnAll = _ref.centerOnAll;
      marker = this._itemToMarker.get(item);
      this._markerLayer.removeLayer(marker);
      this._itemToMarker.unset(item);
      if (centerOnAll) {
        return this.centerOnAll();
      }
    };

    LeafletView.prototype.updateMarker = function(item, _arg) {
      var centerOnAll, centerOnItem, marker, point, _ref;
      _ref = _arg != null ? _arg : {}, centerOnItem = _ref.centerOnItem, centerOnAll = _ref.centerOnAll;
      if (this.preventUpdate) {
        return;
      }
      marker = this._itemToMarker.get(item);
      point = [item.get('latitude'), item.get('longitude')];
      marker.setLatLng(point);
      if (centerOnItem) {
        this.centerOnPoint(point);
      }
      if (centerOnAll) {
        return this.centerOnAll();
      }
    };

    LeafletView.prototype.die = function() {
      this.leaflet = null;
      this._itemToMarker = null;
      return LeafletView.__super__.die.apply(this, arguments);
    };

    return LeafletView;

  })(Batman.View);

  App.LeafletPointView = (function(_super) {
    __extends(LeafletPointView, _super);

    function LeafletPointView() {
      return LeafletPointView.__super__.constructor.apply(this, arguments);
    }

    LeafletPointView.observeOption('item');

    LeafletPointView.prototype.DEFAULT_ZOOM = 6;

    LeafletPointView.prototype.startObserving = function(item) {
      this.observe('item.latitude', function(nv, ov) {
        if (nv != null) {
          return this.updateMarker(this.get('item'), {
            centerOnItem: true
          });
        }
      });
      this.observe('item.longitude', function(nv, ov) {
        if (nv != null) {
          return this.updateMarker(this.get('item'), {
            centerOnItem: true
          });
        }
      });
      return this.addMarker(item, {
        centerOnItem: true
      });
    };

    return LeafletPointView;

  })(App.LeafletView);

  App.LeafletCollectionPointView = (function(_super) {
    __extends(LeafletCollectionPointView, _super);

    function LeafletCollectionPointView() {
      return LeafletCollectionPointView.__super__.constructor.apply(this, arguments);
    }

    LeafletCollectionPointView.observeOption('collection');

    LeafletCollectionPointView.prototype.startObserving = function(collection) {
      this._observeCollection(collection);
      return this.centerOnAll();
    };

    LeafletCollectionPointView.prototype.onClick = function(item, marker, event) {
      return Batman.redirect({
        controller: item.constructor.get('resourceName'),
        id: item.get('id'),
        action: 'edit'
      });
    };

    LeafletCollectionPointView.prototype._observeCollection = function(collection) {
      var existingItems;
      this._setObserver = new Batman.SetObserver(collection);
      this._setObserver.observedItemKeys = ['latitude', 'longitude'];
      this._setObserver.observerForItemAndKey = (function(_this) {
        return function(item) {
          return function(newValue, oldValue) {
            return _this._handleItemModified(item, newValue, oldValue);
          };
        };
      })(this);
      this._setObserver.on('itemsWereAdded', this._handleItemsAdded.bind(this));
      this._setObserver.on('itemsWereRemoved', this._handleItemsRemoved.bind(this));
      if (existingItems = collection.toArray()) {
        this._handleItemsAdded(existingItems);
      }
      return this._setObserver.startObserving();
    };

    LeafletCollectionPointView.prototype._handleItemsAdded = function(items, indexes) {
      var i, item, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        if (i === (items.length - 1)) {
          _results.push(this.addMarker(item, {
            centerOnAll: true
          }));
        } else {
          _results.push(this.addMarker(item));
        }
      }
      return _results;
    };

    LeafletCollectionPointView.prototype._handleItemsRemoved = function(items, indexes) {
      var i, item, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        if (i === (items.length - 1)) {
          _results.push(this.removeMarker(item, {
            centerOnAll: true
          }));
        } else {
          _results.push(this.removeMarker(item));
        }
      }
      return _results;
    };

    LeafletCollectionPointView.prototype._handleItemModified = function(item, newValue, oldValue) {
      return this.updateMarker(item, {
        centerOnAll: true
      });
    };

    LeafletCollectionPointView.prototype.die = function() {
      var _ref;
      if ((_ref = this._setObserver) != null) {
        _ref.stopObserving();
      }
      this._setObserver = null;
      return LeafletCollectionPointView.__super__.die.apply(this, arguments);
    };

    return LeafletCollectionPointView;

  })(App.LeafletView);

  App.Monument = (function(_super) {
    __extends(Monument, _super);

    function Monument() {
      return Monument.__super__.constructor.apply(this, arguments);
    }

    Monument.resourceName = 'monuments';

    Monument.persist(Batman.LocalStorage);

    Monument.encode('name', 'latitude', 'longitude');

    Monument.validate('name', {
      presence: true
    });

    return Monument;

  })(Batman.Model);

}).call(this);
