/**
 * Credit Card Checker
 * 15th of may, 2021
 * by Mikheltodd
 *
 * This is a project proposed by Codecademy for JavaScript practice.
 * It requires to create some functions for evaluating credit cards numbers using the Luhn's Algorithm.
 * Some data are given to test the functions.
 * Testing of functions appear as comments.
 */

// Some valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// Some invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Some credit card number that can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

/**
 * validateCred function
 * This function implements Luhn's algorithm:
 * - Starting from the farthest digit to the right, AKA the check digit, iterate to the left.
 * - As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, substract 9 from its value.
 * - Sum up all the digits in the credit card number.
 * - If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it's invalid.
 */
const luhnsSum = (array) => {
  let s_check = true;
  let sum_check = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (s_check) {
      sum_check += array[i];
    } else {
      let sum_val = array[i] * 2;
      if (sum_val > 9) {
        sum_check += sum_val - 9;
      } else {
        sum_check += sum_val;
      }
    }
    s_check = !s_check;
  }
  return sum_check;
};

const validateCred = (array) => {
  sum_check = luhnsSum(array);
  // console.log(
  //   `Credit Card Numbers: ${array}; \nLuhn's sum: ${sum_check}; \nValid Number?: ${
  //     sum_check % 10 == 0
  //   }`
  // );
  return sum_check % 10 == 0;
};

/**
 * Testing of validateCred
 */
// for (let key in batch) {
//   console.log(validateCred(batch[key]));
// }

/**
 * findInvalidCards function
 * It takes a nested array of credit card numbers and returns an array of the invalid ones.
 */
const findInvalidCards = (batch) => {
  let invalidCards = [];
  for (let key in batch) {
    if (!validateCred(batch[key])) {
      invalidCards.push(batch[key]);
    }
  }
  return invalidCards;
};

/**
 * Testing findInvalidCards
 */
// console.log("Invalid Card Numbers: ");
// let invalidCardsFound = findInvalidCards(batch);
// for (let card in invalidCardsFound) {
//   console.log(invalidCardsFound[card].join(""));
// }

/**
 * idInvalidCardCompanies function
 * Identify the credit card companies that have possible issued faulty numbers.
 */
const idInvalidCardCompanies = (batch) => {
  let companies = [];
  let invalidCardNumbers = findInvalidCards(batch);
  for (let key in invalidCardNumbers) {
    let firstDigit = invalidCardNumbers[key][0];
    let company = "Company not found";
    switch (firstDigit) {
      case 3:
        company = "Amex (American Express)";
        break;
      case 4:
        company = "Visa";
        break;
      case 5:
        company = "Mastercard";
        break;
      case 6:
        company = "Discover";
        break;
    }
    if (!companies.includes(company)) {
      companies.push(company);
    }
  }
  return companies;
};

/**
 * Testing of idInvalidCardCompanies
 */
// console.log("Companies with invalid Card Numbers: ");
// let invalidCardsFound = findInvalidCards(batch);
// let invalidCardsCompanies = idInvalidCardCompanies(invalidCardsFound);
// for (let company in invalidCardsCompanies) {
//   console.log(`- ${invalidCardsCompanies[company]}`);
// }

/**
 * strToCardNumber function
 * This function takes a string of numbers and converts it in an array of numbers.
 */
// const strToCardNumber = (strNumber) => {
//   let cardNumber = [];
//   let number = parseInt(strNumber);
//   let n = strNumber.length;
//   for (let i = 0; i < n; i++) {
//     cardNumber.push(Math.floor((number / Math.pow(10, n - 1 - i)) % 10));
//   }
//   return cardNumber;
// };

// V2.0 (Following lucic4869336290 suggestion)

const strToCardNumber = (strNumber) => {
  let cardNumber = [];
  let n = strNumber.length;
  for (let i = 0; i < n; i++) {
    cardNumber.push(parseInt(strNumber[i]));
  }
  return cardNumber;
};

/**
 * Testing of strToCardNumber
 */
// let strCard = "456789123";
// let numCard = strToCardNumber(strCard);
// console.log(numCard);

/**
 * Testing of credit card validation using string numbers
 */
let strCard = "4929202922194644";
let numCard = strToCardNumber(strCard);
console.log(strCard);
console.log(numCard);
console.log(validateCred(numCard));

/**
 * invalidToValid function
 * This functions convert an invalid number into a valid card number
 */
const invalidToValid = (array) => {
  let newArray = array;
  let remainder = luhnsSum(array) % 10;
  let modifier = remainder > 5 ? 10 - remainder : -remainder;
  let checkDigit = array.length - 1;
  // console.log(`Remainder: ${remainder}`);
  // console.log(`Modifier: ${modifier}`);
  while (!validateCred(newArray) && checkDigit >= 0) {
    let currentCheckValue = newArray[checkDigit] + modifier;
    if (currentCheckValue >= 0 && currentCheckValue <= 9) {
      newArray[checkDigit] += modifier;
    } else {
      if (newArray[checkDigit] + modifier < 0) {
        modifier -= newArray[checkDigit];
      } else {
        modifier += newArray[checkDigit];
      }
      newArray[checkDigit] = 0;
      checkDigit -= 1;
    }
    checkDigit -= 1;
  }
  if (checkDigit == 0) {
    console.log("Fail");
  }
  return newArray;
};

/**
 * Testing of invalid to valid
 */
// for (let n in batch) {
//   if (!validateCred(batch[n])) {
//     console.log("Original Invalid Card Number: ");
//     console.log(batch[n].join(" "));
//     console.log("Converted Card Number: ");
//     console.log(invalidToValid(batch[n]).join(" ") + "\n");
//   }
// }
