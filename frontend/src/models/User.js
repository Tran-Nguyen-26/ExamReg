export class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.studentCode = data.studentCode;
    this.fullname = data.fullname;
    this.gender = data.gender;
    this.className = data.className;
    this.major = data.major;
    this.faculty = data.faculty;
    this.role = data.role;
    this.firstLogin = data.firstLogin;
  }
  
  isStudent() {
    return this.role === 'STUDENT';
  }
  
  isAdmin() {
    return this.role === 'ADMIN';
  }
  
  needsPasswordChange() {
    return this.firstLogin === true;
  }
  
  getDisplayName() {
    return this.fullname || this.email;
  }
  
  static fromJSON(json) {
    return new User(json);
  }
}