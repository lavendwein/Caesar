let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync(arg[2]).toString();

const alphBig = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const canonFreq = {'a' : 0.0817, 'b' : 0.0149, 'c' : 0.0278, 'd' : 0.0425, 'e' : 0.127, 'f' : 0.0223, 'g':0.0202, 'h' : 0.0609, 'i' : 0.0675, 'j' : 0.0015, 'k' : 0.0077, 'l' : 0.0403, 'm' : 0.0241, 'n' : 0.0675, 'o' : 0.0751, 'p' : 0.0193, 'q' : 0.001, 'r' : 0.0599, 's' : 0.0633, 't' : 0.0906, 'u' : 0.0276, 'v' : 0.0098, 'w' : 0.0236, 'x' : 0.0015, 'y' : 0.0197, 'z' : 0.0005, 'A' : 0.0817, 'B' : 0.0149, 'C' : 0.0278, 'D' : 0.0425, 'E' : 0.127, 'F' : 0.0223, 'G':0.0202, 'H' : 0.0609, 'I' : 0.0675, 'J' : 0.0015, 'K' : 0.0077, 'L' : 0.0403, 'M' : 0.0241, 'N' : 0.0675, 'O' : 0.0751, 'P' : 0.0193, 'Q' : 0.001, 'R' : 0.0599, 'S' : 0.0633, 'T' : 0.0906, 'U' : 0.0276, 'V' : 0.0098, 'W' : 0.0236, 'X' : 0.0015, 'Y' : 0.0197, 'Z' : 0.0005};
let factFreq = {'a' : 0, 'b' : 0, 'c' : 0, 'd' : 0, 'e' : 0, 'f' : 0, 'g' :0, 'h' : 0, 'i' : 0, 'j' : 0, 'k' : 0, 'l' : 0, 'm' : 0, 'n' : 0, 'o' : 0, 'p' : 0, 'q' : 0, 'r' : 0, 's' : 0, 't' : 0, 'u' : 0, 'v' : 0, 'w' : 0, 'x' : 0, 'y' : 0, 'z' : 0};

let number = 0;
for(let i = 0; i < str.length; i++){
	if (alph.includes(str[i])){
		factFreq[str[i]]++;
		number++;
	}
	if (alphBig.includes(str[i])){
		factFreq[alph[alphBig.indexOf(str[i])]]++;
		number++;
	}
}

for (let i = 0; i < alph.length; i++)
	factFreq[alph[i]] = factFreq[alph[i]] / number;

let min = Number.POSITIVE_INFINITY;
let shift = 0;

for (let k = 0; k < 26; k++){
	let result = 0;
	for (let j = 0; j < 26; j++){
		result = result + Math.abs(canonFreq[alph[j]] - factFreq[alph[(j + k) % 26]]);
	}
	if (result < min){
		min = result;
		shift = k;
	}
}

let decodeStr = "";
for (let i = 0; i < str.length; i++){
	if (alph.includes(str[i])){
		if (alph.indexOf(str[i]) - shift < 0)	
			decodeStr += alph[(26 + alph.indexOf(str[i]) - shift) % 26];
		else
			decodeStr += alph[alph.indexOf(str[i]) - shift];
	}
	if (alphBig.includes(str[i])){
		if (alphBig.indexOf(str[i]) - shift < 0)
			decodeStr += alphBig[(26 + alphBig.indexOf(str[i]) - shift) % 26];			
		else
			decodeStr += alphBig[alphBig.indexOf(str[i]) - shift];			
	}
	if (!(alph.includes(str[i])) && !(alphBig.includes(str[i])))
		decodeStr += str[i];
}

fs.writeFileSync("decodedstr.txt", decodeStr);