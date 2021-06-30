/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const commonValidation = require('../../../src/routes/validation/common.validation');
const conferencePostValidation = require('../../../src/routes/validation/conference-post-v2.validation');

const expectedErrorMessageForValidateStrings = '{0} field is required. Accepted only strings.';
const expectedErrorMessageForValidateIntegers = '{0} field is required. Accepted only an integer.';
const expectedErrorMessageForValidateDateTimeISOString = '{0} field is invalid. It should be in ISOString format.';

test('validateStringOnly test', () => {
    expect(commonValidation.validateStringOnly('John Doe')).toBe('');
});

test('validateStringOnly test', () => {
    expect(commonValidation.validateStringOnly('')).toBe(expectedErrorMessageForValidateStrings);
});

test('validateIntegerOnly test input 12', () => {
    expect(commonValidation.validateIntegerOnly('12')).toBe('');
});

test('validateIntegerOnly test input 12.25', () => {
    expect(commonValidation.validateIntegerOnly('12.25')).toBe(expectedErrorMessageForValidateIntegers);
});

test('validateIntegerOnly test input empty string', () => {
    expect(commonValidation.validateIntegerOnly('')).toBe(expectedErrorMessageForValidateIntegers);
});

/* conference post data validation test cases. */

/* validate topic. */
test('validateTopic test input empty string', () => {
    expect(conferencePostValidation.validateTopic('')).toBe(expectedErrorMessageForValidateStrings);
});

test('validateTopic test input with some string value', () => {
    expect(conferencePostValidation.validateTopic('SLIIT CODE-FEST')).toBe('');
});


/* validate dateTime. */
test('validateDateTime test input with random string', () => {
    expect(conferencePostValidation.validateDateTime('25th of May 2021 at 8:00AM'))
        .toBe(expectedErrorMessageForValidateDateTimeISOString);
});

test('validateDateTime test input with some string value', () => {
    expect(conferencePostValidation.validateDateTime('2021-05-27T08:31:29.983Z')).toBe('');
});


// test('detectUnknownFields test input with conference post values', () => {
//     expect(conferencePostValidation.detectUnknownFields({
//         topic: 'Testing topic',
//         description: 'Testing description',
//         venue: 'SLIIT Auditorium',
//         dateTime: '2021-05-05'
//     })).toBe('');
// });
//
// test('detectUnknownFields test input with unknown age field', () => {
//     expect(conferencePostValidation.detectUnknownFields({
//         topic: 'Testing topic',
//         description: 'Testing description',
//         venue: 'SLIIT Auditorium',
//         dateTime: '2021-05-05',
//         age: 10
//     })).toBe(`Invalid Key Field Detected: age\n`);
// });
