
class Snake{ 
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1

    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1 ].x + this.size,
                y: this.tail[this.tail.length - 1 ].y 
            }
        } else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1 ].x - this.size,
                y: this.tail[this.tail.length - 1 ].y 
            }         
        } else if (this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1 ].x, 
                y: this.tail[this.tail.length - 1 ].y + this.size
           } 
        } else if (this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1 ].x, 
                y: this.tail[this.tail.length - 1 ].y - this.size      
           }
        }
   
        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Apple{
    constructor(){
        console.log("apple");
        console.log(snake.size);
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i < snake.tail.length;i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true  
                }
            }
            console.log(this.x , this.y)
            this.size = snake.size
            this.color = "blue"
            if(!isTouching){
                break;

            }
             
            
         
        }
    }

}

var canvas = document.getElementById("canvas")

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
}

function gameLoop(){
    
    setInterval(show, 1000/5); // 15 is our fps value
    
}

function show(){
    update();
    draw();
    checkCollision();
    
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height);
    console.log("update");
    snake.move();
    eatApple();
    checkHitWall();
    
    
}

function checkHitWall(){
    var headTail = - snake.tail[snake.tail.length -1];
    if(headTail.x == -snake.size) {
        headTail.x = canvas.width - snake.size;
    } else if(headTail.x == canvas.width){
        headTail.x = 0;
    } else if(headTail.y == -snake.size){
        headTail.y = canvas.height - snake.size;
    } else if(headTail.y == canvas.height){
        headTail.y = 0;
    }
}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}
            apple = new Apple();


        }

}

function draw(){
    createRect(0, 0, canvas.width, canvas.height, "#000000"); 
    createRect(snake.x, snake.y, snake.size, snake.size,) ;
    for (var i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, "yellow");
    }

    canvasContext.font = "12px Arial";
    canvasContext.fillStyle = "yellow";
    canvasContext.fillText("Score: "+ snake.tail.length, canvas.width - 120, 18);
    
    createRect(apple.x, apple.y, apple.size , apple.size , apple.color);
}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,height,width)

}

function checkCollision() {
    // Obtener la posición de la cabeza de la serpiente
    const head = snake.tail[0]; // Poner.tail

    // Verificar si la cabeza de la serpiente ha chocado con la pared
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        // Si ha chocado con la pared, terminar el juego
        clearInterval(null);
        alert("Richi Wins!");
    }
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if(event.keyCode == 37 && snake.rotateX != 1){ 
          snake.rotateX = -1
          snake.rotateY = 0;
        } else if (event.keyCode == 38 && snake.rotateY != 1){ 
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){ 
            snake.rotateX = 1
            snake.rotateY = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){ 
            snake.rotateX = 0
            snake.rotateY = 1;
        }
        

        
    }, 1)
})