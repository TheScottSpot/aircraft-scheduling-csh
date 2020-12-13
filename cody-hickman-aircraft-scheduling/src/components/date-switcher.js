import React from 'react';

import '../styles/DateSwitcherComponent.scss';
import leftArrowGray from '../images/arrow-left-gray.png';
import rightArrowGray from '../images/arrow-right-gray.png';

function DateSwitcher(props) {

    const date = new Date();
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);;

    function dateOrdinal(d) {
        return d+(31===d||21===d||1===d?"st":22===d||2===d?"nd":23===d||3===d?"rd":"th")
    };
    const day = dateOrdinal(tomorrow.getDay());
    const year = tomorrow.getFullYear();

    const month = tomorrow.toLocaleString('default', { month: 'long' });
    
    function dateSwitchAlert() {
        alert("The scope of this app limits the date to " +
        "tomorrow only. Therefore, swiching dates is not " +
        "currently available.");
    }

    return (
        <div className="date-switcher-container">
            <img onClick={dateSwitchAlert} className="arrow-left" src={leftArrowGray} alt="disabled left arrow" />
            {day} {month} {year}
            <img onClick={dateSwitchAlert} className="arrow-right" src={rightArrowGray} alt="disabled right arrow" />
        </div>
    )
}

export default DateSwitcher;