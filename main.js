const sketchPad = document.querySelector('.sketch-pad-container');
const gridSizeBtn = document.querySelector('#grid-size-button');
const rainbowBtn = document.querySelector('#rainbow-button');
const colorPickerBtn = document.querySelector('#color-picker');
const eraseBtn = document.querySelector('#erase-button');
const clearBtn = document.querySelector('#clear-button');

sketchPad.ondragstart = function() {
    return false;
} 



let userInputSize;
gridSizeBtn.addEventListener('click', () => {  
    
    if (sketchPad.firstChild) {
        while (sketchPad.firstChild) {
            sketchPad.removeChild(sketchPad.firstChild);
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
function openSketchPad(gridSize) {

    if (gridSize) {

        for (let i = 1; i <= gridSize; i++) {
            pixelContainer = document.createElement('div');
            pixelContainer.className = 'pixel-container';
            sketchPad.appendChild(pixelContainer)

            for (let j = 1; j <= gridSize; j++){
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

function getColor() {
    
    let color; 

    if (isErase) color = 'white';
    if (isRainbow) color =  getRainbowColor();
    if (isPickedColor) color = colorPickerBtn.value;

    return color || 'black';
}

function getRainbowColor() {
    const color = ['red', 'orange', 'yellow', 'green', 'blue','indigo', 'violet', 'pink'];
    let randomchoice = Math.floor(Math.random() * color.length);
    return color[randomchoice];
}



let isRainbow = false;
let isPickedColor = false;
let isErase = false;

rainbowBtn.addEventListener('click', () => {    
    isRainbow = true
    isErase = false;
    rainbowBtn.style.backgroundColor = 'black';
    rainbowBtn.style.color = 'white';
    eraseBtn.style.backgroundColor = 'white';
    eraseBtn.style.color = 'black';
});

colorPickerBtn.addEventListener('click', () => {
    isPickedColor = true;
    isRainbow = false;
    isErase = false;
    rainbowBtn.style.backgroundColor = 'white';
    rainbowBtn.style.color = 'black';
    eraseBtn.style.backgroundColor = 'white';
    eraseBtn.style.color = 'black';
});

eraseBtn.addEventListener('click' , () => {
    isErase = true;
    isRainbow = false;
    isPickedColor = false;
    eraseBtn.style.backgroundColor = 'black';
    eraseBtn.style.color = 'white';
    rainbowBtn.style.backgroundColor = 'white';
    rainbowBtn.style.color = 'black';
});

clearBtn.addEventListener('mousedown', () => {
    pixelList.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
        pixel.style.cssText = '.pixel:hover {background-color: #707070b6}';
    });
});