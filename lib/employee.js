"use strict";

class Employee {
  constructor(name, id, email, title) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.title;
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
