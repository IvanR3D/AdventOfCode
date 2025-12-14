const data = $0.textContent.trim().split('\n');
let result = 0;
data.forEach(d => {
    let ans = 0;
    const light = d.match(/\[(.*?)\]/)[1];
    let targetBits = 0;
    for (let i = 0; i < light.length; i++) {
        if (light[i] === '#') targetBits |= (1 << i);
    }
    const btns = [...d.matchAll(/\((.*?)\)/g)]
        .map(m => m[1] === "" ? [] : m[1].split(",").map(Number));
    const btnMask = btns.map(list => {
        let mask = 0;
        for(const l of list) mask |= (1 << l);
        return mask;
    });
    const queue = [0];
    const dist = new Map();
    dist.set(0, 0);

    while (queue.length > 0) {
        const cur = queue.shift();
        const d = dist.get(cur);

        for (const mask of btnMask) {
            const nxt = cur ^ mask;
            if (!dist.has(nxt)) {
                dist.set(nxt, d + 1);
                if (nxt === targetBits) ans = d + 1;
                queue.push(nxt);
            }
        }
    }
    result += ans;
});
console.log('Part 1 ->',result);

const INF = 1 << 30;
class Part2 {
    constructor(buttons, joltage) {
        this.buttons = buttons;
        this.joltage = joltage;
        this.n = joltage.length;
        this.m = buttons.length;
        this.memo = new Map();
        
        // Precompute button masks
        this.buttonMasks = buttons.map(button => {
            let mask = 0;
            for (const id of button) mask |= 1 << id;
            return mask;
        });
        
        // Precompute all parity states reachable in 1 press
        // Actually, we need all combinations (0 or 1 presses for each button)
        // But we can generate them efficiently
        this.generateAllParityCombinations();
    }
    
    generateAllParityCombinations() {
        const n = this.n;
        const m = this.m;
        
        // Generate all 2^m combinations
        this.parityStates = new Array(1 << n).fill().map(() => []);
        
        for (let mask = 0; mask < (1 << m); mask++) {
            let parityState = 0;
            for (let i = 0; i < m; i++) {
                if (mask & (1 << i)) {
                    parityState ^= this.buttonMasks[i];
                }
            }
            this.parityStates[parityState].push(mask);
        }
    }
    
    solve() {
        return this.recursiveSolve(this.joltage);
    }

    getKey(arr) {
        return arr.join(',');
    }
    
    countBits(n) {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }

    recursiveSolve(current) {
        // Base case: all zeros
        let allZero = true;
        for (const val of current) {
            if (val !== 0) {
                allZero = false;
                break;
            }
        }
        if (allZero) return 0;

        // Check memo
        const key = this.getKey(current);
        if (this.memo.has(key)) {
            return this.memo.get(key);
        }

        // Get parity pattern
        let parityState = 0;
        for (let i = 0; i < this.n; i++) {
            if (current[i] % 2 === 1) {
                parityState |= 1 << i;
            }
        }

        // Get all combinations that achieve this parity
        const combinations = this.parityStates[parityState];
        
        if (combinations.length === 0) {
            this.memo.set(key, INF);
            return INF;
        }

        let best = INF;

        // Try each combination
        for (const mask of combinations) {
            const pressedCount = this.countBits(mask);
            
            // Create new joltage after applying this combination ONCE
            // But careful: each button press affects all its lights ONCE
            const nextJoltage = [...current];
            
            // Subtract 1 for each affected joltage
            for (let i = 0; i < this.m; i++) {
                if (mask & (1 << i)) {
                    for (const id of this.buttons[i]) {
                        nextJoltage[id] -= 1;
                    }
                }
            }
            
            // Check if all joltages are non-negative
            let valid = true;
            for (const val of nextJoltage) {
                if (val < 0) {
                    valid = false;
                    break;
                }
            }
            
            if (!valid) continue;
            
            // Verify that all joltages are now even
            // They should be because we subtracted odd numbers from odd ones
            for (let i = 0; i < this.n; i++) {
                if (nextJoltage[i] % 2 !== 0) {
                    valid = false;
                    break;
                }
            }
            
            if (!valid) continue;
            
            // Halve all joltages and recurse
            const halved = nextJoltage.map(x => x / 2);
            const subResult = this.recursiveSolve(halved);
            
            if (subResult < INF) {
                // Formula: current presses + 2 * recursive result
                const total = pressedCount + 2 * subResult;
                if (total < best) {
                    best = total;
                }
            }
        }

        this.memo.set(key, best);
        return best;
    }
}
let ans2 = 0;
for (const line of data) {
    const comp = line.split(' ');
    const buttons = comp.slice(1, -1).map(c => c.slice(1, -1).split(',').map(Number));
    const joltage = comp[comp.length - 1].slice(1, -1).split(',').map(Number);
    ans2 += new Part2(buttons, joltage).solve();
}
console.log('Part 2 ->', ans2);