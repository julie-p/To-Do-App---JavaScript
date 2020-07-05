//1 - select elements

//select clear button 
const clear = document.querySelector(".clear");
//select date element 
const dateElement = document.getElementById("date");
//select list element
const list = document.getElementById("list");
//select input element pour avoir la value de l'user
const input = document.getElementById("input");

//Classes noms
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST;
let id;

//Récupère item du local storage
let data = localStorage.getItem("TODO");

//Si data n'est pas vide
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //définit id sur le dernier de la liste
    loadList(LIST); //Charge la liste présente dans local storage
} else {
    LIST = [];
    id = 0;
};

//Fonction pour charger la liste
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
};

//Date du jour
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//addToDo function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                        <i class="far ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
                    </li>
                 `
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Event listener pour confirmer l'envoi de l'input (keyCode 13)
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //Check si input != vide => addToDo();
        if (toDo) {
            addToDo(toDo, id, false, false);
            //Stocker to-do
            //tableau d'objets : name, id, done, trash
            //À chaque ajout, on incrément id de 1 
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //Ajoute item dans local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        //Finir en remettant input vide
        input.value = "";
    }
});

//To-do faite
function completeToDo(e) {
    e.classList.toggle(CHECK);
    e.classList.toggle(UNCHECK);
    e.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[e.id].done = LIST[e.id].done ? false : true;
};

//Supprimer to-do
function removeToDo(e) {
    e.parentNode.parentNode.removeChild(e.parentNode);

    LIST[e.id].trash = true;
};

//Cibler l'élément crée
list.addEventListener('click', function(event) {
    const e = event.target; //return l'élément clické dans la list
    const elementJob = e.attributes.job.value; //return complete || delete 

    if (elementJob == "complete") {
        completeToDo(e);
    } else if (elementJob == "delete") {
        removeToDo(e);
    };
    //Ajoute item dans local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})