class User {
    constructor(firstName, lastName, email, squadron, flight, passwordHash) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.squadron = squadron;
      this.flight = flight;
      this.passwordHash = passwordHash;
    }
  }
  
  module.exports = User;