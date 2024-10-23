console.log('The page is working!');

// 10. Socket connection on the client side
let socket = io();


// Making each client have a different color and size
let r,g,b,size;

// 11. Log on client side when client connects. 
socket.on('connect', () => {
    console.log('Connected');
});

//15. Listen for data from the server
socket.on('data', (data) => {
    console.log(data);

    //16. draw ellipses with the data
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, data.size);
});

//20. listen for a color change ping
socket.on('colorChange', ()=>{
    r = random(255);
    g= random(255);
    b= random(255);
    size= random(10, 30);
    
})

//STEP 3. p5 setup

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    r = random(255);
    g= random(255);
    b= random(255);
    size= random(10, 30);
}

function mouseMoved() {
    fill(0);
    // ellipse(mouseX, mouseY, 10, 10);

    // 12. Emit the data
    let ellipseInfo = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size: size
    }

    socket.emit('data', ellipseInfo);
}
//20. change color and size on mouse press
function mousePressed(){
    socket.emit('colorChange');
}