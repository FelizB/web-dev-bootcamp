//manipulates classes in jquery
$('h1').addClass("big-title");
//add/manipulate  text  in jquery
$("h1").text("Goodbye");
$('button').html('<em><strong>Button</strong></em>');
//add attributes to jquery
$('a').attr("href","https://www.yahoo.com");
//add event listeners 
$("h1").click(function(){
    $("h1").css("color", "purple");
});
    //click event listener
for (var i=0; i<5; i++){
    $("button").click(function(){
        $('h1').css("color", "green");
    }); 
}
    //key press event
$(document).keypress(function(event){
    $("h1").text(event.key);
});

//add and remove element
$("h1").after("<button>Button</button>");
$("h1").before("<button>Button</button>");
$("h1").append("<button>Button</button>");
$("h1").prepend("<button>Button</button>");

//adding animation with jquery
$("button").click(function(){
    $("h1").hide();
})                     //can also use. toggle,fade, fadeIn, fadeOut, slideToggle(slideUp, slideDown)

$("button").click(function(){
    $("h1").animate({
        opacity:0.5
    });                 // define custom css
    $("h1").slideUp().slideDown().animate({
        opacity:0.5
    });                // define more than one method
}) 