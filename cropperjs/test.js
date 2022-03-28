let labelbutton = document.querySelector(".input-div label");

labelbutton.addEventListener("click", function(){
    this.style.backgroundColor = "pink";
})
labelbutton.addEventListener("mouseup", function(){
    this.style.backgroundColor = "blue"
});

