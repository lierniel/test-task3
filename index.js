const path = require('path');
const fs = require('fs');
const parser = require('fast-xml-parser');

const bookPath = path.join(__dirname, 'books');

const files = fs.readdirSync(bookPath);
const books = []
for (const fileName of files){
    if (path.extname(fileName) === '.fb2'){
        const fileData = fs.readFileSync(path.join(bookPath, fileName), 'utf-8');
        const json = parser.parse(fileData).FictionBook.description['title-info'];
        books.push({author: `${json.author['first-name']} ${json.author['last-name']}`, bookTitle: json['book-title'] })
    }
}

const resultList = `${books
    .sort((a, b) => {
        if (a.author > b.author) return 1;
        if (a.author < b.author) return -1;
        if (a.bookTitle > b.bookTitle) return 1;
        if (a.bookTitle < b.bookTitle) return -1;
        return 0
    })
    .map(row => `${row.author} - ${row.bookTitle}`).join('\n')
}`

console.log(resultList)


