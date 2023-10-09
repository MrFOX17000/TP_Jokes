const url = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

// Récupération du bouton générer/liker et du tableau html et du compteur de like
const generateButton = document.getElementById("button");
const clearButton = document.getElementById("clear");
const tableBody = document.getElementById("table-body");

// Fonction pour ajouter une ligne au tableau (blague + supprimer)
function addRow(blague, reponse) {
  const newRow = tableBody.insertRow();
  const blagueCell = newRow.insertCell(0);
  const reponseCell = newRow.insertCell(1);
  const likeCell = newRow.insertCell(2);
  const supprimerCell = newRow.insertCell(3);

  blagueCell.textContent = blague;
  reponseCell.textContent = reponse;

  // Créez une image "Supprimer" et ajoutez-la à la cellule "Supprimer"
  const supprimerImage = document.createElement("img");
  supprimerImage.src = "../static/supprimer.png"; //chemin de l'image 
  supprimerImage.alt = "Supprimer";
  supprimerImage.style.cursor = "pointer"; // Ajoute un style de curseur pour montrer que c'est un lien

  supprimerImage.addEventListener("click", function () {
    // Supprimez la ligne concernée lorsque son image "supprimer" est cliquée
    tableBody.deleteRow(newRow.rowIndex-1);
  });

  supprimerCell.appendChild(supprimerImage);

  // Créez une image "aimer" et ajoutez-la à la cellule "Like"
  const likeImage = document.createElement("img");
  likeImage.src = "../static/like.png";
  likeImage.alt = "Liker";
  likeImage.style.cursor = "pointer"; // Ajoute un style de curseur pour montrer que c'est un lien

  likeImage.addEventListener("click", function () {
    if (!likeImage.classList.contains("liked")) {
      // Incrémente le compteur de likes lorsque l'image "like" est cliquée
      const nbrLikeElement = newRow.querySelector(".nbr-like");
      let currentLikeCount = parseInt(nbrLikeElement.textContent, 10);
      currentLikeCount++;
      nbrLikeElement.textContent = currentLikeCount;

      // Désactive le bouton "like" et change sa couleur après le clic
      likeImage.classList.add("liked");
      likeImage.style.filter = "grayscale(100%)"; // Applique un filtre grisâtre
      likeImage.style.pointerEvents = "none"; // Désactive le fait de cliquer
    }
  });

  likeCell.appendChild(likeImage);
  // Ajoutez une classe pour différencier les compteurs de likes
  const nbrLikeSpan = document.createElement("span");
  nbrLikeSpan.className = "nbr-like";
  nbrLikeSpan.textContent = "0";
  likeCell.appendChild(nbrLikeSpan);
}


//fonction qui clear l'élément html tablebody, c'est à dire notre tableau
function clearTableBody(){
  tableBody.innerHTML = '';
};

// Fonction pour générer une blague et l'ajouter au tableau
function generateAndAddBlague() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(data => {
      let blague = data.setup;
      let reponse = data.delivery;
      addRow(blague, reponse);
    });
}

// appel de la fonction générer blague au click de la souris sur le bouton
generateButton.addEventListener("click", generateAndAddBlague);
//appel de la fonction clear au click de la souris sur le bouton
clearButton.addEventListener("click", clearTableBody);