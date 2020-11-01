const fetch = require('node-fetch');

module.exports = async ({gistId}) => {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    
    const json = await response.json();

    const file = Object.values(json.files)[0].content

    return file;
}
