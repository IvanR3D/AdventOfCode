function readCircuit() {
    data.forEach(d =>{
        const [wire, output] = d.split(' -> ');
        circuit.set(output, wire);
    });
}
function getSignal(wire) {
    if (cache.has(wire)) return cache.get(wire);
    if (!isNaN(wire)) return parseInt(wire);
    const operation = circuit.get(wire);
    let result;
    if (!operation) return null;
    if (!isNaN(operation)) result = parseInt(operation);
    else {
        const parts = operation.split(' ');
        if (parts.length === 1) result = getSignal(parts[0]);
        else if (parts.length === 2) result = 65535 - getSignal(parts[1]);
        else if (parts.length === 3) {
            const [input1, op, input2] = parts;
            result = ops[op](getSignal(input1), getSignal(input2));
        }
    }
    cache.set(wire, result);
    return result;
}
const data = $0.textContent.split('\n').slice(0,-1);
const ops = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b
};
const circuit = new Map();
const cache = new Map();
readCircuit();
const result = getSignal('a');
console.log('Part 1 ->',result);
circuit.set('b', result);
cache.clear();
const result2 = getSignal('a');
console.log('Part 2 ->',result2);