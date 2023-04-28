const cells = document.querySelectorAll(".cells");
let boton = document.getElementById("boton");
const name1 = document.getElementById("nombre1");
const name2 = document.getElementById("nombre2");
const identificacion = document.getElementById('identificacion');
let confettiDiv = document.getElementById('confetti');
let nombre1;
let nombre2;
const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

let currentPlayer = "X";
let gameEnd = false;

//Al cargar la pagina se ejcuta init
window.addEventListener('load', init);

//Carga algunas decoraciones al iniciar la pagina
function init(){    
    confettiDiv = document.getElementById('confetti');
    confettiDiv.style.display = 'none';
}

//Para cada celda, evento click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        name1.disabled=true;
        name2.disabled=true;
        cargarNombres();
        if(gameEnd){
            return;
        }
        //Si la casilla está vacia, se pone X o O
        if (cell.textContent === "") {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                gameEnd = true;
                if(currentPlayer == 'X'){
                    identificacion.innerHTML= `<h2>${nombre1}(X) es el ganador!</h2>`;
                }
                else{
                    identificacion.innerHTML= `<h2>${nombre2}(O) es el ganador!</h2>`;
                }
                confettiDiv.style.display = 'block'; 
            } 
            else if (checkTie()) {
                gameEnd = true;
                identificacion.innerHTML= `<h2>Es un empate!</h2>`;
            } 
            else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });
});

function checkWin() {
//en base a nuestra constante winConditions verificamos si la posición del tablero muestra alguna victoria.
    return winConditions.some((condition) => {
        return condition.every((index) => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkTie() {
//en base a nuestras celdas del tablero verificamos que todas las celdas estén ocupadas por alguna ficha.
    return Array.from(cells).every((cell) => {
        return cell.textContent !== "";
    });
}

//Boton para reiniciar el juego una vez que este termine
boton.addEventListener('click', () => {
    location.reload();
})

//Se guardan los nombres ingresados en el input, en variables
function cargarNombres(){
    nombre1 = name1.value;
    nombre2 = name2.value;
}
