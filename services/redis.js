const {
    makeGraphqlRequest
} = require("./graphql-request");

let cachedEmailArray = [];
let isCached = false
const getCachedEmailArray = async () => {

    if (isCached === false) {

        const getAllEmailsInDb = await makeGraphqlRequest(`query MyQuery {
            test{
              email
            }
          }`, {

        })
        isCached = true
        getAllEmailsInDb.test.forEach((element) => {

            cachedEmailArray.push(element.email)
        })
        return cachedEmailArray;
    }
    return cachedEmailArray;
}


const updateCachedEmailArray = (email) => {

    cachedEmailArray.push({
        email: email
    })
    console.log('Updating cache', cachedEmailArray.length)
}

module.exports = {
    getCachedEmailArray,
    updateCachedEmailArray
}