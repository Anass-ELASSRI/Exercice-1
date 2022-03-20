// create id for user
var getRandomId = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

let createDeleteButton = (id) => {
  // Create button element
  var deleteButton = document.createElement("button");
  // Add user id to button
  deleteButton.setAttribute("id", id);
  // Add click event to button
  deleteButton.addEventListener(
    "click",
    function () {
      let index = users.findIndex((o) => o.id === this.id);
      //remove user from array
      users.splice(index, 1);
      // Remove user from page
      this.parentElement.parentElement.remove();
      // show users array
      console.log(users);
      setTimeout(function () {
        alert("User deleted !!");
      }, 100); //displays msg in 100 millisecond
    },
    false
  );

  // create td element
  var cell = document.createElement("td");
  // create image element
  let img = document.createElement("img");
  // Add source to img element
  img.src = "trash.png";

  // Add icone trash to button
  deleteButton.appendChild(img);
  return deleteButton;
};

let isValidData = (data) => {
  if (data.length > 0){
    return true;
  }else{
    return false;
  }
};

// Check if Data Complete
let checkData = (nom, prenom, nomUtilisateur, matricule, dateCreation, status)=>{
  if (isValidData(nom) && isValidData(prenom) && isValidData(nomUtilisateur) && isValidData(matricule) && isValidData(dateCreation) && isValidData(status)){
    return true;
  }else{
    return false;
  }
};

// make inputs empty
let makeModalEmpty = ()=>{
  document.getElementById("nom").value = '';
  document.getElementById("prenom").value = '';
  document.getElementById("nomUtilisateur").value = '';
  document.getElementById("dateCreation").value = '';
  document.getElementById("etat").value = '';
  document.getElementById("matricule").value = '';
};


let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];

var statusClasses = [];
statusClasses["En validation"] = "on-validation";
statusClasses["Validé"] = "valide";
statusClasses["Rejeté"] = "rejected";

// where we insert data
var dataContainer = document.getElementById("usersData");
// Loop in the users to print the data
users.forEach((user) => {
  var row = document.createElement("tr");
  for (var i = 0; i < 7; i++) {
    // Get the key of index
    let key = Object.keys(user)[i];

    // create td element
    var cell = document.createElement("td");

    // Get custom cell data
    if (key == "createdDate") {
      let dateObject = new Date(user[key]);
      var cellText = document.createTextNode(dateObject.toLocaleDateString());
      cell.appendChild(cellText);
    } else if (key == "status") {
      var span = document.createElement("span");
      span.className = "badge";
      var badgeContent = document.createTextNode(user[key]);
      span.appendChild(badgeContent);
      cell.appendChild(span);
      cell.className = statusClasses[user[key]];
    } else {
      var cellText = document.createTextNode(user[key]);
      cell.appendChild(cellText);
    }
    // add cell to row
    row.appendChild(cell);
  }

  // Create td element
  var cell = document.createElement("td");

  // create delete buton
  let deleteButton = createDeleteButton(user[Object.keys(user)[0]]);

  // Add button to td element
  cell.appendChild(deleteButton);

  // Add td to row
  row.appendChild(cell);

  //row added to end of table body
  dataContainer.appendChild(row);
});

// Modal script
// Get the modal
var modal = document.getElementById("add-modal");

// Get the button that opens the modal
var btn = document.getElementById("add-button");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Enregistrer script

// Get save button
var save = document.getElementById("save-button");

// When the user clicks on the save button
save.onclick = function () {
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var nomUtilisateur = document.getElementById("nomUtilisateur").value;
  var dateCreation = document.getElementById("dateCreation").value;
  var etat = document.getElementById("etat").value;
  var matricule = document.getElementById("matricule").value;
  var id;
  
  if (! checkData(nom, prenom, nomUtilisateur, matricule, dateCreation, etat)){
    setTimeout(function () {
      alert("Les données ne sont pas complètes !!");
    }, 100); //displays msg in 100 millisecond

    return
  }


  // Get id that is not existe in users data
  let notExiste = true;
  while (notExiste) {
    id = getRandomId(9);
    if (users.findIndex((o) => o.id === id) == -1) {
      notExiste = false;
    } else {
      id = getRandomId(9);
    }
  }

  var user = new Object();
  user["id"] = id;
  user["createdDate"] = dateCreation;
  user["status"] = etat;
  user["lastName"] = nom;
  user["firstName"] = prenom;
  user["userName"] = nomUtilisateur;
  user["registrationNumber"] = matricule;

  users.push(user);

  // display users array in console
  console.log(users);

  // Add user to the page
  var row = document.createElement("tr");
  for (var i = 0; i < 7; i++) {
    // Get the key of index
    let key = Object.keys(user)[i];
    // create td element
    var cell = document.createElement("td");

    // Get custom cell data
    if (key == "status") {
      var span = document.createElement("span");
      span.className = "badge";
      var badgeContent = document.createTextNode(user[key]);
      span.appendChild(badgeContent);
      cell.appendChild(span);
      cell.className = statusClasses[user[key]];
    } else {
      var cellText = document.createTextNode(user[key]);
      cell.appendChild(cellText);
    }
    // add cell to row
    row.appendChild(cell);
  }
  var cell = document.createElement("td");
  let deleteButton = createDeleteButton(id);
  // Add button to td element
  cell.appendChild(deleteButton);

  // Add td to row
  row.appendChild(cell);

  //row added to end of table body
  dataContainer.appendChild(row);

  // close the modale
  modal.style.display = "none";
  nom = null;
  setTimeout(function () {
    alert("Utilisateur ajouté avec success !!");
  }, 100); //displays msg in 100 millisecond
  makeModalEmpty();
};
