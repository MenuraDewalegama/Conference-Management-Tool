/*
@author : Dhanusha Perera
@date : 30/06/2021
*/

const keySpeakerValidation = require('../../../src/routes/validation/key-speakers.validation');

const invalidIDError1 = 'ID is invalid. ID value should be 12 bytes in length. ' +
    'ID should be contained only letters (case does not matter) and numbers.\n';

const keySpeaker = {
    name: 'Dr. Bhathiya Wickramasinghe',
    title: 'Head/Asst.Professor Department of Computing',
    description: 'Mauris vel libero nulla. Fusce et porta tortor. Nulla suscipit non orci vitae tincidunt. Sed a euismod quam.'
}

test('Key Speaker validation', () => {
    return expect(keySpeakerValidation.validateKeySpeaker(keySpeaker)).resolves.toBe('');
});

// const keySpeaker2 = {
//     conferencePostID: 'abc',
//     name: 'Dr. Bhathiya Wickramasinghe',
//     title: 'Head/Asst.Professor Department of Computing',
//     description: 'Mauris vel libero nulla. Fusce et porta tortor. Nulla suscipit non orci vitae tincidunt. Sed a euismod quam.'
// }
//
// test('Key Speaker2 validation', () => {
//     return expect(keySpeakerValidation.validateKeySpeaker(keySpeaker2)).resolves.toBe(invalidIDError1);
// });
