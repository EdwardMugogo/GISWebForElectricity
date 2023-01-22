

//Initialize map
var map = L.map('map', {
    fullscreenControl: true,
    allowfullscreen: true,
    fullscreenControlOptions:{
        position:'topleft'
    }
}).setView([-4.855, 39.112], 11);

//Substation Style
var MyIcon = L.icon({
   iconUrl: 'img/SubstatioBlue.png',
   iconSize:     [17, 17], // size of the icon
});

var substationlayer = L.geoJson(Substations,{
    pointToLayer: function(feature,layer){
    return L.marker(layer, {icon:MyIcon});
    },
    onEachFeature: function(feature,layer){
        layer.bindPopup('<h5></u></font><h5>Substation Name: '+feature.properties.Substation+'</h5></u></font><h5>SIZE: '+ feature.properties.Substati_1+'</h5></U></font><h5>Location: '+feature.properties.Location+'</p>')
    }}).addTo(map);


// add TANGA1 FEEDER HTLINE 
var TNG1HTLine = L.geoJson (TNG1HTLine,{
    color:"blue",
    weight:5,
    opacity:1
}).addTo(map);

// add KANGE2 FEEDER HTLINE 
var KANGE2HTLine = L.geoJson (KANGE2HTLine,{
    color:"red",
    weight:5,
    opacity:1
}).addTo(map);


// Add Open Street Map-Mapnik tile layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// google satellite
var EsriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// hybrid
var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//Topo Map
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// basemap switch
var baseLayers = {
    "OpenStreetMap": osm,
    "WorldImagery": EsriWorldImagery,
    "GoogleHybrid": googleHybrid, 
    "TopoMap": OpenTopoMap,     
};

var overlays = {
        "Substation": substationlayer,
        "33KV Voltage Line" : KANGE2HTLine, 
        "11KV Voltage Line" : TNG1HTLine
      };
L.control.layers(baseLayers,overlays,{collapsed:false}).addTo(map);


// Crtl for Distance Measurement
var options = {
          position: 'topleft',
          lengthUnit: {                
          display: 'km',              
          decimal: 2,                 
          factor: null,                 
          label: 'Distance:'           
      },
          circleMarker: {               
          color: 'yellow',
          radius: 2
      },
          lineStyle: {                  
          color: 'yellow',
          dashArray: '1,6'
      },
        };
L.control.ruler(options).addTo(map);

// Add scale to map
 L.control.scale({
    metric: true,
    imperial: true,
    maxWidth: 100,
    position:'bottomright'
}).addTo(map);

// add leaflet browser print control to map
L.control.browserPrint({position: 'topleft'}).addTo(map);

// Coordinates on mousemove
 map.on("mousemove" ,function(e){
 
    $("#coordinate").html(`lat:${e.latlng.lat.toFixed(3)}, lng : ${e.latlng.lng.toFixed(3)}`)
 });

 // logo to the map
 L.Control.Watermark=L.Control.extend({
    onAdd:function(map){
        var img = L.DomUtil.create('img');
        img.src = 'img/tanescotanga.png';
        img.style.width = '100px';
        return img;
    },
    onRemove:function(map){},
    });
    L.control.watermark = function(opts){
        return new L.Control.Watermark(opts);
        }
    L.control.watermark({position:'topright'}).addTo(map);


// LEGEND
  L.control.Legend({
    position: "bottomleft",
    legends: [{
        label: "SUBSTATION",
        type: "image",
        url: "img/SubstatioBlue.png",
    },
    {
        label:"33kV Voltage Line",
        type:"polyline",
        color:"red",
        weight:5,
        opacity:1,
    },
    { 
        label:"11kV Voltage Line",
        type:"polyline",
        color:"blue",
        weight:5,
        opacity:1,
    }]
}).addTo(map);

