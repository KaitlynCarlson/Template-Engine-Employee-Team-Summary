"use strict";
const Employee = require("./employee");
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.name = name;
    this.id = id;
    this.emai = email;
    this.school = school;
  }
  getRole() {
    return "Intern";
  }
  getSchool() {
    return this.school;
  }
}
const intern = new Intern();
module.exports = Intern;
