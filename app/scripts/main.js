'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){
    	SEMICOLON.functions.navBar();

      if(!isMobDevice || !Modernizr.touch){ 
        video = SEMICOLON.functions.setUpVideo();
        $('#landing #videoContainer').append(video);
        video.oncanplay = SEMICOLON.functions.playVideo;
      }
      
    	SEMICOLON.functions.buildGoogleMap();

      SEMICOLON.functions.setUpFormEvents();  
  
      
    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {

  
    sendEmail: function(event){
          event.preventDefault();
  
          var form = $(this);
          $.ajax({
              url: "https://formspree.io/dwyerb@tcd.ie", 
              method: "POST",
              data: form.serialize(),
              dataType: "json"
          }).done(function( data ) {
            SEMICOLON.functions.sendEmailSuccess();
          }).fail(function(jqXHR) {
            SEMICOLON.functions.sendEmailFail(jqXHR);
          });
  
          return false;
      },
  
      sendEmailSuccess: function(){
          $('#jsFormSuccess').show();
          $('#jsFormFail').hide();
          $('#jsFormSubmit').hide();
          
      },
  
      sendEmailFail: function(jqXHR ){
          if(jqXHR.responseJSON.error){
            $('#jsFormFail').append(" " + jqXHR.responseJSON.error);
          }
          $('#jsFormFail').show();
      },
      
  
      setUpFormEvents: function(){
          $('#jsEmailForm').submit(
            SEMICOLON.functions.sendEmail
          );
  
      },

  
  
    playVideo: function(){
        video.play();
        // $('#spinner-overlay').hide();
        $('#landing').fadeIn(1000).addClass('js-loaded');
    },
    
    setUpVideo: function(){
        video = document.createElement('video');
        video.poster = '/images/js-images/oneill-solicitors-blackrock-park.jpg';
        video.preload = 'auto';
        video.id = 'videoObj';
        video.autoPlay = true;
        video.loop = true;

        // video.src = 'images/no-more-backgrounds31.mp4';
        
        if (video.canPlayType('video/mp4').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/oneill-blackrock.mp4';
        }else if (video.canPlayType('video/webm').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/no-more-backgrounds.webm';
        }else if (video.canPlayType('video/ogg').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/no-more-backgrounds.ogv';
        }

        return video;  

    },
    
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
    video = null,
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);


