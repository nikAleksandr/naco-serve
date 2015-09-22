$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
};

var script_arr = [
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js',
	'https://rawgit.com/Regaddi/Chart.StackedBar.js/master/src/Chart.StackedBar.js'
];

//declare namespace
var nacoCharts = nacoCharts || {};

$.getMultiScripts(script_arr).done(function() {
    // all scripts loaded.  Now run initialize and chart default function

	//default options for NACo charts.  Can be overridden inline
	nacoCharts.init = function(){
		Chart.defaults.global = {
		    // Boolean - Whether to animate the chart
		    animation: true,

		    // Number - Number of animation steps
		    animationSteps: 100,

		    // String - Animation easing effect
		    // Possible effects are:
		    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
		    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
		    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
		    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
		    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
		    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
		    //  easeOutElastic, easeInCubic]
		    animationEasing: "easeInOutQuart",

		    // Boolean - If we should show the scale at all
		    showScale: true,

		    // Boolean - If we want to override with a hard coded scale
		    scaleOverride: false,

		    // ** Required if scaleOverride is true **
		    // Number - The number of steps in a hard coded scale
		    scaleSteps: null,
		    // Number - The value jump in the hard coded scale
		    scaleStepWidth: null,
		    // Number - The scale starting value
		    scaleStartValue: null,

		    // String - Colour of the scale line
		    scaleLineColor: "rgba(0,0,0,1)",

		    // Number - Pixel width of the scale line
		    scaleLineWidth: 2,

		    // Boolean - Whether to show labels on the scale
		    scaleShowLabels: true,

		    // Interpolated JS string - can access value
		    scaleLabel: "<%=value%>",

		    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
		    scaleIntegersOnly: true,

		    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		    scaleBeginAtZero: true,

		    // String - Scale label font declaration for the scale label
		    scaleFontFamily: "'MuseoSans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		    // Number - Scale label font size in pixels
		    scaleFontSize: 14,

		    // String - Scale label font weight style
		    scaleFontStyle: "normal",

		    // String - Scale label font colour
		    scaleFontColor: "#333",

		    // Boolean - whether or not the chart should be responsive and resize when the browser does.
		    responsive: true,

		    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
		    maintainAspectRatio: true,

		    // Boolean - Determines whether to draw tooltips on the canvas or not
		    showTooltips: true,

		    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
		    customTooltips: false,

		    // Array - Array of string names to attach tooltip events
		    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

		    // String - Tooltip background colour
		    tooltipFillColor: "rgba(0,0,0,0.8)",

		    // String - Tooltip label font declaration for the scale label
		    tooltipFontFamily: "'MuseoSans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		    // Number - Tooltip label font size in pixels
		    tooltipFontSize: 14,

		    // String - Tooltip font weight style
		    tooltipFontStyle: "normal",

		    // String - Tooltip label font colour
		    tooltipFontColor: "#fff",

		    // String - Tooltip title font declaration for the scale label
		    tooltipTitleFontFamily: "'MuseoSans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

		    // Number - Tooltip title font size in pixels
		    tooltipTitleFontSize: 14,

		    // String - Tooltip title font weight style
		    tooltipTitleFontStyle: "bold",

		    // String - Tooltip title font colour
		    tooltipTitleFontColor: "#fff",

		    // Number - pixel width of padding around tooltip text
		    tooltipYPadding: 6,

		    // Number - pixel width of padding around tooltip text
		    tooltipXPadding: 6,

		    // Number - Size of the caret on the tooltip
		    tooltipCaretSize: 8,

		    // Number - Pixel radius of the tooltip border
		    tooltipCornerRadius: 0,

		    // Number - Pixel offset from point x to tooltip edge
		    tooltipXOffset: 10,

		    // String - Template string for single tooltips
		    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

		    // String - Template string for multiple tooltips
		    multiTooltipTemplate: "<%= value %>",

		    // Function - Will fire on animation progression.
		    onAnimationProgress: function(){},

		    // Function - Will fire on animation completion.
		    onAnimationComplete: function(){}
		};

		//line chart default options
		Chart.defaults.Line = {
		    ///Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : false,

		    //String - Colour of the grid lines
		    scaleGridLineColor : "rgba(0,0,0,.05)",

		    //Number - Width of the grid lines
		    scaleGridLineWidth : 1,

		    //Boolean - Whether to show horizontal lines (except X axis)
		    scaleShowHorizontalLines: true,

		    //Boolean - Whether to show vertical lines (except Y axis)
		    scaleShowVerticalLines: true,

		    //Boolean - Whether the line is curved between points
		    bezierCurve : false,

		    //Number - Tension of the bezier curve between points
		    bezierCurveTension : 0.4,

		    //Boolean - Whether to show a dot for each point
		    pointDot : true,

		    //Number - Radius of each point dot in pixels
		    pointDotRadius : 4,

		    //Number - Pixel width of point dot stroke
		    pointDotStrokeWidth : 2,

		    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		    pointHitDetectionRadius : 20,

		    //Boolean - Whether to show a stroke for datasets
		    datasetStroke : true,

		    //Number - Pixel width of dataset stroke
		    datasetStrokeWidth : 2,

		    //Boolean - Whether to fill the dataset with a colour
		    datasetFill : false,

		    //String - A legend template
		    legendTemplate : "<% for (var i=0; i<datasets.length; i++){%><div width=\"100%\" style=\"border-left: solid <%=datasets[i].strokeColor%>; border-width: 15px; padding-bottom: 2px; padding-top: 2px; margin-bottom:10px; padding-left: 15px;\"><p><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p></div><%}%>"
		};
		Chart.defaults.Bar = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero : true,

			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : false,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - If there is a stroke on each bar
			barShowStroke : false,

			//Number - Pixel width of the bar stroke
			barStrokeWidth : 2,

			//Number - Spacing between each of the X value sets
			barValueSpacing : 5,

			//Number - Spacing between data sets within X values
			barDatasetSpacing : 1,

			//String - A legend template
			legendTemplate : "<% for (var i=0; i<datasets.length; i++){%><div width=\"100%\" style=\"border-left: solid <%=datasets[i].fillColor%>; border-width: 15px; padding-bottom: 2px; padding-top: 2px; margin-bottom:10px; padding-left: 15px;\"><p><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p></div><%}%>"
		};
		Chart.defaults.Pie = {
		    //Boolean - Whether we should show a stroke on each segment
		    segmentShowStroke : true,

		    //String - The colour of each segment stroke
		    segmentStrokeColor : "#fff",

		    //Number - The width of each segment stroke
		    segmentStrokeWidth : 2,

		    //Number - The percentage of the chart that we cut out of the middle
		    percentageInnerCutout : 0, // This is 0 for Pie charts

		    //Number - Amount of animation steps
		    animationSteps : 100,

		    //String - Animation easing effect
		    animationEasing : "easeInOutBounce",

		    //Boolean - Whether we animate the rotation of the Doughnut
		    animateRotate : true,

		    //Boolean - Whether we animate scaling the Doughnut from the centre
		    animateScale : true,

		    //String - A legend template
		    legendTemplate : "<% for (var i=0; i<segments.length; i++){%><div width=\"100%\" style=\"border-left: solid <%=segments[i].fillColor%>; border-width: 15px; padding-bottom: 2px; padding-top: 2px; margin-bottom:10px; padding-left: 15px;\"><p><%if(segments[i].label){%><%=segments[i].label%><%}%></p></div><%}%>"
		};
		Chart.defaults.StackedBar = {
		    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		    scaleBeginAtZero : true,

		    //Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : false,

		    //String - Colour of the grid lines
		    scaleGridLineColor : "rgba(0,0,0,.05)",

		    //Number - Width of the grid lines
		    scaleGridLineWidth : 1,

		    //Boolean - If there is a stroke on each bar
		    barShowStroke : false,

		    //Number - Pixel width of the bar stroke
		    barStrokeWidth : 2,

		    //Number - Spacing between each of the X value sets
		    barValueSpacing : 5,

		    //Boolean - Whether bars should be rendered on a percentage base
		    relativeBars : false,

		    //String - A legend template
		    legendTemplate : "<% for (var i=0; i<datasets.length; i++){%><div width=\"100%\" style=\"border-left: solid <%=datasets[i].fillColor%>; border-width: 15px; padding-bottom: 2px; padding-top: 2px; margin-bottom:10px; padding-left: 15px;\"><p><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p></div><%}%>",

		    //Boolean - Hide labels with value set to 0
		    tooltipHideZero: false
		};
	};
	nacoCharts.init();

	nacoCharts.animatedChart = function(id, type, data){
		var inView = false;

		var elem = '#' + id;
		var isScrolledIntoView = function(elem){
		    var docViewTop = $(window).scrollTop();
		    var docViewBottom = docViewTop + $(window).height();

		    var elemTop = $(elem).offset().top;
		    var elemBottom = elemTop + $(elem).height();

		    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
		}

		$(window).scroll(function() {
		    if (isScrolledIntoView(elem)) {
		        if (inView) { return; }
		        inView = true;
		        setTimeout(function(){ 
			        switch(type){
			        	case 'line':
			        		var thisChart = new Chart(document.getElementById(id).getContext("2d")).Line(data);
			        		document.getElementById(id + 'Legend').innerHTML = thisChart.generateLegend();
			        		break
			        	case 'pie':
			        		var thisChart = new Chart(document.getElementById(id).getContext("2d")).Pie(data);
			        		document.getElementById(id + 'Legend').innerHTML = thisChart.generateLegend();
			        		break;
			        	case 'bar':
			        		var thisChart = new Chart(document.getElementById(id).getContext("2d")).Bar(data);
			        		document.getElementById(id + 'Legend').innerHTML = thisChart.generateLegend();
			        		break;
			        	case 'stackedBar':
			        		var thisChart = new Chart(document.getElementById(id).getContext("2d")).StackedBar(data);
			        		document.getElementById(id + 'Legend').innerHTML = thisChart.generateLegend();
			        		break;
			        }
		    	}, 500);
		    } else {
		        inView = false;  
		    }
		});
	};


});