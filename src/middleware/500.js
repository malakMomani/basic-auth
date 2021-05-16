'use strict';

module.exports = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        err: err,
        message: `server error ${err.message}`,
        path: req.path,
        query: req.query
    });
}