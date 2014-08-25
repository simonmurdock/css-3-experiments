var mouseY = 0;

getBlur = function(depth){
  var result = Math.abs(depth-mouseY/50);
  return result;
};

$(document).ready(function() {
  $(window).mousemove(function(e){
    mouseY = e.pageY;
    $('#bg').attr('style','-webkit-filter:blur('+getBlur(2)+'px);');
    $('#dirt').attr('style','-webkit-filter:blur('+getBlur(3)+'px);');
    $('#runner').attr('style','-webkit-filter:blur('+getBlur(5)+'px);');
  });
});