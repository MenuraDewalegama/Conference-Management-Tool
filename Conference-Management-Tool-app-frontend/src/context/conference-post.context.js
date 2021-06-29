/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {Component} from 'react';

const ConferencePostContext = React.createContext({
    conferencePosts: [
        {
            mainHeader: 'Neque vitae tempus quam pellentesque.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque vitae tempus quam pellentesque. Tellus elementum sagittis vitae et leo duis ut diam. Vel risus commodo viverra maecenas accumsan lacus vel. In hac habitasse platea dictumst quisque.',
            venue: 'In hac habitasse',
            dateTime: new Date(Date.now()).toString(),
            keySpeakers: [
                {
                    name: 'Dr. Nuwan Kodagoda',
                    title: 'Head/Asst.Professor Department of Computer Science & Software Engineering - Faculty of Computing',
                    description: 'Tellus in hac habitasse platea dictumst vestibulum. Tortor posuere ac ut consequat. Fermentum odio eu feugiat pretium. Orci eu lobortis elementum nibh tellus molestie nunc.',
                    imageURL: 'https://via.placeholder.com/150'
                },
                {
                    name: 'Dr. Anuradha Jayakody',
                    title: 'Head/Asst.Professor Department of Electrical & Electronic - Faculty of Engineering',
                    description: 'Neque vitae tempus quam pellentesque. Tellus elementum sagittis vitae et leo duis ut diam. Vel risus commodo viverra maecenas accumsan lacus vel. In hac habitasse platea dictumst quisque.',
                    imageURL: 'https://via.placeholder.com/150'
                }
            ]
        },
        {
            mainHeader: 'Lorem ipsum dolor sit amet, consectetur elit.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis. Phasellus faucibus scelerisque eleifend donec. At quis risus sed vulputate. Blandit massa enim nec dui nunc mattis enim ut tellus',
            venue: 'In quam repellendus',
            dateTime: new Date(Date.now()).toString(),
            keySpeakers: [
                {
                    name: 'Dr. Nimalasiri Abheyasinghe',
                    title: 'Head/Asst.Professor Department of Business Studies - Faculty of Business Management',
                    description: 'Adipiscing elit ut aliquam purus sit amet luctus venenatis. Eget mauris pharetra et ultrices neque. Leo vel orci porta non pulvinar. At ultrices mi tempus imperdiet nulla malesuada pellentesque.',
                    imageURL: 'https://via.placeholder.com/150'
                },
                {
                    name: 'Dr. Anuradha Jayakody',
                    title: 'Head/Asst.Professor Department of Electrical & Electronic - Faculty of Engineering',
                    description: 'Faucibus ornare suspendisse sed nisi. Enim nunc faucibus a pellentesque sit. Augue ut lectus arcu bibendum at. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam.',
                    imageURL: 'https://via.placeholder.com/150'
                }
            ]
        }
    ]
});

class ConferencePostProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conferencePosts: [
                {
                    id: '60b102411ebcec35400d3d12',
                    topic: 'Neque vitae tempus quam pellentesque.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque vitae tempus quam pellentesque. Tellus elementum sagittis vitae et leo duis ut diam. Vel risus commodo viverra maecenas accumsan lacus vel. In hac habitasse platea dictumst quisque.',
                    venue: 'In hac habitasse',
                    dateTime: new Date(Date.now()).toString(),
                    mainImageURL: '',
                    keySpeakers: [
                        {
                            id: '88ea5f39-3e9f-47b1-9a2a-61f7977c6c77',
                            name: 'Dr. Nuwan Kodagoda',
                            title: 'Head/Asst.Professor Department of Computer Science & Software Engineering - Faculty of Computing',
                            description: 'Tellus in hac habitasse platea dictumst vestibulum. Tortor posuere ac ut consequat. Fermentum odio eu feugiat pretium. Orci eu lobortis elementum nibh tellus molestie nunc.',
                            imageURL: 'https://via.placeholder.com/300'
                        },
                        {
                            id: '34d31063-b775-46c5-93c0-252cfbc5a577',
                            name: 'Dr. Anuradha Jayakody',
                            title: 'Head/Asst.Professor Department of Electrical & Electronic - Faculty of Engineering',
                            description: 'Neque vitae tempus quam pellentesque. Tellus elementum sagittis vitae et leo duis ut diam. Vel risus commodo viverra maecenas accumsan lacus vel. In hac habitasse platea dictumst quisque.',
                            imageURL: 'https://via.placeholder.com/300'
                        }
                    ]
                },
                {
                    id: '60b342222e7ca30d3431bb9e',
                    mainHeader: 'Lorem ipsum dolor sit amet, consectetur elit.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis. Phasellus faucibus scelerisque eleifend donec. At quis risus sed vulputate. Blandit massa enim nec dui nunc mattis enim ut tellus',
                    venue: 'In quam repellendus',
                    dateTime: new Date(Date.now()).toString(),
                    keySpeakers: [
                        {
                            id: '98daddd2-471c-488a-857f-b08f4ad25efd',
                            name: 'Dr. Nimalasiri Abheyasinghe',
                            title: 'Head/Asst.Professor Department of Business Studies - Faculty of Business Management',
                            description: 'Adipiscing elit ut aliquam purus sit amet luctus venenatis. Eget mauris pharetra et ultrices neque. Leo vel orci porta non pulvinar. At ultrices mi tempus imperdiet nulla malesuada pellentesque.',
                            imageURL: 'https://via.placeholder.com/300'
                        },
                        {
                            id: '9c162079-bbea-45bf-99bc-3fb281acf964',
                            name: 'Dr. Anuradha Jayakody',
                            title: 'Head/Asst.Professor Department of Electrical & Electronic - Faculty of Engineering',
                            description: 'Faucibus ornare suspendisse sed nisi. Enim nunc faucibus a pellentesque sit. Augue ut lectus arcu bibendum at. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam.',
                            imageURL: 'https://via.placeholder.com/300'
                        }
                    ]
                }
            ]
        };
    }

    /** add a conference post. */
    _addConferencePost(conferencePost) {
        console.log('Add conference post using context!');
    }

    /** edit a conference post. */
    _editConferencePost(conferencePost) {
        console.log('Edit conference post using context!');
    }

    /** delete a conference post by ID. */
    _deleteConferencePost(conferencePostID) {
        console.log('Delete conference post using context!');
    }

    render() {
        return (
            <ConferencePostContext.Provider
                value={
                    {
                        conferencePosts: this.state.conferencePosts,
                        addConferencePost: this._addConferencePost.bind(this),
                        editConferencePost: this._editConferencePost.bind(this),
                        deleteConferencePost: this._deleteConferencePost.bind(this),
                    }
                }>
                {this.props.children}
            </ConferencePostContext.Provider>
        );
    }
}

const ConferenceConsumer = ConferencePostContext.Consumer;
module.exports = {
    ConferencePostProvider,
    ConferencePostContext,
    ConferenceConsumer
};
