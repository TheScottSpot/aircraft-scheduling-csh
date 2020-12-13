import React from 'react';
import CanvasJSReact from '../canvasjs.react';

import '../styles/ScheduleMeterComponent.scss';

function ScheduleMeter({rotation}) {

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        height: 80,
        backgroundColor: "transparent",
        interactivityEnabled: false,
        animationEnabled: "true",
        creditText: "false",
        toolTip: {
            backgroundColor: "rgba(138,138,138,0.8)",
            fontColor: "white",
            fontStyle: "normal",
            fontFamily: "'Open Sans', sans-serif",
            enabled: false,
            contentFormatter: function (e) {
            var content = "";
            for (var i = 0; i < e.entries.length; i++) {
                content += e.entries[i].dataPoint.indexLabel
            }
            return content;
        }
      },
      axisX: {
        interval: 0,
        gridThickness: 0,
        tickLength: 0,
        tickThickness: 0,
        lineThickness: 0,
        labelFontSize: 0,
      },
      axisY2: {
        interval: 0,
        gridThickness: 0,
        tickLength: 0,
        tickThickness: 0,
        lineThickness: 0,
        lablFontSize: 0,
        labelFontColor: "transparent",
        minimum: 0,
        maximum: 86400,
        stripLines: [{
          value: 2000,
          thickness: 1,
          color: "black",
          showOnTop: false,
          label: "00:00",
          labelPlacement: "outside",
          labelFontSize: 16,
          labelFontColor: "black",
          labelBackgroundColor: "transparent",
          tickLength: 0
        },
        {
          value: 43200,
          thickness: 1,
          color: "black",
          showOnTop: true,
          label: "12:00",
          labelPlacement: "outside",
          labelFontSize: 16,
          labelFontColor: "black",
          labelBackgroundColor: "transparent",
          tickLength: 0
        }]
      },
      dataPointWidth: 50,
      dataPointMinWidth: 50,
      dataPointMaxWidth: 50,
      data: [
      {
        type: "stackedBar",
        axisYType: "secondary",
        indexLabelFontSize: 0,
        dataPoints: [
        { y: 86400, color: "#d0d1d2", indexLabel: "No active flights"}
        ]
      }
      ]
    }

    const changeOptions = () => {
        if (rotation) {
            //flights.sort((a, b) => (a.readable_departure > b.readable_departure) ? 1 : -1);
            for (var i = 0; i < rotation.length; i++) {
                options.axisY2.stripLines.push( {
                    startValue: rotation[i].departuretime,
                    endValue: rotation[i].arrivaltime,
                    color: "#56c642",
                    showOnTop: "true",
                    label: "",
                    tickLength: 0
                })
                options.axisY2.stripLines.push( {
                  startValue: rotation[i].arrivaltime,
                  endValue: (rotation[i].arrivaltime + 1200),
                  color: "#7234dc",
                  showOnTop: "true",
                  label: "",
                  tickLength: 0
              })
            }
        }
    }

    changeOptions();

    return (
        <div>
            <div className="chart-container">
                <CanvasJSChart options = {options} />
            </div>
        </div>
    )
}

export default ScheduleMeter;