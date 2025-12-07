function incrementPass(pass) {
    if (pass === "") return 'a';
    if (pass[pass.length-1] === 'z') return incrementPass(pass.slice(0,-1))+'a';
    const n = pass.charCodeAt(pass.length-1);
    return pass.slice(0,-1) + String.fromCharCode(n+1);
}
function req1(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (pass.charCodeAt(i) === pass.charCodeAt(i+1)-1 && pass.charCodeAt(i+1) === pass.charCodeAt(i+2)-1) return true;
    }
    return false;
}
function req2(pass) {
    return !(pass.includes('i') || pass.includes('o') || pass.includes('l'));
}
function req3(pass) {
    const set = new Set();
    for (let i = 0; i < pass.length-1; i++) {
        if (pass[i] === pass[i+1]) {
            set.add(pass[i]);
            i++;
        }
    }
    return set.size >= 2;
}
function main(pass) {
    let newpass = pass;
    while (true) {
        newpass = incrementPass(newpass);
        // If we find forbidden letters, skip to next valid sequence
        if (!req2(newpass)) {
            // Find the forbidden letter and increment that position
            for (let i = 0; i < newpass.length; i++) {
                if ('iol'.includes(newpass[i])) {
                    const nextChar = String.fromCharCode(newpass.charCodeAt(i) + 1);
                    newpass = newpass.slice(0, i) + nextChar + 
                             'a'.repeat(newpass.length - i - 1);
                    break;
                }
            }
            continue;
        }
        // Check all requirements
        if (req1(newpass) && req2(newpass) && req3(newpass)) {
            return newpass;
        }
    }
}
const code = 'hxbxwxba';
const r1 = main(code);
console.log('Part 1 ->', r1);
const r2 = main(r1);
console.log('Part 2 ->', r2);