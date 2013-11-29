define( ['libs/modernizr.custom', 'libs/jquery.bookblock'], function () {
  var $bookBlock = $( '#bookblock' );

  function init () {
    $bookBlock.bookblock( {
      speed: 1000,
      shadowSides: 0.8,
      shadowFlip: 0.4
    } );
    initEvent();
  }

  function initEvent () {
    var $slides = $bookBlock.children();

    // to bind page turning event

    $slides.on( {
      'swipeleft': function ( evt ) {
        $bookBlock.bookblock( 'next' );
        return false;
      },
      'swiperight': function ( evt ) {
        $bookBlock.bookblock( 'prev' );
        return false;
      }
    } );

    $( document ).keydown( function ( evt ) {
      var keyCode = evt.keyCode || evt.which;
      if ( keyCode == 37 )
      {
        $bookBlock.bookblock( 'prev' );
      }
      else if ( keyCode == 39 )
      {
        $bookBlock.bookblock( 'next' );
      }
    } );
  }

  return {
    init: init
  }
} );