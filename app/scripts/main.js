'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){
    	SEMICOLON.functions.navBar();
    	SEMICOLON.functions.buildGoogleMap();
    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
    navBar: function(){
    	var navBar = $('.js-navbar');
    	var offsetHeight = navBar.offset();
        navBar.affix({offset: {top: offsetHeight.top} });

  	},

  	buildGoogleMap: function(){
        $('#js-google-map').gmap3({
          center:[53.300698, -6.177590],
          zoom:17,
          scrollwheel: false,
          mapTypeId: "oneill",
          mapTypeControlOptions: {
            // mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP]
          }
        })
        .marker([
          {position:[53.300698, -6.177590], icon: "http://maps.google.com/mapfiles/marker_grey.png"}
        ])
        .styledmaptype(
        "oneill",
        [
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [
            { hue: '#009999' },
            { saturation: -16 },
            { lightness: 0 },
            { visibility: 'simplified' }
            ]
          },{
            featureType: 'poi',
            elementType: 'all',
            stylers: [
            { hue: '#009999' },
            { saturation: -47 },
            { lightness: 49 },
            { visibility: 'off' }
            ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "hue": "#c4b88e"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#527191"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
          ],
        {name: "O'Neill"}
      );;
    
  }
};



  //               //
 //  DOM objects  //
//               //
var $htmlBody = $('body,html'),
    $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);


