
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
  let posicionAnterior={x:0,y:0}
  if((SERPIENTE[0].x+2)*TAMANIO_CELDA>canvas.width)
    return
  for(let i=0; i<SERPIENTE.length;i++){
    let posicionX=SERPIENTE[i].x
    let posicionY=SERPIENTE[i].y
    if(i==0){
    SERPIENTE[i].x=SERPIENTE[i].x + 1
  }else{
    SERPIENTE[i].x=posicionAnterior.x
    SERPIENTE[i].y=posicionAnterior.y

  }
  posicionAnterior.x=posicionX
  posicionAnterior.y=posicionY
  }
  dibujarSerpiente()
}

function moverIzquierda(){
  let posicionAnterior={x:0,y:0}
  if((SERPIENTE[0].x-1)*TAMANIO_CELDA<0)
    return
  for(let i=0; i<SERPIENTE.length;i++){
    let posicionX=SERPIENTE[i].x
    let posicionY=SERPIENTE[i].y
    if(i==0){
    SERPIENTE[i].x=SERPIENTE[i].x - 1
  }else{
    SERPIENTE[i].x=posicionAnterior.x
    SERPIENTE[i].y=posicionAnterior.y

  }
  posicionAnterior.x=posicionX
  posicionAnterior.y=posicionY
  }
  dibujarSerpiente()
}

function moverAbajo(){
  let posicionAnterior={x:0,y:0}
  if((SERPIENTE[0].y+2)*TAMANIO_CELDA>canvas.height)
    return
  for(let i=0; i<SERPIENTE.length;i++){
    let posicionX=SERPIENTE[i].x
    let posicionY=SERPIENTE[i].y
    if(i==0){
    SERPIENTE[i].y=SERPIENTE[i].y + 1
  }else{
    SERPIENTE[i].x=posicionAnterior.x
    SERPIENTE[i].y=posicionAnterior.y

  }
  posicionAnterior.x=posicionX
  posicionAnterior.y=posicionY
  }
  dibujarSerpiente()
}

function moverArriba(){
  let posicionAnterior={x:0,y:0}
  if((SERPIENTE[0].y-1)*TAMANIO_CELDA<0)
    return
  for(let i=0; i<SERPIENTE.length;i++){
    let posicionX=SERPIENTE[i].x
    let posicionY=SERPIENTE[i].y
    if(i==0){
    SERPIENTE[i].y=SERPIENTE[i].y - 1
  }else{
    SERPIENTE[i].x=posicionAnterior.x
    SERPIENTE[i].y=posicionAnterior.y

  }
  posicionAnterior.x=posicionX
  posicionAnterior.y=posicionY
  }
  dibujarSerpiente()
}

function cambiarDireccion(direccion){
  switch(direccion){
    case "derecha":
      moverDerecha();
        break;

    case "izquierda":
      moverIzquierda();
        break;

    case "abajo":
      moverAbajo();
        break;

    case "arriba":
      moverArriba();
        break;
  }
  dibujarTodo()
}