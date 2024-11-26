const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;


module.exports = {
    name: 'addbook',
    description: 'Add a book to your library',
    async execute(message, args) {
        // !addbook title="The man" author="K buddika" genre="Classic"

        const title = args.match(/title="([^"]+)"/)[1];
        const author = args.match(/author="([^"]+)"/)[1];
        const genre = args.match(/genre="([^"]+)"/)[1];


        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/api/books`, {
                title: title,
                author: author,
                genre: genre
            },{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            message.reply(`Book '${title}' added successfully!`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to add book. Please try again.');
        }
    }
};


