"use strict";
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const inquirer = require("inquirer");
const questions = require("./allQuestions/questions");
const internQuestions = require("./allQuestions/intern-questions");
const engineerQuestions = require("./allQuestions/engineer-questions");
const addEmployeeQuestions = require("./allQuestions/add-employee");
const managerQuestions = require("./allQuestions/manager-questions");
const fs = require("fs");
// const github = require("octonode");
// const client = github.client();
const theTeam = [];

// initialBuild prompts the initial questions and pushes them to into the theTeam obj
// and finally it calls addEmployee() to start building Employees

async function initialBuild() {
  try {
    const naming = await inquirer.prompt(questions);
    theTeam.push(naming);
    initialHTML(naming);
  } catch (err) {
    console.log(err);
  }
  addManager();
}
// addEmployee prompts users if they would like to add another employee
// then it goes on to act upon the user's response appropriately
async function addEmployee() {
  try {
    const buildEmployee = await inquirer.prompt(addEmployeeQuestions);
    // console.log(buildEmployee);
    if (buildEmployee.newemployee === "Engineer") {
      addEngineer();
    } else if (buildEmployee.newemployee === "Intern") {
      addIntern();
    } else {
      console.log(theTeam);
      closeTags();
    }
  } catch (err) {
    console.log(err);
  }
}

// these both prompt relevant questions and add each new employee into the theTeam obj
async function addIntern() {
  try {
    const newIntern = await inquirer.prompt(internQuestions);
    console.log(newIntern);
    theTeam.push(
      new Intern(
        newIntern.name,
        newIntern.id,
        newIntern.email,
        newIntern.school
      )
    );
    createEmployeeCard(
      new Intern(
        newIntern.name,
        newIntern.id,
        newIntern.email,
        newIntern.school
      )
    );
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}
async function addEngineer() {
  try {
    const newEngineer = await inquirer.prompt(engineerQuestions);
    // console.log(newEngineer);
    theTeam.push(
      new Engineer(
        newEngineer.name,
        newEngineer.id,
        newEngineer.email,
        newEngineer.github
      )
    );
    createEmployeeCard(
      new Engineer(
        newEngineer.name,
        newEngineer.id,
        newEngineer.email,
        newEngineer.github
      )
    );
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}
async function addManager() {
  try {
    const groundTeam = await inquirer.prompt(managerQuestions);
    theTeam.push(
      new Manager(
        groundTeam.name,
        groundTeam.email,
        groundTeam.id,
        groundTeam.office
      )
    );
    createEmployeeCard(
      new Manager(
        groundTeam.name,
        groundTeam.email,
        groundTeam.id,
        groundTeam.office
      )
    );
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}
function initialHTML(naming) {
  const frame = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <script
          src="https://kit.fontawesome.com/d7576195fc.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

    
        <title>Team Profile</title>
      </head>
      <body>
        <div id="team" class="container-fluid">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Management_Hierarchy_Flat_Icon.svg/1024px-Management_Hierarchy_Flat_Icon.svg.png"
            height="100px"
            width="100px"
          />
          <h1 id="displayTeamName">${naming.unique}</h1>
        </div>
  
        <div id="displayteam" class="container-fluid">

    `;
  fs.writeFile("./output/team.html", frame, function(err) {
    if (err) {
      console.error(err);
    }
  });
}

const createEmployeeCard = card => {
  const name = card.getName();
  const role = card.getRole();
  const id = card.getId();
  const email = card.getEmail();

  let employeeCardStyled = "";
  return new Promise((resolve, reject) => {
    if (role === "Intern") {
      const school = card.getSchool();
      employeeCardStyled = `         
       <div class="employeecard" class="card" style="width: 18rem;"> 
      <div id="head">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Intern</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fab fa-mailchimp fa-2x"></i>${email}
      </li>
      <li class="list-group-item">
        <i class="fas fa-building fa-2x"></i>${id}
      </li>
      <li class="list-group-item ">
        <i class="fas fa-id-badge fa-2x"></i>${school}
      </li>
    </ul>
    </div>`;
    } else if (role === "Engineer") {
      const gitUser = card.getGithub();
      employeeCardStyled = `          
      <div class="employeecard" class="card" style="width: 18rem;"> 
      <div id="head">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Engineer</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fab fa-mailchimp fa-2x"></i>${email}
      </li>
      <li class="list-group-item">
        <i class="fas fa-building fa-2x"></i>${id}
      </li>
      <li class="list-group-item ">
        <i class="fas fa-id-badge fa-2x"></i><a href="https://github.com/${gitUser.trim()}">${gitUser}</a>
      </li>
    </ul>
    </div>`;
    } else if (role === "Manager") {
      const office = card.getOfficeNumber();
      employeeCardStyled = `
      <div class="employeecard" class="card" style="width: 18rem;"> 
      <div id="head">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Manager</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fab fa-mailchimp fa-2x"></i>${id}
      </li>
      <li class="list-group-item">
        <i class="fas fa-building fa-2x"></i>${email}
      </li>
      <li class="list-group-item">
        <i class="fas fa-id-badge fa-2x"></i>${office}
      </li>
    </ul>
    </div>`;
    }
    fs.appendFile("./output/team.html", employeeCardStyled, function(err) {
      if (err) {
        return reject(err);
      }
    });
  });
};

const closeTags = () => {
  const closingHTML = `
  </div>
  <style>
    #team {
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: #233240;
      color: white;
      width: 100%;
      padding: 20px;
      font-size: 3em;
    }
    #displayteam {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
    }
    .employeecard {
      border: 1px solid lightgrey;
      margin: 3%;
    }
    .fas,
    .fab {
      margin: 10px;
    }
    .card-title,
    .card-subtitle {
      margin: 20px;
    }
    .card-subtitle {
      border-bottom: 1px solid lightgray;
      padding-bottom: 10px;
    }
    .employeecard{
      opacity:0.7;
    }
    .employeecard:hover{
      opacity:1;
    }
  </style>
</body>
</html>`;
  fs.appendFile("./output/team.html", closingHTML, function(err) {
    if (err) {
      console.error(err);
    }
  });
};
// launch chaos
initialBuild();
