const faaBtn = document.querySelector('#test2');
const sketchPad = document.querySelector('.sketch-pad-container');
const fooBar = document.querySelector('.foo-container');
const rainbowBtn = document.querySelector('#rainbow-color');
const colorPickerBtn = document.querySelector('#color-picker');

fooBar.ondragstart = function() {
    return false;
} 



let userInputSize;
faaBtn.addEventListener('click', () => {  
    
    if (fooBar.firstChild) {
        while (fooBar.firstChild) {
            fooBar.removeChild(fooBar.firstChild);
        }   
    }

    do {
        userInputSize = +prompt("Please Enter Your Desired Size \nMAX: 100");
        if (userInputSize > 100) alert("Value Exceeded!");
        openSketchPad(userInputSize)

    } while (userInputSize > 100);
});



let pixelContainer;
let pixel;
function openSketchPad(dimension) {

    if (dimension) {

        for (let i = 1; i <= dimension; i++) {
            pixelContainer = document.createElement('div');
            pixelContainer.className = 'pixel-container';
            fooBar.appendChild(pixelContainer)

            for (let j = 1; j <= dimension; j++){
                pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixelContainer.appendChild(pixel);
            }
        }
    }

    paintPixel();
    
}



let pixelList;
function paintPixel() {

    pixelList = document.querySelectorAll('.pixel');

    pixelList.forEach((pixel) => {
        
        pixel.addEventListener('mousedown', () => {
            pixel.style.backgroundColor = getColor();
        });


        pixel.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) {
                pixel.style.backgroundColor = getColor();
            }
        });


    });
}



let isRainbow = false;
let isPickedColor = false;

rainbowBtn.addEventListener('click', () => {    
    isRainbow = true
    rainbowBtn.style.backgroundColor = 'black';
    rainbowBtn.style.color = 'white';
});

colorPickerBtn.addEventListener('click', () => {
    isPickedColor = true;
    isRainbow = false;
    rainbowBtn.style.backgroundColor = 'white';
    rainbowBtn.style.color = 'black';
});

function getColor() {

    let color;

    if (isRainbow) {
        return color = rainbowColor();
    }

    if (isPickedColor) {
        return color = colorPickerBtn.value;
    }

}



function resetValue() {
    isRainbow = false;
    isPickedColor = false;
}



function rainbowColor() {
    const color = ['red', 'orange', 'yellow', 'green', 'blue','indigo', 'violet', 'pink'];
    let randomchoice = Math.floor(Math.random() * color.length);
    return color[randomchoice];
}



const clearBtn = document.querySelector('#clr-btn');
clearBtn.addEventListener('click', () => {
    pixelList.forEach((pixel) => {
        pixel.style.backgroundColor = 'initial';
    });
});