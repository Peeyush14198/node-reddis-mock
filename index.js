const express = require('express')
const axios = require('axios')

const {
    request,
    gql
} = require('graphql-request');
const {
    fetchAndStoreRandomUsers
} = require('./services/user');


const app = express();





app.get('/user', async (req, res) => {
    let arr = await fetchAndStoreRandomUsers()
    res.send(arr)
})


app.listen(7000, async (err) => {
    console.log('App use')
});