import React from 'react';
import moment from 'moment';

import '../styles/DateSwitcherComponent.scss';
import leftArrowGray from '../images/arrow-left-gray.png';
import rightArrowGray from '../images/arrow-right-gray.png';

function DateSwitcher(props) {

    const date = moment().add(1, 'days').format("Do MMMM YYYY");
    
    function dateSwitchAlert() {
        alert("The scope of this app limits the date to " +
        "tomorrow only. Therefore, swiching dates is not " +
        "currently available.");
    }

    return (
        <div className="date-switcher-container">
            <img onClick={dateSwitchAlert} className="arrow-left" src={leftArrowGray} alt="disabled left arrow" />
            {date}
            <img onClick={dateSwitchAlert} className="arrow-right" src={rightArrowGray} alt="disabled right arrow" />
        </div>
    )
}

export default DateSwitcher;