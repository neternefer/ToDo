module.exports = function isValid(func){
    //Basic validation wrapper for login and register
    return (req, res, next) => {
        const {error} = func(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        };
        next();
    }}
