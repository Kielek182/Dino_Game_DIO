//pega classe .Dino do HTML; CONST => Não pode ser sobreescrita
//Acessivel por todas as funções
const Dino = document.querySelector('.Dino');
const Fundo_Game = document.querySelector('.Fundo_Game');
let position = 0;//posição;let;pode ser alterada
let pulando = false;
let Acabou = false;

//***************** Função keyup ********************************
function solta_tecla(tecla)  {
   if (tecla.keyCode === 32) {   //32=>espaço
      if (!pulando){  //" ! " torna pulo falso
        pulo();   //chama função pulo 
      }  
    }
}
//****************** Função pulo **********************
//******faz subir
function pulo() {
  pulando = true;

  let upinterval = setInterval( () => {
    if (position >= 150) { //se pulo >= 150; interrompe pulo
    clearInterval(upinterval);
    
//******faz descer
        let downinterval = setInterval(() => {    
          if (position <= 0) {
          clearInterval(downinterval);
          pulando = false;
        } else {
          position -= 20;
          Dino.style.bottom = position + 'px';
         }  
        },20);    
    } else {
        position += 20;//position= position + 20;
        Dino.style.bottom = position + 'px';
      }
      },20);
}//******************* Fim funcao pulo **************************************

//******************** Função createcactus ****************************************
function createcactus(){
    const cactus = document.createElement('div');//cria div "cactus"no HTML pelo JS
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (Acabou) return;

    cactus.classList.add('cactus');//cria class "cactus" no CSS pelo JS
    Fundo_Game.appendChild(cactus);//faz cactus virar div de Fundo_Game
    cactus.style.left = cactusPosition + 'px';
    

    let leftinterval = setInterval(() =>{  
        if (cactusPosition < -60) {
          clearInterval(leftinterval);//apaga intervalo
          Fundo_Game.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60 ) {//tamanho do Dino 60 px; se cactus estiver entre 0 && <60px(weigth) && <60px(height)= tá no Dino
            
            //gameover 
         clearInterval(leftinterval);
         Acabou = true;
         document.body.innerHTML = '<h1 class="Game_Over"> Fim de Jogo</h1>';
        } else {
         cactusPosition -= 10;
         cactus.style.left = cactusPosition + 'px';        
        }
    },20);

    setTimeout(createcactus, randomTime);
}
//****************Fim Função createcactus *****************************
createcactus();
document.addEventListener('keyup', solta_tecla);