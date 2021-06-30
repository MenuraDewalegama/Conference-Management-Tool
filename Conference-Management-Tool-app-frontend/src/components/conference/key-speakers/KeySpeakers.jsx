/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useEffect, useState} from 'react';
import {Carousel} from 'react-bootstrap';
import KeySpeaker from './key-speaker/KeySpeaker';

const KeySpeakers = (props) => {
    const [index, setIndex] = useState(0);
    const [keySpeakers, setKeySpeakers] = useState(props.keySpeakers);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        setKeySpeakers(props.keySpeakers);
    });

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {keySpeakers.map(keySpeaker => {
                return (
                    <Carousel.Item key={keySpeaker?._id}>
                        <KeySpeaker key={keySpeaker?._id} keySpeaker={keySpeaker}/>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default KeySpeakers;
