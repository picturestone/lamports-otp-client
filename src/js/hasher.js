import sha256 from 'crypto-js/sha256';
import hex from 'crypto-js/enc-hex'

export default function hash(val, numberOfLoops){
    let hashedVal = val;
    for(let i = 0; i < numberOfLoops; i++) {
        hashedVal = hex.stringify(sha256(hashedVal));
    }

    return hashedVal;
}