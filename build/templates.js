Batman.View.store.set('/monuments/edit', '<div class=\"row\"><h2 class=\"page-header col-xs-12\"><span data-hideif=\"monument.isNew\" data-bind=\"&quot;Edit &quot; | append monument.name\"></span><span data-showif=\"monument.isNew\">New Monument</span></h2></div><form data-formfor-m=\"monument\" data-event-submit=\"saveMonument | withArguments monument\"><div data-showif=\"monument.errors.length\" class=\"row\"><div class=\"alert alert-danger\"><h3>Uh oh, this monument has errors!</h3><div class=\"errors\"></div></div></div><div class=\"row\"><div class=\"form-group col-xs-12\"><label>Name</label><input type=\"text\" data-bind=\"monument.name\" class=\"form-control\"/></div></div><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-info\">Click &amp; Drag to Relocate:</p></div></div><div class=\"row\"><div data-view=\"LeafletPointView\" data-view-item=\"monument\" data-view-draggable=\"true\" class=\"col-xs-12\"></div></div><div class=\"row\"><div class=\"col-xs-6\"><input type=\"submit\" value=\"Save\" class=\"btn btn-success\"/></div><div class=\"col-xs-6\"><button data-route=\"routes.root\" class=\"btn\">Cancel</button></div></div></form>');
Batman.View.store.set('/monuments/index', '<div class=\"row\"><h1 class=\"col-xs-12\">All Monuments<small data-bind=\"monuments.length | append &quot;)&quot; | prepend &quot; (&quot;\"></small></h1></div><div class=\"row\"><div class=\"col-xs-6\"><ul class=\"list-unstyled\"><li data-foreach-monument=\"monuments\"><div class=\"row\"><div class=\"col-xs-6\"><p data-bind=\"monument.name\" class=\"lead\"></p></div><div class=\"col-xs-2\"><button data-route=\"routes.monuments[monument].edit\" class=\"btn\">Edit</button></div><div class=\"col-xs-2\"><button data-event-click=\"destroyMonument | withArguments monument\" class=\"btn btn-danger\">Delete</button></div></div></li></ul></div><div class=\"col-xs-6\"><div class=\"well well-small\"><p class=\"text-info\">Click to Edit:</p><div data-view=\"LeafletCollectionPointView\" data-view-collection=\"monuments\"></div></div></div></div><div class=\"row\"><div class=\"col-xs-12\"><a data-route=\"routes.monuments.new\" class=\"btn btn-primary\">New</a></div></div>');