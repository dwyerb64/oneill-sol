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

      SEMICOLON.functions.mobileMenuCollapseOnClick();

    	SEMICOLON.functions.buildGoogleMap();

      SEMICOLON.functions.setUpFormEvents();  
      
      
      $('#landing').addClass('js-loaded');
      
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
        $('#videoObj').fadeIn(1000);
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
            video.src = '/images/js-images/oneill-blackrock-720.mp4';
        }else if (video.canPlayType('video/webm').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/oneill-blackrock-720.webm';
        }else if (video.canPlayType('video/ogg').length > 0) {
            /* set some video source */
            video.src = '/images/js-images/oneill-blackrock-720.ogg';
        }

        return video;  

    },
    
    navBar: function(){
    	var navBar = $('.js-navbar');
    	var offsetHeight = navBar.offset();
      navBar.affix({offset: {top: offsetHeight.top} });

      this.scrollTo();
  	},

    mobileMenuCollapseOnClick: function () {
    $("nav").find("li").on("click", "a", function () {
        $('.navbar-collapse.in').collapse('hide');
      });
    },

    scrollTo: function(){
       $('a.page-scroll').bind('click', function(event) {
          var $anchor = $(this);
          $htmlBody.stop(true).animate({
                  scrollTop: $($anchor.attr('href')).offset().top - 10
                }, 1500);
                event.preventDefault();
        });
    },

  	buildGoogleMap: function(){

      var myLatLng = {lat: 53.300698, lng: -6.177590};
      var iconImage = "/images/js-images/location-pinx50.png";

      var customMapType = new google.maps.StyledMapType([
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
            featureType: 'poi.park',
            elementType: 'all',
            stylers: [ 
            { hue: '#09a813' },
            { saturation: 25 },
            { lightness: 5 },
            { visibility: 'on' }
            ]
          },{
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
            {"visibility": "on"},
            {"hue": "#c4b88e"}
            ]
          },{
            featureType:"road.local",
            elementType:"geometry.fill",
            stylers:[
            {"visibility": "on"},
            {"color":"#ffffff"}
            ]
          },{
            featureType:"landscape",
            elementType:"all",
            stylers:[
            {"visibility": "on"},
            {"color":"#dedede"}
            ]
          },{
            featureType:"transit.line",
            elementType:"geometry",
            stylers:[{"color":"#a8a5a8"}]
          },{
            featureType: "water",
            elementType: "all",
            stylers: [
            {"color": "#527191"},
            {"visibility": "on"}
            ]
          }
          ],
        {name: "O'Neill"}
        );

      var customMapTypeId = 'oneill_style';


      var map = new google.maps.Map(document.getElementById('js-google-map'), {
          center: {lat: 53.300698, lng: -6.177590},
          scrollwheel: false,
          zoom: 16,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', customMapTypeId]
        }
      });

      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);

      var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'ONeill Solitictors',
          icon: iconImage
        });

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


