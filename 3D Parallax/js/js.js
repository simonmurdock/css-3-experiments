var parallx = null;
var demoCount = 0;
	function Parallx() {
		var self = this;
		$("body").mousemove(function(e) {
				parallax.mouseX(e.pageX);
				parallax.mouseY(e.pageY);	
		});

		self.sensitivityMultiplier = ko.observable(0.03);
		self.wrapperOffset = $('#parallxWrapper').offset();
		self.wrapperCenter = {
			x:ko.computed(function() { return self.wrapperOffset.left + ($('#parallxWrapper').width()/2) }, this),
			y:ko.computed(function() { return self.wrapperOffset.top + ($('#parallxWrapper').height()/2) }, this)
		};
		self.mouseX = ko.observable(0);
		self.mouseY = ko.observable(0);
		self.relativeMouse = { 
			x:ko.computed(function() { return (self.mouseX() - self.wrapperCenter.x()) * self.sensitivityMultiplier() }, this),
			y:ko.computed(function() { return ((self.mouseY() - self.wrapperCenter.y()) * -1) * self.sensitivityMultiplier()}, this) 
		};
		self.origin = {
			x:ko.computed(function() { return ((self.mouseX())/$( window ).width()) * 100 }, this),
			y:ko.computed(function() { return ((self.mouseY())/$( window ).height()) * 100 }, this) 
		};
	};