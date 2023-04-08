var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomImage = "dice"+randomNumber1+".png";
var randomImgSource = "images/"+ randomImage;
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", randomImgSource);
