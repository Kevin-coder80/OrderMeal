define( ['libs/jquery.easing'], function () {
  var toTarget, hasDishes = {};

  function init ( target_id ) {
    toTarget = $( target_id );
    initEvent( target_id );
    // pollingOrderDishes( target_id );
  }

  // 绑定事件
  function initEvent ( target_id ) {
    var items = $( '.main' ).find( 'li' );
    var toOps = getDistance( target_id );
    var data = {};

    items.each( function ( i, item ) {
      $( item ).bind( 'click', function () {
        var $this = $( this );
        var fromPos = getDistance( this );

        data.con = [];
        data.con.push( $this.find( '.dishes' ).html(), '瓜籽', $this.find( '.pay' ).html() );
        data.offset = {
          left: fromPos.x,
          top: fromPos.y
        }
        data.item = this;

        move( data, toOps );
      } )
    } );
  }

  // 返回需要移动的位置
  function getDistance ( target_id ) {
    var target = $( target_id );
    var pos = target.offset();

    return {
      x: pos.left + target.width() / 2,
      y: pos.top
    }
  }

  // 移动结点到指定位置
  // ops：存有移动到的位置坐标
  function move ( data, toOps ) {
    var cloned = getClone( data );

    animation( cloned, toOps );
  }

  // 返回当前克隆的结点
  function getClone ( data ) {
    var ops = data.offset;
    var cloned = $( data.item ).clone();

    cloned.css( {
      position: 'absolute',
      opacity: 1,
      left: ops.left,
      top: ops.top,
      zIndex: 9999
    } );

    toTarget.append( cloned );

    return {
      cloned: cloned,
      con: data.con
    }
  }

  // 移动效果
  function animation ( data, ops ) {
    data.cloned.animate( {
      left: ops.x,
      top: ops.y,
      opacity: 0
    },
    {
      duration: 2000,
      speciaEasing: {
        left: 'swing',
        top: 'easeOutCirc'
      },
      complete: function () {
        var showItem = createHasOrderDishesItem( data );
        var spans = showItem.find( 'span' );

        $( data.con ).each( function ( i, v ) {
          $( spans[ i ] ).html( v );
        } );

        showOrderingDishes( showItem );
        $( this ).remove();
      }
    } );
  }

  // 轮询查看是否有其他人点餐并显示
  function pollingOrderDishes () {
    var self = arguments.callee;

    setTimeout( function () {
      getHasOrderDishes( function ( data ) {
        var item = createHasOrderDishesItem( data );
        var spans = item.find( 'span' );

        $( data ).each( function ( i, v ) {
          $( spans[ i ] ).html( v );
        } );
        showOrderingDishes( item );
      } );
      setTimeout( self, 1000 );
    }, 1000 );
  }

  // 显示已点餐内容
  function showOrderingDishes ( item ) {
    var $item = $( item );

    $item.css( {
      position: 'static',
      left: '',
      top: ''
    } );

    $item.animate( {
      opacity: 1
    },
    {
      duration: 2000,
      speciaEasing: {
        left: 'swing',
        top: 'easeOutCirc'
      }
    } );
  }

  // 创建其他人点餐后的显示条目
  function createHasOrderDishesItem ( data ) {
    var $li = $( '<li>' );
    var $span;

    $li.css( {
      opacity: 0
    } ).addClass( 'clearfix' );

    // data.con中的内容是一个数组：[菜单，人名，菜价]
    $( data.con ).each( function ( i, v ) {
      $span = $( '<span>' );
      if ( i == 0 )
      {
        $span.addClass( 'col-xs-4 col-sm-4 col-md-4 col-lg-4 dishes' );
      }
      else if ( i == 1 )
      {
        $span.addClass( 'col-xs-4 col-sm-4 col-md-4 col-lg-4 name' );
      }
      else if ( i == 2 )
      {
        $span.addClass( 'col-xs-4 col-sm-4 col-md-4 col-lg-4 pay' );
      }
      $li.append( $span );
    } );

    toTarget.append( $li );

    return $li;
  }

  // 请求其他人已点餐内容
  function getHasOrderDishes ( callback ) {
    var url = '';

    $.ajax( {
      url: url,
      type: 'POST',
      dataType: 'json',
      success: function ( data ) {
        // data的数据结构为：
        // {
        //  data: [
        //    {
        //      con: [菜名，人名，菜价]
        //    }
        //  ]
        // }
        callback( data.data );
        // var $data = $( data.data );

        // $data.each( function ( i, item ) {
        //   callback( item );
        // } );
      }
    } );
  }

  return {
    init: init
  }
} );