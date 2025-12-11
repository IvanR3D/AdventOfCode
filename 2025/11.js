const data = $0.textContent.trim().split('\n');
const g = {};
data.forEach(d => {
    const [n, c] = d.split(': ');
    g[n] = c.split(' ');
});
let m = {};
function dfs(node) {
    if(node === 'out') return 1;
    if(m[node] !== undefined) return m[node];
    let count = 0;
    for(const nxt of g[node] || []) {
        count+= dfs(nxt);
    }
    m[node] = count;
    return count;
}
console.log('Part 1 ->',dfs('you'));

m = {};
function dfs2(node, mask) {
    if(node === 'dac') mask |= 1;
    if(node === 'fft') mask |= 2;
    if(node === 'out') {
        return mask === 3 ? 1 : 0;
    }
    const key = node + '|' + mask;
    if(m[key] !== undefined) return m[key];
    let count = 0;
    for(const nxt of g[node] || []) {
        count+= dfs2(nxt,mask);
    }
    m[key] = count;
    return count;
}
console.log('Part 2 ->',dfs2('svr',0));