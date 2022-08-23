
const formatErrors = (errorsArray) =>{

    return errorsArray.map((err)=>{

        return{

            message: err.msg,
            field: err.param,

        }

    })

}

module.exports = { formatErrors};