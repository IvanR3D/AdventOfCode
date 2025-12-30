const data = $('*').textContent.trim().split('\n');
const regs = {a:0,b:0};
for (let i = 0; i < data.length; i++) {
    const parts = data[i].replace(',','').split(' ');
    switch(parts[0]) {
        case 'hlf':
            regs[parts[1]] = regs[parts[1]] / 2;
            break;
        case 'tpl':
            regs[parts[1]] *= 3;
            break;
        case 'inc':
            regs[parts[1]]++;
            break;
        case 'jmp':
            i += Number(parts[1])-1;
            break;
        case 'jie':
            if(regs[parts[1]] % 2 === 0) {
                i += Number(parts[2])-1;
            }
            break;
        case 'jio':
            if(regs[parts[1]] === 1) {
                i += Number(parts[2])-1;
            }
            break;
        default:
            console.log('pasa');
            break;
    }
}
console.log('Part 1 ->',regs['b']);

regs['a'] = 1;
regs['b'] = 0;
for (let i = 0; i < data.length; i++) {
    const parts = data[i].replace(',','').split(' ');
    switch(parts[0]) {
        case 'hlf':
            regs[parts[1]] = regs[parts[1]] / 2;
            break;
        case 'tpl':
            regs[parts[1]] *= 3;
            break;
        case 'inc':
            regs[parts[1]]++;
            break;
        case 'jmp':
            i += Number(parts[1])-1;
            break;
        case 'jie':
            if(regs[parts[1]] % 2 === 0) {
                i += Number(parts[2])-1;
            }
            break;
        case 'jio':
            if(regs[parts[1]] === 1) {
                i += Number(parts[2])-1;
            }
            break;
        default:
            console.log('pasa');
            break;
    }
}
console.log('Part 2 ->',regs['b']);