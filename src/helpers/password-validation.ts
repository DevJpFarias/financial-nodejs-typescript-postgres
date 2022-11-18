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

  async isValidPassword(password: string): Promise<boolean> {
    var isValid = false;
    var capital_letters = /[A-Z]/;
    var small_letters = /[a-z]/;
    var numbers = /[0-9]/;
    var special_characters = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if(password.length < 8){
      return isValid;
    }

    var auxCapitalLetters = 0;
    var auxSmallLetters = 0;
    var auxNumbers= 0;
    var auxEspecial = 0;

    for(var i=0; i<password.length; i++){
      if(capital_letters.test(password[i])) {
        auxCapitalLetters++;
      }
  
      else if(small_letters.test(password[i])) {
        auxSmallLetters++;
      }
  
      else if(numbers.test(password[i])) {
        auxNumbers++;
      }
  
      else if(special_characters.test(password[i])) {
        auxEspecial++;
      }
    }

    if (auxCapitalLetters > 0){
      if (auxSmallLetters > 0){
        if (auxNumbers > 0){
          if (auxEspecial) {
            isValid = true;
          }
        }
      }
    }

    return isValid
  }
}