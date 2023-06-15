function subtractDiagonal(matrix) {
    const size = matrix.length; // Menentukan ukuran matriks (jumlah baris atau kolom)
    let diagonal1 = 0; // Variabel untuk menyimpan jumlah elemen pada diagonal pertama
    let diagonal2 = 0; // Variabel untuk menyimpan jumlah elemen pada diagonal kedua

    // Perulangan untuk melintasi setiap baris pada matriks
    for (let i = 0; i < size; i++) {
        diagonal1 += matrix[i][i]; // Menambahkan elemen pada diagonal pertama ke variabel diagonal1
        diagonal2 += matrix[i][size - 1 - i]; // Menambahkan elemen pada diagonal kedua ke variabel diagonal2
    }

    // Mengembalikan hasil pengurangan antara diagonal1 dan diagonal2 dalam format string
    return `maka hasilnya adalah ${diagonal1} - ${diagonal2} = ${diagonal1 - diagonal2}`;
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]; // Matriks yang diberikan
const result = subtractDiagonal(matrix); // Memanggil fungsi subtractDiagonal dengan matriks sebagai argumen
console.log(result); 
