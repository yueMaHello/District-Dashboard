define([  'dojo/_base/declare',
        'jimu/BaseWidget',
        'dojo/Evented',
        'dijit/_OnDijitClickMixin',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/on',
        'dojo/aspect',
        'dojo/_base/lang',
        'dojo/_base/Deferred',
        'dojo/_base/array',
        'dojo/number',
        'dijit/registry',
        'put-selector/put',
        'dojo/dom-class',
        'dojo/_base/Color',
        'dojo/colors',
        'dojox/charting/Chart',
        'dojox/charting/axis2d/Default',
        'dojox/charting/plot2d/Grid',
        'dojox/charting/plot2d/Areas',
        'dojox/charting/action2d/MouseIndicator',
        'dojox/charting/action2d/TouchIndicator',
        'dojox/charting/themes/ThreeD',
        'esri/sniff',
        'esri/request',
        'esri/tasks/Geoprocessor',
        'esri/geometry/Polyline',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/graphic',
        'esri/tasks/FeatureSet',
        'esri/tasks/LinearUnit',
        'esri/geometry/geodesicUtils',
        'esri/geometry/webMercatorUtils',
        'esri/units',
        'jimu/utils',
        'esri/dijit/Measurement',
        'dojo/_base/html',
        'dijit/ProgressBar',
        'jimu/dijit/TabContainer',
        'jimu/dijit/Message',
        'dojo/dom-construct',
        'dojox/gfx/utils',
        'esri/config',
        'esri/tasks/ProjectParameters',
        'esri/SpatialReference',
        'jimu/BaseFeatureAction',
        'jimu/dijit/FeatureActionPopupMenu',
        'jimu/CSVUtils',
        'jimu/dijit/Message',
        'jimu/dijit/LoadingShelter',
        "esri/map"],
    function (declare, BaseWidget, Evented, _OnDijitClickMixin, _WidgetsInTemplateMixin,
              on, aspect, lang, Deferred, array, number, registry,
              put, domClass, Color, colors,
              Chart, Default, Grid, Areas, MouseIndicator, TouchIndicator, ThreeD, esriSniff,
              esriRequest, Geoprocessor, Polyline, SimpleLineSymbol, SimpleMarkerSymbol,
              Graphic, FeatureSet, LinearUnit, geodesicUtils, webMercatorUtils, Units, jimuUtils,
              Measurement, html, ProgressBar, TabContainer, Message, domConstruct,
              gfxUtils, esriConfig, ProjectParameters, SpatialReference, BaseFeatureAction,
              PopupMenu, CSVUtils, Message,    Map) {
        return declare([BaseWidget, _OnDijitClickMixin, _WidgetsInTemplateMixin, Evented], {
            // Custom widget code goes here

            baseClass: 'jimu-widget-customwidget',
            domNode: put('div#profileChartNode'),
            //methods to communication with app container:

            postCreate: function() {
                this.inherited(arguments);

                console.log('postCreate');
            },

            startup: function() {

                this.inherited(arguments);

                var incomeMatrix;
                function buildMatrixLookup(arr) {
                    var lookup = {};
                    //var indexCol = arr[0]
                    //console.log(indexCol);
                    arr.forEach(row => {
                        let ind = row["District"];
                        delete row["District"];
                        lookup[ind] = row;
                    });
                    return lookup;
                }
                d3.csv("./data/autoOwnerShip_by_district.csv",function(data){
                    incomeMatrix = buildMatrixLookup(data);
                    return data;

                });
        
                let districtLayer =this.map.getLayer(this.map.graphicsLayerIds[0]);

                let id = this._chartNode;
                districtLayer.on('click',function(e){
                    let selectedZone;
                    selectedZone = e.graphic.attributes["District"];
                    incomeLine = incomeMatrix[selectedZone];
                
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {

                        var array_keys = ["incomeRange","percentage"];
                        var incomeArray = new Array();
                        incomeArray.push(array_keys);
                        for (var key in incomeLine) {
                            incomeArray.push([key,parseFloat(incomeLine[key])]);
                        }
                        // example data format
                        // let exm = [
                        //     ['Task', 'Hours per Day'],
                        //     ['Work', 8],
                        //     ['Eat', 2],
                        //     ['TV', 4],
                        //     ['Gym', 2],
                        //     ['Sleep', 8]
                        // ]

                        var data = google.visualization.arrayToDataTable(incomeArray);

                        // Optional; add a title and set the width and height of the chart
                        var options = {'title':'Auto Ownership', 'pieHole':0.7,'width':550, 'height':400,'backgroundColor':'#222222',titleTextStyle: {
                                color: 'white'
                                
                            },legend:{
                                textStyle: {color: 'white'}
                            }};

                        // Display the chart inside the <div> element with id="piechart"
                        document.getElementById('autoOwnershipPieChart').style.margin= "-50px 0px 0px -80px";
                        var chart = new google.visualization.PieChart(document.getElementById('autoOwnershipPieChart'));
                        chart.draw(data, options);}
                });




                console.log('startup');
            },

            onOpen: function(){

                console.log('onOpen');
            },

            onClose: function(){
                console.log('onClose');
            },

            onMinimize: function(){
                console.log('onMinimize');
            },

            onMaximize: function(){
                console.log('onMaximize');
            },

            onSignIn: function(credential){
                /* jshint unused:false*/
                console.log('onSignIn');
            },

            onSignOut: function(){
                console.log('onSignOut');
            },

            onPositionChange: function(){
                console.log('onPositionChange');
            },

            resize: function(){

                console.log('resize');
            },


            //methods to communication between widgets:

        });
    });
