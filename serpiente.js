
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA=25;

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
      pintarCoordenada(25,25);
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

function pintarCoordenada(lineaX,lineaY){
  let posicionX= lineaX*TAMANIO_CELDA
  let posicionY= lineaY*TAMANIO_CELDA
  if (posicionX<canvas.width && posicionY<canvas.height){
    ctx.fillStyle="yellow"
    ctx.fillRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA)

    ctx.strokeStyle="red"
    ctx.strokeRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA)

  }
}

