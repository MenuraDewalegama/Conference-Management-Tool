/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import KeySpeaker from './key-speaker/KeySpeaker';

const KeySpeakers = () => {
    const [index, setIndex] = useState(0);
    const [keySpeakers, setKeySpeakers] = useState([
        {
            name: 'DOLOREMQUE PARIATUR PLACEAT',
            title: 'Phd. Information Technology',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi\n' +
                '                                        aspernatur atque, beatae cum distinctio ea est excepturi itaque minus neque nisi\n' +
                '                                        non nostrum quaerat, repudiandae, rerum suscipit. Expedita, velit.',
            imageURL: 'https://via.placeholder.com/150'
        },
        {
            name: 'MI PROIN SED LIBERO',
            title: 'Phd. Cyber Security Technology',
            description: 'Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Id neque aliquam vestibulum morbi blandit cursus risus at. Mi proin sed libero enim sed faucibus turpis in.',
            imageURL: 'https://via.placeholder.com/150'
        }
    ]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <KeySpeaker/>
            </Carousel.Item>
            <Carousel.Item>
                <KeySpeaker/>
            </Carousel.Item>
            <Carousel.Item>
                <KeySpeaker/>
            </Carousel.Item>
        </Carousel>
    );
};

export default KeySpeakers;
