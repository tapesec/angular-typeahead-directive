'use strict';

angular.module('myApp.directives', [])

.directive('autofill', function(){
	return {
		restrict: 'E',
		templateUrl: '../partials/directives-templates/typeahead.html',
		scope: {
			label: "@",
			prompt: "@",
			item: "=ngModel",
			search: "&action",
			listeville: "=",
			inputname: "@name",
			style: "@autoStyle",
			pattern: "@"
		},
		require: 'ngModel',
		link:function(scope, elem, attrs, ctrl){
			elem.children("div").children("ul").css('display', 'none');
			scope.$watch('item', function(nVal) {
				
				if(nVal)
					scope.search(nVal);
				
				if( nVal == "" || nVal == undefined) {
					ctrl.$setValidity(scope.inputname, true);
					elem.children("div").children("ul").css('display', 'none');
				} else {
					var regex = new RegExp(scope.pattern);
					if( !regex.test(nVal) ){
						ctrl.$setValidity(scope.inputname, false);
						elem.children("div").children("ul").css('display', 'block');
					} else {
						ctrl.$setValidity(scope.inputname, true);
						elem.children("div").children("ul").css('display', 'none');
					}
				}

				scope.$watch('listeville', function(nVal, oVal){
					scope.listeVilles = [];
					scope.listeVilles = nVal;
				});
			});

			scope.selected = function(viewValue){
				scope.item = viewValue.ville + ' ('+viewValue.cp+')';
				ctrl.$setValidity(scope.inputname, true);
				elem.children("div").children("ul").css('display', 'none');
			}
		}
	}
});