import "jquery";
import "../css/main.scss";
import "../app/index.js";
import "../css/responsive.scss";
$(document).delegate('textarea', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
});
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../img/', true));
requireAll(require.context('../img/upload', true));

$("#menu").hide();
$("#menuIcon").click(function (event) {
  $(".menu li").hide();
  $("#menu").animate({width:"toggle"}, 200).toggleClass("open").toggleClass("visible");
  event.stopPropagation();
  $(".menu li").delay(200).fadeIn("slow");
});

$("html").click(function (){
  $(".menu li").fadeOut("slow");
	if($('#menu').hasClass("open")){
    $("#menu").delay(500).animate({width:'toggle'},200).toggleClass('open').toggleClass('visible');
	}
});

setInterval(function () {
	$("#heart").fadeTo(500, 0.1).fadeTo(1000, 1);
},2000);
