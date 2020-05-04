import devKeys from './dev.config';

let config: { mongoURI: string, jwtKey: string } = {
    mongoURI:'',
    jwtKey: ''
};

if(process.env.NODE_ENV === 'production') {
    console.log('prod');
    // module.exports = require('./prod');
    // export default from ''
    // config = {};
} else {
    console.log(devKeys);
    console.log('dev');
    config = devKeys;    
}

// config = devKeys;
export default config;