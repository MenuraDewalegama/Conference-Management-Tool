/** provide basic database CRUD operations. */
module.exports = class DatabaseService {
    static databaseFileName = '../util/database.util';
    static databaseName = 'cmtDB';

    constructor(collectionName) {
        this.collection = require(DatabaseService.databaseFileName)
            .db(DatabaseService.databaseName)
            .collection(collectionName);
    }

    /** save record in the database.
     * @param newObject object to be saved.
     * @return Promise with the driver generated ObjectId for the insert operation if successfully inserted,
     * otherwise error. */
    save(newObject) {
        return new Promise((resolve, reject) => {
            try {
                // console.log(newObject);
                const result = this.collection.insertOne(newObject);
                /* successfully inserted ,resolve generated ID. */
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** update a given record in the database.
     * @param id (_id) attribute value (primary key value).
     * @param objectWithNewValue object containing new values.
     * @return Promise with result if successfully inserted, otherwise error. */
    update(id, objectWithNewValue) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.updateOne({_id: require('mongodb').ObjectID(id)}, {
                    $set: objectWithNewValue
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** delete the record by given ID.
     * @param id id of the record to be deleted.
     * @return Promise if successfully deleted resolve boolean true,
     * otherwise rejected error.
     * */
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.deleteOne({_id: require('mongodb').ObjectID(id)});
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find record by given ID.
     * @param id id of the record to be retrieved from the database.
     * @return Promise with requested record; if found,
     * otherwise return rejected error. */
    findById(id) {
        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.findOne({_id: require('mongodb').ObjectID(id)});
                resolve(cursor);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find the records.
     * @return Promise with requested record(s), if found.
     * If nothing found without errors, then returns a empty array.,
     * otherwise return rejected error. */
    find(newObject) {

        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.find(newObject);
                resolve(cursor.toArray());
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find all the records.
     * @return Promise with requested record(s), if found.
     * If nothing found without errors, then returns a empty array.,
     * otherwise return rejected error. */
    findAll() {

        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.find({});
                resolve(cursor.toArray());
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find the record by ID and project the result.
     * @param id id of the record to be found.
     * @param projection projection of the result.
     *
     * @return Promise with the result if found, otherwise error. */
    findAndProject(id, projection) {

        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.findOne({_id: require('mongodb').ObjectID(id)}, {
                    projection: projection
                });
                resolve(cursor);
            } catch (error) {
                reject(error);
            }
        });
    }

};
