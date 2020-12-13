import '../styles/FlightsComponent.scss';

function Flights({flights, addFlightToRotationFunction}) {

    return (
        <div className="flights-container">
            {flights &&
                flights.map((flight, index) => {
                    return (
                        <div className="flight-div" key={index} onClick={() => addFlightToRotationFunction(flight)}>
                            <span className="font-weight-bold">{flight.id}</span><br />
                            <div className="columns" style={{marginTop: "20px"}}>
                                <div className="column col-6" style={{textAlign: "left"}}>
                                    {flight.origin}<br />
                                    {flight.readable_departure}
                                </div>
                                <div className="column col-6" style={{textAlign: "right"}}>
                                    {flight.destination}<br />
                                    {flight.readable_arrival}
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Flights;