export class PasswordValidation {
  async haveEightCharacters(password: string): Promise<boolean> {
    var hasEightCharacters = false

    if(password.length < 8){
      return hasEightCharacters;
    }

    hasEightCharacters = true

    return hasEightCharacters
  }

  async haveCapitalLetters(password: string): Promise<boolean> {
    var hasCapitalLetters = false
    var capitalLetters = /[A-Z]/;
    var countCapitalLetters = 0;

    for(var i=0; i<password.length; i++){
      if(capitalLetters.test(password[i])) {
        countCapitalLetters++;
      }
    }

    if(countCapitalLetters) {
      hasCapitalLetters = true
    }

    return hasCapitalLetters
  }

  async haveSmallLetters(password: string): Promise<boolean> {
    var hasSmallLetters = false
    var smallLetters = /[a-z]/;
    var countSmallLetters = 0;

    for(var i=0; i<password.length; i++){
      if(smallLetters.test(password[i])) {
        countSmallLetters++;
      }
    }

    if(countSmallLetters) {
      hasSmallLetters = true
    }

    return hasSmallLetters
  }

  async haveNumbers(password: string): Promise<boolean> {
    var hasNumbers = false
    var numbers = /[0-9]/;
    var countNumbers = 0;

    for(var i=0; i<password.length; i++){
      if(numbers.test(password[i])) {
        countNumbers++;
      }
    }

    if(countNumbers) {
      hasNumbers = true
    }

    return hasNumbers
  }

  async haveSpecialCharacters(password: string): Promise<boolean> {
    var hasSpecialCharacters = false
    var specialCharacters = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var countSpecialCharacters = 0;

    for(var i=0; i<password.length; i++){
      if(specialCharacters.test(password[i])) {
        countSpecialCharacters++;
      }
    }

    if(countSpecialCharacters) {
      hasSpecialCharacters = true
    }

    return hasSpecialCharacters
  }
}