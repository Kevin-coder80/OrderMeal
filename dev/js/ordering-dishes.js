define( ['libs/jquery.easing'], function () {
  function init ( target_id ) {
    initEvent( target_id );
  }

  // 绑定事件
  function initEvent ( target_id ) {
    var items = $( '.main' ).find( 'li' );
    var target = getDistance( target_id );

    item.each( function ( i, item ) {
      $( item ).bind( 'click', function () {
        move( this, target );
      } )
    } );
  }

  // 返回需要移动的位置
  function getDistance ( target_id ) {
    var target = $( target_id );
    var pos = target.position();

    return {
      x: pos.left + target.width() / 2,
      y: pos.top
    }
  }

  // 移动结点到指定位置
  // ops：存有移动到的位置坐标
  function move ( item, ops ) {
    var cloned = getClone( item );

    animation( cloned, ops );
  }

  // 返回当前克隆的结点
  function getClone ( item ) {
    return $( item ).clone();
  }

  // 移动效果
  function animation ( item, ops ) {
    item.animate( {
      left: ops.x,
      top: ops.y
    },
    {
      duration: 5000,
      speciaEasing: {
        left: 'linear',
        top: 'easeOutBounce'
      }
    },
    complete: function () {

    } );
  }

  return {
    init: init
  }
} );