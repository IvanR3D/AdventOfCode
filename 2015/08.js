function countChars(str) {
    let i = 1;
    let memoryLength = 0;
    while (i < str.length - 1) {
            if (str[i] === '\\') {
                if (i + 1 < str.length) {
                    if (str[i + 1] === '\\' || str[i + 1] === '"') {
                        // \\ or \" each represent one character
                        memoryLength++;
                        i += 2;
                    } else if (str[i + 1] === 'x' && i + 3 < str.length) {
                        // \x followed by two hex digits represents one character
                        const hexPart = str.slice(i + 2, i + 4);
                        if (/^[0-9a-fA-F]{2}$/.test(hexPart)) {
                            memoryLength++;
                            i += 4;
                        } else {
                            // Not valid hex, treat as normal character
                            memoryLength++;
                            i++;
                        }
                    } else {
                        memoryLength++;
                        i++;
                    }
                } else {
                    memoryLength++;
                    i++;
                }
            } else {
                memoryLength++;
                i++;
            }
        }
    return memoryLength;
}
function encode(str) {
    let enc = 2;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"' || str[i] === "\\") {
            enc += 2;
        } else {
            enc++;
        }
    }
    return enc;   
}
const code = $('*').textContent.trim().split('\n');
let codechars = 0;
let memochars = 0;
let encodedchars = 0;
code.forEach(line => {
    codechars += line.length;
    memochars += countChars(line);
    encodedchars += encode(line);
});
console.log('Part 1 ->', codechars - memochars);
console.log('Part 2 ->', encodedchars - codechars);