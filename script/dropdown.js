$(document).on('pageinit', '#menu', function(){
  $('body').bind('hideOpenMenus', function(){
    $("ul:jqmData(role='menu')").find('li > ul').hide();
  });

  var menuHandler = function(e) {
    if($(this).find('li > ul').is(":visible")) {
      $(this).find('li > ul').hide();
    } else {
      $(this).find('li > ul').show();
    };
    e.stopPropagation();
  };

  $("ul:jqmData(role='menu') li > ul li").click(function(e) {
    $('body').trigger('hideOpenMenus');
    e.stopPropagation();
  });

  $('body').delegate("ul:jqmData(role='menu')",'click',menuHandler);
  $('body').click(function(e){
    $('body').trigger('hideOpenMenus');
  });

  $("ul:jqmData(role='menu')").find('li > ul').hide();
});