function countOccurrences(input, query) {
    const occurrences = []; // Array untuk menyimpan jumlah kemunculan kata

    // Perulangan untuk setiap kata dalam QUERY
    for (let i = 0; i < query.length; i++) {
        const word = query[i]; // Kata saat ini dalam iterasi
        let count = 0; // Variabel untuk menghitung jumlah kemunculan kata

        // Perulangan untuk setiap kata dalam INPUT
        for (let j = 0; j < input.length; j++) {
            // Jika kata dalam INPUT sama dengan kata dalam QUERY, tambahkan 1 ke count
            if (input[j] === word) {
                count++;
            }
        }

        // Tambahkan jumlah kemunculan kata ke array occurrences
        occurrences.push(count);
    }

    // Kembalikan hasil dalam format yang diminta
    return ` [${occurrences.join(', ')}] karena kata ${query.map((word, index) => `'${word}' terdapat ${occurrences[index]} pada INPUT`).join(', ')}`;
}

// Array INPUT
const input = ['xc', 'dz', 'bbb', 'dz'];

// Array QUERY
const query = ['bbb', 'ac', 'dz'];

// Panggil fungsi countOccurrences untuk menghitung kemunculan kata dalam QUERY pada INPUT
const occurrences = countOccurrences(input, query);

// Cetak hasil
console.log(occurrences);
