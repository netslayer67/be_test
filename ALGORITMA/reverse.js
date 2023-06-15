function reverseAlphabet(str) {
    // Inisialisasi variabel result dan letters
    let result = '';
    let letters = '';

    // Perulangan untuk setiap karakter dalam string input
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        // Memeriksa apakah karakter adalah huruf atau angka
        if (isNaN(char)) {
            // Jika huruf, tambahkan ke variabel letters
            letters += char;
        } else {
            // Jika angka, tambahkan ke variabel result
            result += char;
        }
    }

    // Membalikkan urutan huruf-huruf dalam variabel letters
    return letters.split('').reverse().join('') + result;
}

const input = 'NEGIE1';
const output = reverseAlphabet(input);
console.log(output); // Output: EIGEN1
