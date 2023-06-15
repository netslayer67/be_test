function longest(sentence) {
    // Memisahkan kalimat menjadi array kata dengan spasi sebagai pemisah
    const words = sentence.split(' ');

    // Inisialisasi variabel untuk kata terpanjang
    let longestWord = '';

    // Melintasi setiap kata dalam array
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Memeriksa apakah kata saat ini lebih panjang dari kata terpanjang sejauh ini
        if (word.length > longestWord.length) {
            // Jika iya, kata terpanjang diperbarui dengan kata saat ini
            longestWord = word;
        }
    }

    // Mengembalikan kata terpanjang beserta panjang karakternya dalam format yang diinginkan
    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const longestWord = longest(sentence);
console.log(longestWord); // Output: mengerjakan: 11 character
