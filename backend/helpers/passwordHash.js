const bcrypt= require('bcrypt');

module.exports = async (data) => {
    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data, salt);
    return hashed
}
