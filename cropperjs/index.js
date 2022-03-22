
let inputImg = document.querySelector("#fileinput");
let canvas = document.querySelector("#canvas");
let cropperBox = "";

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
        aspectRatio : 16/9,
        viewMode : 2,
        zoomOnWheel: false,
    });
})

