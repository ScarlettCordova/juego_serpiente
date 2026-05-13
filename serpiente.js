
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA=25;

    const SERPIENTE=[
      {
        x:14,
        y:13
      },
      {
        x:14,
        y:14
      },
      {
        x:14,
        y:15
      },
      {
        x:14,
        y:16
      }
    ]

    let intervaloSerpiente;
    let direccionActual="derecha"
    let comida={x:5,y:5}
    let puntaje=0;

  dibujarTablero=function(){
    ctx.strokeStyle="white";
    ctx.beginPath();//Empeiza a dibujar en el canva
    ctx.moveTo(0,0); //Donde empieza a dubujar
    ctx.lineTo(100,100);//Hasta donde dibujar
    ctx.stroke();//Pinta contorno
  }
   
  dibujarTablero2=function(){
    for(let i=0;i<canvas.width;i+=TAMANIO_CELDA){
      ctx.strokeStyle="white";
      ctx.beginPath();//Empeiza a dibujar en el canva
      ctx.moveTo(i,0); //Donde empieza a dubujar
      ctx.lineTo(i,canvas.height);//Hasta donde dibujar
      ctx.stroke();
    }
    for(let i=0;i<canvas.height;i+=TAMANIO_CELDA){
      ctx.strokeStyle="white";
      ctx.beginPath();//Empeiza a dibujar en el canva
      ctx.moveTo(0,i); //Donde empieza a dubujar
      ctx.lineTo(canvas.width,i);//Hasta donde dibujar
      ctx.stroke();
  }
}

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero2();
      dibujarNumerosEnY();
      dibujarNumerosEnX();
      //pintarCoordenada(25,25);
      dibujarComida();
      dibujarSerpiente();
    }

function dibujarNumerosEnY(){
  ctx.fillStyle="white"
  ctx.font= "12px Arial"
  let contador=0
  for(let i=0;i<canvas.height;i+=TAMANIO_CELDA){
    ctx.fillText(contador,5,i+12)
    contador++
    }
}

function dibujarNumerosEnX(){
  ctx.fillStyle="white"
  ctx.font= "12px Arial"
  let contador=0
  for(let i=0;i<canvas.width;i+=TAMANIO_CELDA){
    ctx.fillText(contador,i+2,12)
    contador++
    }
}

function pintarCoordenada(lineaX,lineaY,color){
  let posicionX= lineaX*TAMANIO_CELDA
  let posicionY= lineaY*TAMANIO_CELDA
  if (posicionX<canvas.width && posicionY<canvas.height){
    ctx.fillStyle=color
    ctx.fillRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA)

    ctx.strokeStyle="red"
    ctx.strokeRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA)
  
  }
}

function dibujarSerpiente(){
  let colorCabeza= "red"
  for(let i=0; i<SERPIENTE.length;i++){
    let serp=SERPIENTE[i]
    if (i==0){
      pintarCoordenada(serp.x, serp.y, colorCabeza)
    }else {
      pintarCoordenada(serp.x, serp.y,"yellow")
    }
  }
}

function moverDerecha(){
  let nuevoElemento={x:0,y:0}
  if((SERPIENTE[0].x+2)*TAMANIO_CELDA>canvas.width)
    return
  nuevoElemento.x=SERPIENTE[0].x+1
  nuevoElemento.y=SERPIENTE[0].y

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()
  
}

function moverIzquierda(){
  let nuevoElemento={x:0,y:0}
  if((SERPIENTE[0].x-1)*TAMANIO_CELDA<0)
    return
  nuevoElemento.x=SERPIENTE[0].x-1
  nuevoElemento.y=SERPIENTE[0].y

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()
  
}

function moverAbajo(){
  let nuevoElemento={x:0,y:0}
  if((SERPIENTE[0].y+2)*TAMANIO_CELDA>canvas.height)
    return
  nuevoElemento.x=SERPIENTE[0].x
  nuevoElemento.y=SERPIENTE[0].y+1

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()
  
}

function moverArriba(){
  let nuevoElemento={x:0,y:0}
  if((SERPIENTE[0].y-1)*TAMANIO_CELDA<0)
    return
  nuevoElemento.x=SERPIENTE[0].x
  nuevoElemento.y=SERPIENTE[0].y-1

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()
  
}

function iniciarJuego(){
  intervaloSerpiente=setInterval(moverSerpiente,500)
  
}

function pausarJuego(){
  clearInterval(intervaloSerpiente)
}

function moverSerpiente(){
  let atrapado=comidaAtrapada()
  let nuevoElemento={x:SERPIENTE[0].x, y:SERPIENTE[0].y}
  console.log("moviendo")
  switch(direccionActual){
    case "derecha":
      moverDerecha();
      nuevoElemento.x++
        break;

    case "izquierda":
      moverIzquierda();
      nuevoElemento.x--
        break;

    case "abajo":
      moverAbajo();
      nuevoElemento.y++
        break;

    case "arriba":
      moverArriba();
      nuevoElemento.y--
        break;
  }
  if(atrapado){
    SERPIENTE.unshift(nuevoElemento)
    aumentarPuntaje()
    generarNuevaPosicionComida()
  }
  dibujarTodo()
  console.log(comidaAtrapada())
}

function cambiarDireccion(direccion){
  direccionActual=direccion;
}

//function pintarComida(){
  //let comidaX=Math.floor(Math.random()+canvas.width/TAMANIO_CELDA)
  //let comidaY=Math.floor(Math.random()+canvas.height/TAMANIO_CELDA)
  //pintarCoordenada(comidaX,comidaY,"green")
//}

function dibujarComida() {
  pintarCoordenada(comida.x, comida.y, "green");
}
 
function generarNuevaPosicionComida() {
  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
}
 
function comidaAtrapada(){
  if(comida.x==SERPIENTE[0].x && SERPIENTE[0].y==comida.y)
    return true
  else
    return false
}

function aumentarPuntaje(){
  puntaje++
  document.getElementById("puntaje").innerText=puntaje
}