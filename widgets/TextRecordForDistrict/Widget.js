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
        
                let districtLayer =this.map.getLayer(this.map.graphicsLayerIds[0]);

                let id = this._chartNode;
                
                var totalVKTMatrix = null;
                var averageVKTMatrix = null;
                var populationMatrix = null;
                var employmentMatrix = null;
                var q = d3.queue();
                q.defer(d3.csv,"./data/totalVKT_by_district.csv")
                  .defer(d3.csv, './data/averageVKT_by_district.csv')    
                  .defer(d3.csv,'./data/population_by_district.csv') 
                  .defer(d3.csv,'./data/employment_by_district.csv')           
                  .await(showResult);
                function showResult(error, totalVKT,averageVKT,population,employment){

                  totalVKTMatrix = buildMatrixLookup(totalVKT)
                  averageVKTMatrix = buildMatrixLookup(averageVKT);
                  populationMatrix = buildMatrixLookup(population);
                  employmentMatrix = buildMatrixLookup(employment);
  
                  districtLayer.on('click',function(e){
                      var selectedZone = e.graphic.attributes["District"];
                      $('#TotalVKTNumber').text(Number(totalVKTMatrix[selectedZone]['TotalVKT']).toFixed(2));
                      $('#AverageVKTNumber').text(Number(averageVKTMatrix[selectedZone]['AverageVKT']).toFixed(2));  
                      $('#PopulationNumber').text(populationMatrix[selectedZone]['Population']);  
                      $('#EmploymentNumber').text(employmentMatrix[selectedZone]['Jobs']);  

                  }); 
                }
    



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
