const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;

module.exports = {
    name: 'listbooks',
    description: 'List all books in the library',
    async execute(message) {
        // !listbooks
        
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/api/books`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const books = response.data;
            if (books.length === 0) {
                message.reply('No books found.');
            } else {
                message.reply(`Books in your library:\n\n${books.map(book => `- ${book._id}\n - ${book.title}\n - ${book.author}\n - ${book.genre}`).join('\n\n')}`);
            }
        } catch (error) {
            console.error(error);
            message.reply('Failed to retrieve books. Please try again.');
        }
    }
};
