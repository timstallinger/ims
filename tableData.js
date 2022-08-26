var companyX ={
    "employees": [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "phone": "29",
        "email": "JD@gmail.com",
        "function": "Management",
        "position": "CEO",
      },
      {
        "id": 10,
        "firstName": "Mary",
        "lastName": "Lamb",
        "phone": "29",
        "email": "MJ@gmail.com",
        "function": "Management",
        "position": "CEO",
      },
      {
        "id": 11,
        "firstName": "Michael",
        "lastName": "Smith",
        "phone": "29",
        "email": "MS@gmail.com",
        "function": "Management",
        "position": "CEO",
      },
      {
        "id": 12,
        "firstName": "Pablo",
        "lastName": "Sanchez",
        "phone": "29",
        "email": "PS@gmail.com",
        "function": "Management",
        "position": "CEO",
      },
      {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Doe",
        "phone": "24",
        "email": "JaneD@gmail.com",
        "function": "Management",
        "position": "CEO",
      },
      {
        "id": 3,
        "firstName": "Max",
        "lastName": "Mustermann",
        "phone": "45",
        "email": "MM@gmail.com",
        "function": "Purchases",
        "position": "X",
      },
      {
        "id": 4,
        "firstName": "Tim",
        "lastName": "Stallinger",
        "phone": "017647691335",
        "email": "tim@timit.dev",
        "function": "Administration",
        "position": "X",
      },
      {
        "id": 5,
        "firstName": "Katrin",
        "lastName": "Mustermann",
        "phone": "29",
        "email": "KM@gmail.com",
        "function": "Production",
        "position": "Team Leader",
      },
      {
        "id": 6,
        "firstName": "Ronald",
        "lastName": "McDonald",
        "phone": "55",
        "email": "RM@gmail.com",
        "function": "Logistics",
        "position": "X",
      },
      {
        "id": 7,
        "firstName": "John",
        "lastName": "Steward",
        "phone": "25",
        "email": "JS@gmail.com",
        "function": "Production",
        "position": "X",
      },
      {
        "id": 8,
        "firstName": "John",
        "lastName": "Kennedy",
        "phone": "030",
        "email": "JFK@gmail.com",
        "function": "Production",
        "position": "Manager",
      },
      {
        "id": 9,
        "firstName": "Aaron",
        "lastName": "Swift",
        "phone": "067243123123",
        "email": "JS@gmail.com",
        "function": "Production",
        "position": "X",
      }
    ]
  }

const editButton = '<a href="https://ims.site.localhost/docs/strategy/#"class="btn btn-primary btn-sm"style="height: 30px;"><i class="fa fa-pencil"></i></a>';

// Konfigurationsarray mit Bools, ob entsprechendes Attribut in Tabelle und Card angezeigt werden soll
var config = {table:true,
  firstName:true,
  lastName:true,
  function:true,
  email:true,
  position:true,
  phone:true,
};

function loadInCard(employee,fun){
  // Employee in entsprechende Card laden

  var position = document.getElementById(fun);
  var keys = Object.keys(employee);
  var values = ""
  for(var i = 3; i < keys.length; i++){
    // if keys[i] does not match any entry in config, do something
    if(config[keys[i]]){
      values += `<p style="text-align:center;">${keys[i]}: ${employee[keys[i]]}</p>`;
    }
  }

  // In html kommen die Kontaktdetails für jede angestellte Person
  var html = ``
  // Wenn Funktion Management ist, dann können 2 cards nebeneinander, sonst nur eine
  html = `
    <div style="padding-top:20px;${(fun == "Management")? "width: 50%; float:left;" :""}">
      <h6 style="text-align:center;">${employee["firstName"]} ${employee["lastName"]}</h6>
      ${values}
    </div>
    `;
  position.innerHTML+=html;
}

function loadEmployees(data) {
  var table = document.getElementById('table-user-input-8');
  data = companyX["employees"];

  data.forEach( item => {
    // Die folgenden Zeilen sind nur für die untere Tabelle des Management Boards
    /*let row = table.insertRow();
    let firstName = row.insertCell(0);
    firstName.innerHTML = item["firstName"];
    let lastName = row.insertCell(1);
    lastName.innerHTML = item["lastName"];
    let fun = row.insertCell(2);
    fun.innerHTML = item["function"];
    let email = row.insertCell(3);
    email.innerHTML = item["email"];
    let phone = row.insertCell(4);
    phone.innerHTML = item["phone"];
    */
    //loadPosition lädt jede Person in entsprechende Card
    loadInCard(item, item["function"]);
  });
}

function showColumns() {
  // Wird aufgerufen, wenn eine checkbox sich ändert
  // Hier werden die Spalten der Tabelle angezeigt, nur falls chechbox gecheckt ist. UND anschließened wird reloadCards ausgelöst

  // Get the checkbox values
  /*var table = document.getElementById('table-user-input-8');
  config["firstName"] = document.getElementById("subscribeFName").checked;
  config["lastName"] = document.getElementById("subscribeLName").checked;
  config["function"] = document.getElementById("subscribeFunction").checked;
  config["email"] = document.getElementById("subscribeEmail").checked;
  config["phone"] = document.getElementById("subscribePhone").checked;
  
  //display corresponding columns if checkbox is checked
  for (var i = 0, row; row = table.rows[i]; i++) {
    if(i!=2 && i!=1){
      row.cells[0].style.display = config["firstName"] ? "" : "none";
      row.cells[1].style.display = config["lastName"] ? "" : "none";
      row.cells[2].style.display = config["function"] ? "" : "none";
      row.cells[3].style.display = config["email"] ? "" : "none";
      row.cells[4].style.display = config["phone"] ? "" : "none";
    }
  }*/
  
  // reloadPosition um die Cards zu aktualisieren
  reloadCards();
}


function reloadCards() {
  // Jede Card leeren
  var functions = ["Administration","Logistics","Production","Purchases","Management"];
  functions.forEach(function(fun){
    var position = document.getElementById(fun);
    position.innerHTML = "";
  },this);

  // Cards neu befüllen
  var data = companyX["employees"];
  data.forEach( item => {    
    //loadPosition lädt jede Person in entsprechende Card
    loadInCard(item, item["function"]);
  });
}