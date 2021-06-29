const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'ExternalUsers';
//creating the database collection
const ExternalUsers = new DatabaseService(collectionName);
//define the collection name
const collectionName2 = 'InternalUsers';
//creating the database collection
const InternalUsers = new DatabaseService(collectionName2);

const getPasswordbyEmail = async (email) => {
    const externalusers=  await ExternalUsers.findAll();
    let password ='';
    if (externalusers.length > 0) {
        externalusers.map((externalUser) => {
            if(externalUser.email == email){             
                    password= externalUser.password                        
            }      
            // }
        });
    }
    return password;
};


const getPasswordbyEmailInternal = async (email) => {
    const internalUsers=  await InternalUsers.findAll();
    let password ='';
    if (internalUsers.length > 0) {
        internalUsers.map((internalUser) => {
            if(internalUser.email == email){    
                    internalUserObj={
                        password : internalUser.password,
                        type : internalUser.type                        
                    }         
            }      
            // }
        });
    }
    return internalUserObj;
};

module.exports = {
    getPasswordbyEmail,getPasswordbyEmailInternal
}