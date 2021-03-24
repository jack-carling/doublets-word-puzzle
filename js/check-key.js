export default function checkValidKey(key) {
  let validKey;
	switch(key) {
		case "Q": validKey = true; break;
		case "W": validKey = true; break;
		case "E": validKey = true; break;
		case "R": validKey = true; break;
		case "T": validKey = true; break;
		case "Y": validKey = true; break;
		case "U": validKey = true; break;
		case "I": validKey = true; break;
		case "O": validKey = true; break;
		case "P": validKey = true; break;
		case "A": validKey = true; break;
		case "S": validKey = true; break;
		case "D": validKey = true; break;
		case "F": validKey = true; break;
		case "G": validKey = true; break;
		case "H": validKey = true; break;
		case "J": validKey = true; break;
		case "K": validKey = true; break;
		case "L": validKey = true; break;
		case "Z": validKey = true; break;
		case "X": validKey = true; break;
		case "C": validKey = true; break;
		case "V": validKey = true; break;
		case "B": validKey = true; break;
		case "N": validKey = true; break;
		case "M": validKey = true; break;
		default: validKey = false;
	}
  return validKey;
}