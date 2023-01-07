const mongoose = require('mongoose');

module.exports = {
    connect: (uri) => {
        mongoose.connect(uri)
            .then(data => console.log('DB Connected'))
            .catch(ex => console.log(`DB Connection failed - Exception:\n ${ex}`));

            
        mongoose.connection.on('error', err => console.log(`DB Connection ERROR: ${err}`));
    },
};