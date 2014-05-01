class App.Monument extends Batman.Model
  @resourceName: 'monuments'
  @persist Batman.LocalStorage
  @encode 'name', 'latitude', 'longitude'
  @validate 'name', presence: true