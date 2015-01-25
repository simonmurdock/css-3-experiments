require.config({
  paths: {
  	jquery: 'lib/jquery-2.1.3.min',
  	underscore:'lib/underscore-min',
  	knockout: 'lib/knockout-3.2.0',
  	AppViewModel:'viewmodels/AppViewModel',
  	BladeViewModel:'viewmodels/BladeViewModel'
  }

});

require(["knockout","AppViewModel"],function(ko,appViewModel){

  var vm = appViewModel;
  ko.applyBindings(vm);

});