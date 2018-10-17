const { ObjectID } = require('mongodb');
// console.log(ObjectID);

const validateID = function(req, res, next){
    // console.log('You were in id verification');
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:`Invalid id Passed`
        })
    }else{
        next();
    }
}

module.exports = {
    validateID
}