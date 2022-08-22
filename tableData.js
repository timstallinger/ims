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
function loadPosition(employee,fun){
  // Employee in entsprechende Card laden

  var position = document.getElementById(fun);
  var keys = Object.keys(employee);
  var values = ""
  for(var i = 3; i < keys.length; i++){
    if (keys[i] != "function"){
      values += `<p style="text-align:center;">${keys[i]}: ${employee[keys[i]]}</p>`;
    }
  }
  
  // In html kommen die Kontaktdetails für jede angestellte Person
  var html = ``
  // Wenn Funktion Management ist, dann können 2 cards nebeneinander, sonst nur eine
  html = `
    <div class="card" style="padding-top:20px;${(fun == "Management")? "width: 50%; float:left;" :""}">
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
    let row = table.insertRow();
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
    
    //loadPosition lädt jede Person in entsprechende Card
    loadPosition(item, item["function"]);
  });
}
function showColumns() {
  // Hier werden die Spalten der Tabelle angezeigt, nur falls chechbox gecheckt ist.

  // Get the checkbox values
  var table = document.getElementById('table-user-input-8');
  var sfName = document.getElementById("subscribeFName");
  var slName = document.getElementById("subscribeLName");
  var sFunction = document.getElementById("subscribeFunction");
  var sEmail = document.getElementById("subscribeEmail");
  var sPhone = document.getElementById("subscribePhone");
  
  //display corresponding columns
  for (var i = 0, row; row = table.rows[i]; i++) {
    if(i!=2 && i!=1){
      row.cells[0].style.display = sfName.checked == true ? "" : "none";
      row.cells[1].style.display = slName.checked == true ? "" : "none";
      row.cells[2].style.display = sFunction.checked == true ? "" : "none";
      row.cells[3].style.display = sEmail.checked == true ? "" : "none";
      row.cells[4].style.display = sPhone.checked == true ? "" : "none";
    }
  }
}