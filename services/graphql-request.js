const {
    request,
    gql
} = require('graphql-request')



const makeGraphqlRequest = async (query, variables) => {
    try {
        const result = await request('http://localhost:8080/v1/graphql', query, variables, {
            'x-hasura-admin-secret': 'w9-ukrqJ96;)F$zpVy=e>>M>`Z!:{amV'
        })

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    makeGraphqlRequest
}