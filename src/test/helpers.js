const mongoose = require('mongoose');

const clearDatabase = () => {
    return new Promise( resolve => {
        let count = 0;
        const max = Object.key(mongoose.connection.collections).length;

        for( const i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function(){
                count ++;
                if(count === max) resolve();
            });
        }
    });
};

module.exports = async function setupTest(){
    await clearDatabase;
};