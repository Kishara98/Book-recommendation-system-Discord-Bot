const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;
module.exports = {
    // !deletebook id="6745e82dbb82f9696321310d"
    name: 'deletebook',
    description: 'Delete a book from the library',
    async execute(message, args) {

        const bookId = args.match(/id="([^"]+)"/)[1];

        try {
            const response = await axios.delete(`${process.env.API_BASE_URL}/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.reply(`Book deleted: ${response.data.book.title}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to delete book. Please try again.');
        }
    }
};
