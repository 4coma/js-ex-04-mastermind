// NOTES GEN SUR LE DEV
// poser la q. : pourquoi ça ne va pas quand je fais avec les paramètres

// attention, quand l'utilisateur rentre sa sélection, il faut pas oublier qu'il ne peut pas se répéter, 
// et il doit pouvoir avoir un droit à l'erreur.

// ce serait intéressant d'essayer d'injecter tout le contenu du css et html ? pour ne pas avoir à répéter de longues lignes en html, comme les div pour les cercles, par ex.

// bugs à régler : si aucune proposition n'est bonne, ça doit s'afficher, là pour l'instant ça laisse le score précédent

const colors = ["blue", "red", "green", "yellow", "purple", "brown", "orange"];
const colorsNholes = ["blue", "red", "green", "yellow", "purple", "brown", "orange", "grey"];
let selectedColors = [];
let selectedHumanColors = [];
let feedback = [];


// BOUTONS DIFFICULTE

var holes = document.querySelector('input[value="holes"]');
var repeat = document.querySelector('input[value="repeat"]');

holes.onchange = function() {
  if(holes.checked){
    document.location.reload(false);
  }
  else{
    document.location.reload(false);
    }
  }

repeat.onchange = function() {
    if(repeat.checked){
    document.location.reload(false);
  }
  else{
    document.location.reload(false);
    }
  }



// FONCTION SELECTION ALEATOIRE ORDI

function randomPicks(arr, newArr) {
  if(repeat.checked){
    for (var i = 0; i < 4; i++) {
    newArr.push(arr[Math.floor(Math.random() * arr.length)]);
  }
}
  else{
      while (newArr.length < 4){
    let rdm = Math.floor(Math.random() * arr.length);
    if(!newArr.includes(arr[rdm])){
       newArr.splice(0, 0, arr[rdm]);
    }
  }
  }
  }



// SIMULATION : SELECTION PAR L'HUMAIN 
/*
function randomHumanPicks(arr, newArr) {
  for (var i = 0; i < 4; i++) {
    newArr.push(arr[Math.floor(Math.random() * arr.length)]);
  }
}
*/

// TEST DU RESULTAT - COMPARAISON DES DEUX TABLEAUX 

function resultCheck(arr1, arr2){
  if(JSON.stringify(arr1)==JSON.stringify(arr2)){
    console.log("Feedback : Bravo, vous avez réussi !");
    feedback = ["black", "black", "black", "black"];
    alert("Bravo, vous avez réussi !");
    document.location.reload(false);
  }  
  else{
    for (var i = 0; i < 4; i ++){
      if (arr1[i]==arr2[i]){
        feedback.push("black");
      }
      else {
        if (arr1.includes(arr2[i])) {
          feedback.push("white");
        }
      }
    }
  }
  feedback.sort();
}


// SELECTION ALÉATOIRE DES COULEURS

if(holes.checked){

randomPicks(colorsNholes, selectedColors);


}
else{
randomPicks(colors, selectedColors);
document.getElementById("c8").style.display="none";
//randomHumanPicks(colors, selectedHumanColors);
//resultCheck(selectedColors, selectedHumanColors);

console.log("COULEUR A DEVINER : " + selectedColors);
//console.log(selectedHumanColors);
//console.log(feedback);

}


// CSS LOAD AUTO (NON-HUMAN)
document.body.onload = colorize;
function colorize () { 
  for (var i = 1; i < colorsNholes.length + 1; i++){
      var id = "c" + i;
      var idSelector = document.getElementById(id);
      idSelector.style.backgroundColor = colorsNholes[i-1];
  
    }

  for (var i = 1; i < selectedColors.length + 1; i++){
    var id = "r" + i;
    var idSelector = document.getElementById(id);
    idSelector.style.backgroundColor = selectedColors[i-1];
  }
  }

// FEEDBACK

function feedbackDisplay(){
        for (var i = 1; i < feedback.length + 1; i++){
          console.log(feedback.length);
            var id = "f" + i;
            var idSelector = document.getElementById(id);
            idSelector.style.backgroundColor = feedback[i-1];
        }
      }
  
// PICKUP COLORS

let userAttempts = 1;
let colorSelectionIndex = 0;
function userSelection(currentColor) {


  if(repeat.checked){
    console.log("REPETITIONS ACTIVEES")
    colorSelectionIndex ++;
    var id = "c" + userAttempts + colorSelectionIndex;
    var changingColor = document.getElementById(id);
    changingColor.style.backgroundColor = currentColor;
    selectedHumanColors.push(currentColor);


      if(colorSelectionIndex == 4){
      console.log(selectedHumanColors);
      colorSelectionIndex = 0;
      userAttempts ++;
      resultCheck(selectedColors, selectedHumanColors);
      selectedHumanColors = [];
      console.log(feedback);
      feedbackDisplay();
      feedback = [];

      }

      if(userAttempts == 11){
        alert("Gameover :'( ;-)")
        document.location.reload(false);
      } 

  }

  else{
    
    colorSelectionIndex ++;
    var id = "c" + userAttempts + colorSelectionIndex;
    var changingColor = document.getElementById(id);

    
    if(!selectedHumanColors.includes(currentColor)){
      changingColor.style.backgroundColor = currentColor;
      selectedHumanColors.push(currentColor);

            if(colorSelectionIndex == 4){
      console.log(selectedHumanColors);
      colorSelectionIndex = 0;
      userAttempts ++;
      resultCheck(selectedColors, selectedHumanColors);
      selectedHumanColors = [];
      console.log(feedback);
      feedbackDisplay();
      feedback = [];

      }

      if(userAttempts == 11){
        alert("Gameover :'( ;-)")
        document.location.reload(false);
      } 

      }
    else{
      colorSelectionIndex --;
    }

  }


  }

//CORRIGER / EFFACER LA SELECTION

function effacer(){

  if(colorSelectionIndex == 0){
      userAttempts --;
        for (var i = 1; i < 5; i++){
          var id = "c" + userAttempts + i;
          var changingColor = document.getElementById(id);
          changingColor.style.backgroundColor = "grey";
      }
  colorSelectionIndex = 0;
  selectedHumanColors = [];

  for (var i = 1; i < 5; i++){
          console.log(feedback.length);
            var id = "f" + i;
            var idSelector = document.getElementById(id);
            idSelector.style.backgroundColor = "lightgrey";
        }
    
    
  }
  else{  
    for (var i = 1; i < selectedHumanColors.length + 1; i++){
      var id = "c" + userAttempts + i;
      var changingColor = document.getElementById(id);
      changingColor.style.backgroundColor = "grey";
      }
  colorSelectionIndex = 0;
  selectedHumanColors = [];

}



}
