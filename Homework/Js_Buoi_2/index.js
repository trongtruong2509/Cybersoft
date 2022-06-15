// Display exercise funcs
function printExercise(exercise, input, func) {
    console.log(`---------------> Result for exercise ${exercise}: <---------------`);
    console.log(`Input:`);
    console.log(input);
    console.log(`Output:`);
    func(input);
    console.log('');
}

// Exercise 1:
function printArray() {
    for (let x = 0; x < 100; x = x + 10) {
        let row = '';
    
        for (let index = 1; index < 11; index++) {
            const current = index + x;
    
            if (current < 10) {
                row += ` 0${current}`
            } else {
                row += ` ${current}`
            }
    
        }
        
        console.log(row);
    }
}

// Exercise 2:
function findPrimeNumber(input) {
    input.forEach(num => {
        let isPrime = true;

        if (num > 1) {
            for (let index = 2; index < num; index++) {
                if (num % index === 0) {
                    isPrime = false;
                    break;
                }
            }
        }

        if (isPrime) {
            console.log(num);
        }
    })
}

// Exercise 3 
function calcSum(num) {
    let sum = 2 * num;
    for (let index = 2; index < num + 1; index++) {
        sum += index;
    }

    console.log(sum);
}

// Exercise 4
function calcDivisor(num) {
    let divisors = []
    for (let index = 1; index < num / 2 + 1; index++) {
        if (num % index === 0) {
            divisors.push(index);
        }
    }

    console.log(divisors);
}

// Exercise 5
function reverseNumber(num) {
    let reserve = ''
    const strArr = Array.from(num.toString());
    for (let index = strArr.length - 1; index >= 0; index--) {
        reserve += strArr[index];
    }

    console.log(reserve);
}

// Exercise 6
function findMaxIn() {
    let total = 0;
    let max = 0;

    for (let index = 1; index < 100; index++) {
        total += index;
        
        if (total >= 100) {
            max = index;
            break;
        }
    }

    console.log(`Max interger that 1 + 2 + 3 + ... + max >= 100 is: ${max}`);
}

// Exercise 7
function printMultiplication(num) {
    for (let index = 0; index < 11; index++) {
        console.log(`${num} x ${index} = ${num * index}`);
    }
}

// Exercise 8
const cards = ["4K", "KH", "5C", "KA", "QH", "KD", "2H", "10S", "AS", "7H", "9K", "10D"]

function didiveCards(cards) {
    filterItems = (arr, position) => {
        let output = [];
        for (let index = position; index < arr.length; index +=4) {
            output.push(arr[index]);        
        }
        
        return output;
    }
    
    let players = [ filterItems(cards, 0), filterItems(cards, 1), filterItems(cards, 2), filterItems(cards, 3) ];

    console.log(players)
}

// Exercise 9 
function findDogChickens(input) {
    // x + y = m
    // 4x + 2y = n
    // => x = (n - 2m) / 2
    const m = input[0];
    const n = input[1];

    const dogs = (n - 2 * m) / 2;

    console.log(`Total Dog is: ${dogs}`);
    console.log(`Total Chicken is: ${m - dogs}`);
}

// Exercise 10
function calcAngle(time) {
    let [hour, mins] = time.split(':');

    if (hour == 12) {
        hour = 0;
    }

    console.log(`Angle between hour hand and min hand is: ${Math.abs(6 * mins - 30 * hour)} degree`)
}

// Execute all exercises:
printExercise(1, null, printArray);
printExercise(2, [2, 7, 9, 4252, 2472472896], findPrimeNumber);
printExercise(3, 10, calcSum);
printExercise(4, 12, calcDivisor);
printExercise(5, 5798275893124, reverseNumber);
printExercise(6, null, findMaxIn);
printExercise(7, 5, printMultiplication);
printExercise(8, cards, didiveCards);
printExercise(9, [36, 100], findDogChickens);
printExercise(10, '6:10', calcAngle);


