"use strict";

class Employee {
  constructor(name, id, email, title) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }

  getRole() {
    return "Employee";
  }
  getEmail() {
    return this.email;
  }
}
const employee = new Employee();
module.exports = Employee;
