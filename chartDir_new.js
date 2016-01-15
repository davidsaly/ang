app.directive("chartDirective", function() {
    return {
        //template : "<h1> This is a Directive </h1> "
        // template: "<svg width='850' height='200'></svg>",
        // templateUrl: 'd3ChartDir.html',
        restrict: 'E',
        scope: {data: '='}
        link: function(scope, element){
    	}
    };
});