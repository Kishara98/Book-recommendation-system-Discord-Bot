const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;
module.exports = {
    name: 'editbook',
    description: 'Edit a book in the library',
    async execute(message, args) {

        // !editbook id="6745e82dbb82f9696321310d" title="The man" author="K buddika" genre="Classic"

        const bookId = args.match(/id="([^"]+)"/)[1];
        const title = args.match(/title="([^"]+)"/)[1];
        const author = args.match(/author="([^"]+)"/)[1];
        const genre = args.match(/genre="([^"]+)"/)[1];

        try {
            const response = await axios.put(`${process.env.API_BASE_URL}/api/books/${bookId}`, {
                title: title,
                author: author,
                genre: genre
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.reply(`Book updated: ${response.data.book.title} by ${response.data.book.author}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to edit book. Please try again.');
        }
    }
};
