/*
@author : Dhanusha Perera
@date : 30/05/2021
*/

/*const conferencePostAPI = require('../../src/api/conference-post.api');

/!* expected data. *!/
const outputObject = {
    _id: require('mongodb').ObjectID('60b102411ebcec35400d3d12'),
    topic: 'CodeFest SLIIT',
    description: 'CODEFEST is a nationwide Software Competition organized by the Faculty of Computing of Sri Lanka Institute of Information Technology (SLIIT) geared towards exhibiting the software application design and developing talents of students island-wide. It is an effort of SLIIT to elevate the entire nation’s ICT knowledge to achieve its aspiration of being the knowledge hub in Asia. CODEFEST was first organized in 2012 and this year it will be held for the 8th consecutive time in parallel with the 20th anniversary celebrations of SLIIT.',
    venue: 'Main Auditorium',
    dateTime: '2021-05-27T08:31:29.983Z',
    keySpeakers: [
        {
            name: 'Dr. Nimal',
            title: 'Phd. Information Technology',
            description: 'Mauris in lacinia urna. Curabitur ultrices nunc a arcu malesuada placerat eu eget quam.',
            id: '88ea5f39-3e9f-47b1-9a2a-61f7977c6c77'
        },
        {
            name: 'Dr. Kamal ',
            title: 'Phd. Information Technology',
            description: 'Nunc et ante id ipsum porttitor gravida. Mauris in lacinia urna.',
            id: '34d31063-b775-46c5-93c0-252cfbc5a577'
        }
    ],
    organizers: ['Virtusa', '99x', 'SyscoLabs'],
    isApproved: false
};

/!* test case.
* There is a matching record for given ID. *!/
test('Conference post API - GET record by ID with matching record', () => {
    return expect(conferencePostAPI.getConferencePostByID('60b102411ebcec35400d3d12'))
        .resolves.toEqual(outputObject);
});


/!* test case.
* There is no record for given ID. *!/
test('conference post API - GET record by ID with no matching record', () => {
    return expect(conferencePostAPI.getConferencePostByID('60b102411ebcec35400d3d18'))
        .resolves.toEqual(null);
});*/

