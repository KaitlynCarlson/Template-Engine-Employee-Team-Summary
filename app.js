"use strict";

const inquirer = require("inquirer");
const questions = require("./allQuestions/questions");
const internQuestions = require("./allQuestions/intern-questions.json");
const engineerQuestions = require("./allQuestions/engineer-questions");
const addEmployeeQuestions = require("./allQuestions/add-employee");
const theTeam = [];

async function initialBuild() {
  try {
    const groundTeam = await inquirer.prompt(questions);
    theTeam.push(groundTeam);
    console.log(groundTeam);
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}
async function addEmployee() {
  try {
    const buildEmployee = await inquirer.prompt(addEmployeeQuestions);
    console.log(buildEmployee);
    if (buildEmployee.newemployee === "Engineer") {
      addEngineer();
    } else if (buildEmployee.newemployee === "Intern") {
      addIntern();
    } else {
      console.log(theTeam);
      return "Team complete";
    }
  } catch (err) {
    console.log(err);
  }
}
async function addIntern() {
  try {
    const newIntern = await inquirer.prompt(internQuestions);
    console.log(newIntern);
    theTeam.push(newIntern);
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}
async function addEngineer() {
  try {
    const newEngineer = await inquirer.prompt(engineerQuestions);
    console.log(newEngineer);
    theTeam.push(newIntern);
  } catch (err) {
    console.log(err);
  }
  addEmployee();
}

initialBuild();
