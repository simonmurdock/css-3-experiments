define(["knockout"], function(ko) {

	return function BladeViewModel(name) {
		var s = this;

		s.Title = ko.observable(name);
		s.Selected = ko.observable(false);

		s.ID = ko.computed(function(){
			return s.Title() + 'blade';
		});

		s.Href = ko.computed(function(){
			return '#' + s.Title();
		});

		s.Select = function(data) {
			s.Selected(true);
		};

		s.Init = function(){}

		s.Init();
	}

});