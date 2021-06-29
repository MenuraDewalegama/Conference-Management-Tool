/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const commonValidation = require('../../../src/routes/validation/common.validation');
const keys = ['topic', 'description', 'venue', 'dateTime'];

const errorMessage = 'ID is invalid. ID value should be 12 bytes in length. ' +
    'ID should be contained only letters (case does not matter) and numbers.';

test('ConferenceID validation', () => {
    return expect(commonValidation.validateID('ABC')).rejects.toBe(errorMessage);
});

test('ConferenceID validation', () => {
    return expect(commonValidation.validateID('60b102411ebcec35400d3d12')).resolves.toBeTruthy();
});


test('detectUnknownFields test input with conference post values', () => {
    expect(commonValidation.detectUnknownFields({
        topic: 'Testing topic',
        description: 'Testing description',
        venue: 'SLIIT Auditorium',
        dateTime: '2021-05-05'
    }, keys)).toBe('');
});

test('detectUnknownFields test input with unknown age field', () => {
    expect(commonValidation.detectUnknownFields({
        topic: 'Testing topic',
        description: 'Testing description',
        venue: 'SLIIT Auditorium',
        dateTime: '2021-05-05',
        age: 10
    }, keys)).toBe(`Invalid Key Field Detected: age\n`);
});
