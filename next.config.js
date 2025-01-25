const { default: OpenAI } = require("openai");

require("dotenv").config();

module.exports = {
    env: {
        GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
        OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
    },
};