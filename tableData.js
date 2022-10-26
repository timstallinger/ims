var companyX = {
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

class Orgchart {
    constructor(target, config) {
        this.container = target;
        this.config = config || {
            firstName: true,
            lastName: true,
            function: true,
            email: true,
            position: true,
            phone: true,
        };

        this.container.innerHTML = `<div class="row">
	<div class="col-md-12">
		<div class="text-center">
			<h1 id="CompanyName">Company name</h1>
			<h6 id="CompanyLocation">location</h6>
		</div>
	</div>
</div>
<div class="row justify-content-md-center mb-4">
	<div class="col-md-5">
		<div class="card">
			<div class="card-header bg-dark">Management board</div>
			<div class="card-body">
				<div id="Management">
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-sm-6 col-md-3">
		<div class="card">
			<div class="card-header bg-dark">Purchases</div>
			<div class="card-body">
				<div id="Purchases">
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-md-3">
		<div class="card">
			<div class="card-header bg-dark">Logistics</div>
			<div class="card-body">
				<div id="Logistics">
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-md-3">
		<div class="card">
			<div class="card-header bg-dark">Production</div>
			<div class="card-body">
				<div id="Production">
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-md-3">
		<div class="card">
			<div class="card-header bg-dark">Administration</div>
			<div class="card-body">
				<div id="Administration">
				</div>
			</div>
		</div>
	</div>
</div>`;
    }

    loadInCard(employee, fun) {
        var position = document.getElementById(fun);
        var keys = Object.keys(employee);
        var values = ""
        for (var i = 3; i < keys.length; i++) {
            // if keys[i] does not match any entry in config, do something
            if (this.config[keys[i]]) {
                values += `<p style="text-align:center;">${keys[i]}: ${employee[keys[i]]}</p>`;
            }
        }

        // In html kommen die Kontaktdetails für jede angestellte Person
        var html = ``
        // Wenn Funktion Management ist, dann können 2 cards nebeneinander, sonst nur eine
        html = `
    <div class="mb-3" style="${(fun === "Management") ? "width: 50%; float:left;" : ""}">
      <h6 style="text-align:center;">${employee["firstName"]} ${employee["lastName"]}</h6>
      ${values}
    </div>
    `;
        position.innerHTML += html;
    }

    render(data) {
        // Jede Card leeren
        var functions = ["Administration", "Logistics", "Production", "Purchases", "Management"];
        functions.forEach(function (fun) {
            var position = document.getElementById(fun);
            position.innerHTML = "";
        }, this);

        // Cards neu befüllen
        data['employees'].forEach(item => {
            //loadPosition lädt jede Person in entsprechende Card
            this.loadInCard(item, item["function"]);
        });
    }
}
