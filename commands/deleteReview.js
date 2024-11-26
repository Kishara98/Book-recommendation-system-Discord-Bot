const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;
module.exports = {
    name: 'deletereview',
    description: 'Delete a review for a book',
    async execute(message, args) {

    //!deletereview id="6745f1efaa9aa1269f67b5c2"
        const reviewId = args.match(/id="([^"]+)"/)[1];

        try {
            const response = await axios.delete(`${process.env.API_BASE_URL}/api/reviews?reviewId=${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.reply(`Review deleted: ${reviewId}`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to delete review. Please try again.');
        }
    }
};
