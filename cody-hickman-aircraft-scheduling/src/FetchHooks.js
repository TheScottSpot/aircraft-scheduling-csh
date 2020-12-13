import { useState, useEffect} from 'react';
import axios from 'axios';

import {apiUrl} from './env'

export function useFlightsData(pageState) {
    let [flightsState, setFlightsState] = useState([]);

    useEffect(() => {
       axios({
        "method": "GET",
        "url": `${apiUrl}/flights?limit=5&offset=${pageState}`,
        "headers": {},
        "params": {
            "language_code": "en"
        }
    })
    .then((response) => {
      setFlightsState(response.data.data)
    })
    .catch ((error) => {
        console.log(error)
    })
    }, [pageState]);

    return [flightsState, setFlightsState];
}

export function useAircraftsData() {
    let [aircraftsResponseData, setAircraftsResponseData] = useState([]);

    useEffect(() => {
       axios({
        "method": "GET",
        "url": `${apiUrl}/aircrafts`,
        "headers": {},
        "params": {
            "language_code": "en"
        }
    })
    .then((response) => {
        setAircraftsResponseData(response.data.data)
    })
    .catch ((error) => {
        console.log(error)
    })
    }, []);

    return [aircraftsResponseData, setAircraftsResponseData];
}