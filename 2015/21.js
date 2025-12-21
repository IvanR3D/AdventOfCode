function battleResult(pdp, pap) {
    const playerDamage = Math.max(1, pdp - bap);
    const bossDamage = Math.max(1, bdp - pap);
    const killBossTurns = Math.ceil(bhp / playerDamage);
    const killPlayerTurns = Math.ceil(php / bossDamage);
    return killBossTurns <= killPlayerTurns;
}
const weapons = [[8,4,0],[10,5,0],[25,6,0],[40,7,0],[74,8,0]];
const armors = [[0,0,0],[13,0,1],[31,0,2],[53,0,3],[75,0,4],[102,0,5]];
const rings = [[25,1,0],[50,2,0],[100,3,0],[20,0,1],[40,0,2],[80,0,3]];
const ringCombos = [[]];
for (let i = 0; i < rings.length; i++) {
    ringCombos.push([rings[i]]);
    for (let j = i+1; j < rings.length; j++) {
        ringCombos.push([rings[i], rings[j]]);
    }
}
const php = 100;
const data = $('*').textContent.trim().split('\n');
const bhp = Number(data[0].split(': ')[1]);
const bdp = Number(data[1].split(': ')[1]);
const bap = Number(data[2].split(': ')[1]);
const wins = [];
const losses = [];
for (const w of weapons) {
    for (const a of armors) {
        for (const r of ringCombos) {
            const gold = w[0] + a[0] + r.reduce((s,v) => s + v[0], 0);
            const pdp = w[1] + r.reduce((s,v) => s + v[1], 0);
            const pap = a[2] + r.reduce((s,v) => s + v[2], 0);
            if (battleResult(pdp, pap)) {
                wins.push(gold);
            } else {
                losses.push(gold);
            }
        }
    }
}
console.log('Part 1 ->', Math.min(...wins));
console.log('Part 2 ->', Math.max(...losses));