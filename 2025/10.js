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