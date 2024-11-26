const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;
module.exports = {

    // !listreviews id="67459844287dc122e90791c1"
    name: 'listreviews',
    description: 'List all reviews for a book',
    async execute(message, args) {

        const bookId = args.match(/id="([^"]+)"/)[1];
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/api/reviews?bookId=${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const reviews = response.data;
            if (reviews.length === 0) {
                message.reply('No reviews found for this book.');
            } else {               
                  message.reply(`Reviews for the book:\n\n${reviews.map(review => `- Review ID: ${review._id}\n - Book ID: ${review.bookId}\n - Review: ${review.review}\n - Rating: ${review.rating}`).join('\n\n')}`);
                }
        } catch (error) {
            console.error(error);
            message.reply('Failed to retrieve reviews. Please try again.');
        }
    }
};
