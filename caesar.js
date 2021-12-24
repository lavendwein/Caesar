let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync(arg[2]).toString();
let k = arg[3] * 1;

const alphBig = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let code = new Array();

for (let i = 0; i < str.length; i++){
	if (alph.includes(str[i])){
		code.push(alph[(alph.indexOf(str[i]) + k) % 26]);
	}
	if (alphBig.includes(str[i])){
		code.push(alphBig[(alphBig.indexOf(str[i]) + k) % 26]);
	}
	if (!(alph.includes(str[i])) && !(alphBig.includes(str[i]))){
		code.push(str[i]);
	}
}

let codeStr = "";
for (let i = 0; i < code.length; i++)
	codeStr = codeStr + code[i];

fs.writeFileSync("codedstr.txt", codeStr);