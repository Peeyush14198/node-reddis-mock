const axios = require('axios');
const {
    makeGraphqlRequest
} = require('./graphql-request');
const {
    getCachedEmailArray,
    updateCachedEmailArray
} = require('./redis');


const fetchAndStoreRandomUsers = async () => {
    const randomUserResponse = await axios.default.get('https://randomuser.me/api/?results=500');
    const response = randomUserResponse.data.results;
    let arr = await storeRandomUsers(response)
    return arr;
}

const storeRandomUsers = async (users) => {
    let arr = [];
    console.log('Total results fetched', users.length)
    for (let i = 0; i < users.length; i++) {
        let name = users[i].name.first + " " + users[i].name.last;
        let mobile = users[i].phone
        let email = users[i].email
        let age = users[i].dob.age
        let thumbNail = users[i].picture.thumbnail

        if (!await checkIfUserPresent(email)) {

            const saveData = await makeGraphqlRequest(`
            mutation insertTest($name : String, $mobile : String, $email : String, $age : Int, $thumbnail : String){
                insert_test_one(object : {name : $name, mobile : $mobile, email :$email, age : $age,thumbnail : $thumbnail }){
                    id
                }
            }

            `, {
                name: name,
                mobile: mobile,
                email: email,
                age: parseInt(`${age}`),
                thumbnail: thumbNail
            }, )
            console.log(saveData)
            if (saveData.insert_test_one !== null) {

                updateCachedEmailArray(email)
            }
        }
        arr.push({
            id: saveData.insert_test_one.id,
            name: name,
            mobile: mobile,
            email: email,
            age: age,
            thumbNail: thumbNail
        })


    }
    return arr;
}

const checkIfUserPresent = async (email) => {
    let tempMaintainEmailArr = await getCachedEmailArray()
    console.log('Total cached emails', tempMaintainEmailArr.length)
    if (tempMaintainEmailArr.includes(email)) {
        console.log('email found')
        return true
    }
    return false
}

module.exports = {
    fetchAndStoreRandomUsers
}