dbPassword = 'mongodb+srv://NAME:'+ encodeURIComponent('PASSWORD')+'@CLUSTERNAME.mongodb.net/tasks?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};
