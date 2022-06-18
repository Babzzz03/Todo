const { CustomAPIError} = require ('../errors/custom-error')
const errorHandelerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message})
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again later'})
}



module.exports = errorHandelerMiddleWare