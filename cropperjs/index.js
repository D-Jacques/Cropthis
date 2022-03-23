
let inputImg = document.querySelector("#fileinput");
let canvas = document.querySelector("#canvas");
let cropperBox = "";

let button16 = document.querySelector("#button-16");
let button4 = document.querySelector("#button-4");
let button3 = document.querySelector("#button-3");
let buttonFree = document.querySelector("#button-libre");

/**
 * Initialisation d'un cropper au chargement d'une image
 */

inputImg.addEventListener("change", function(){
    let file = inputImg.files[0];
    let fileExtension = file['name'].split('.').pop();
    let reader = new FileReader();

    reader.addEventListener('load', function(){
        canvas.src = reader.result;
    })

    if(file)
        reader.readAsDataURL(file)
})

canvas.addEventListener('load', function(){
    if(cropperBox)
        cropperBox.destroy()

    cropperBox = new Cropper(canvas,{
        viewMode : 2,
    });

    button16.addEventListener("click", function(){
        cropperBox.setAspectRatio(16/9);
    });

    button4.addEventListener("click", function(){
        cropperBox.setAspectRatio(4/3);
    });

    button3.addEventListener("click", function(){
        cropperBox.setAspectRatio(3/4);
    });

    buttonFree.addEventListener("click", function(){
        cropperBox.setAspectRatio(NaN);
    });

})

/**
 * Changement du viewMode
 */

let buttonVM1 = document.querySelector("#button-vm1");
let buttonVM2 = document.querySelector("#button-vm2");
let buttonVM3 = document.querySelector("#button-vm3");
let buttonVM0 = document.querySelector("#button-vm0");

buttonVM1.addEventListener("click", function(){
    setViewMode(1);
})

buttonVM2.addEventListener("click", function(){
    setViewMode(2);
})

buttonVM3.addEventListener("click", function(){
    setViewMode(3);

})

buttonVM0.addEventListener("click", function(){
    setViewMode(NaN);
})

/**
 * Petite fonction car la ligne de code ça coute cher !!!
 */

function setViewMode(viewMode){
    if(cropperBox)
        cropperBox.destroy();

    cropperBox = new Cropper(canvas,{
        viewMode : viewMode,
    });
    
}