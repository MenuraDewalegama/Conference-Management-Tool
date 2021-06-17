/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import KeySpeaker from './key-speaker/KeySpeaker';

const KeySpeakers = (props) => {
    const [index, setIndex] = useState(0);
    const [keySpeakers, setKeySpeakers] = useState(props.keySpeakers);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {keySpeakers.map(keySpeaker => {
                return (
                    <Carousel.Item>
                        <KeySpeaker keySpeaker={keySpeaker}/>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
};

export default KeySpeakers;
