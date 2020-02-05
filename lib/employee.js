"use strict";

class Employee {
  constructor(name, id, title) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.role = "Employee";
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
    return this.role;
  }
}
const employee = new Employee();
module.export = Employee;
