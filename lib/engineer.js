"use strict";
const Employee = require("./employee");
const github = require("octonode");
const client = github.client();

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.name = name;
    this.id = id;
    this.email = email;
    this.github = github;
  }
  getRole() {
    return "Engineer";
  }
  getGithub() {
    return this.github;
  }
}
const engineer = new Engineer();
module.exports = Engineer;
