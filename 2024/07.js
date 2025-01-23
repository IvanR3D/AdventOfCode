// Part 1
const code = $('*').textContent.trim().split('\n');
let sum = 0;

code.forEach(line => {
    const [test, equation] = line.split(': ');
    const combinations = generateExpressions(equation.split(' ').map(Number));
    for (let comb of combinations) {
        const r = evaluate(comb);
        if (r === parseInt(test)) {
            sum += r;
            break;
        }
    }
});

function generateExpressions(numbers) {
    const operators = ["+", "*"];
    const results = [];
    function helper(currentExpression, index) {
        if (index === numbers.length) {
            results.push(currentExpression.join(' '));
            return;
        }
        for (const operator of operators) {
            const nextExpression = [...currentExpression, operator, numbers[index]];
            helper(nextExpression, index + 1);
        }
    }
    helper([numbers[0]], 1);
    return results;
}

function evaluate(expression) {
    const tokens = expression.split(' ');
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);
        if (operator === '+') {
            result += nextNumber;
        } else if (operator === '*') {
            result *= nextNumber;
        }
    }
    return result;
}

console.log('Part 1 ->', sum);

// Part 2
sum = 0;

code.forEach(line => {
    const [test, equation] = line.split(': ');
    const combinations = generateExpressions(equation.split(' ').map(Number));
    for (let comb of combinations) {
        const r = evaluate(comb);
        if (r === parseInt(test)) {
            sum += r;
            break;
        }
    }
});

function generateExpressions(numbers) {
    const operators = ["+", "*", "||"];
    const results = [];
    function helper(currentExpression, index) {
        if (index === numbers.length) {
            results.push(currentExpression.join(' '));
            return;
        }
        for (const operator of operators) {
            const nextExpression = [...currentExpression, operator, numbers[index]];
            helper(nextExpression, index + 1);
        }
    }
    helper([numbers[0]], 1);
    return results;
}

function evaluate(expression) {
    const tokens = expression.split(' ');
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);
        if (operator === '+') {
            result += nextNumber;
        } else if (operator === '*') {
            result *= nextNumber;
        }
        else if (operator === '||') {
            result += nextNumber.toString();
            result = parseInt(result);
        }
    }
    return result;
}

console.log('Part 2 ->', sum);