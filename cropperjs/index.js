
let inputImg = document.querySelector("#fileinput");
let canvas = document.querySelector("#canvas");
let cropperBox = "";

let button16 = document.querySelector("#button-16");
let button4 = document.querySelector("#button-4");
let button3 = document.querySelector("#button-3");
let buttonFree = document.querySelector("#button-libre");

let buttonRotatePlus = document.querySelector("#button-rotate-plus");
let buttonRotateMinus = document.querySelector("#button-rotate-minus");
let fileExtension = ""
/**
 * Initialisation d'un cropper au chargement d'une image
 */

inputImg.addEventListener("change", function(){
    let file = inputImg.files[0];
    fileExtension = file['name'].split('.').pop();
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

    buttonRotatePlus.addEventListener("click", function(){
        cropperBox.rotate(45);
    });

    buttonRotateMinus.addEventListener("click", function(){
        cropperBox.rotate(-45);
    })

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
 * Bouttons pour ajouter/enlever le zoom du cropper
 */

let buttonZoomOn = document.querySelector("#button-zoom-on");
let buttonZoomOff = document.querySelector("#button-zoom-off");

buttonZoomOn.addEventListener("click", function(){
    setZoom(true);
})

buttonZoomOff.addEventListener("click", function(){
    setZoom(false);
})


/**
 * Petites fonctions car la ligne de code ça coute cher !!!
 */

function setViewMode(viewMode){
    if(cropperBox)
        cropperBox.destroy();

    cropperBox = new Cropper(canvas,{
        viewMode : viewMode,
    });
    
}

function setZoom(zoomEnabled){
    if(cropperBox)
        cropperBox.destroy();

    cropperBox = new Cropper(canvas,{
        zoomOnWheel : zoomEnabled,
    });
}

let buttonCrop = document.querySelector("#button-crop");

buttonCrop.addEventListener("click", function(){

    cropperBox.getCroppedCanvas({
        width: 800,
        height: 600
    }).toBlob(function(blob){
        const formData = new FormData();
        formData.append('file', blob, 'fileupload.'+fileExtension);
        $.ajax({
            url: '/php/index.php',
            type: 'POST',
            data: formData,
            cache : false,
            processData: false,
            contentType: false,
            success() {                
                console.log("OK");
            }
        });
    });
   
})
