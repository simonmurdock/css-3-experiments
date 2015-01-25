define(["knockout","underscore","BladeViewModel"], function(ko,_,BladeViewModel) {

	var singleton = function AppViewModel() {

		var s = this;

		s.Blades = ko.observableArray([
			new BladeViewModel('works'),
			new BladeViewModel('profile'),
			new BladeViewModel('contact')]
		);
		s.BackboneRouter = null;
		s.SelectedBlade = ko.observable(s.Blades()[0]);
		s.MenuVisible = ko.observable(false);

		s.ToggleMenu = function() {
			s.MenuVisible(!s.MenuVisible());
		}

		s.SelectBlade = function(blade) {
			_.each(s.Blades(),function(item) { item.Selected(false);})
			blade.Selected(true);		
		}

		s.GetBladeByTitle = function(title) {
			return _.find(s.Blades(),function(item) { return item.Title() == title;});
		}
	}

	return singleton;
});