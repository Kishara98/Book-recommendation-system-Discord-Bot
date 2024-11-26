const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.AUTHTOKEN;

module.exports = {
  // !addreview id="6745e02ebb82f969632130e5" review="awsome" rating="4"
  name: 'addreview',
  description: 'Add a review for a book',
  async execute(message, args) {

    const bookId = args.match(/id="([^"]+)"/)[1];
    const review = args.match(/review="([^"]+)"/)[1];
    const rating = parseInt(args.match(/rating="([^"]+)"/)[1]);


    if (isNaN(rating) || rating <= 1 || rating >= 5) {
      message.reply('Rating must be a number between 1 and 5');
      return;
    }

    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/api/reviews?bookId=${bookId}`, { review, rating }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      message.reply(`Review added: ${review} to ${bookId}`);
    } catch (error) {
      console.error(error);
      message.reply(`Failed to add review. ${error.message}`);
    }
  }
};