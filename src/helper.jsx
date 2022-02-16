import React from 'react'
import numeral from 'numeral';
import { Circle, Popup } from "react-leaflet";


//Table Data Sorting 
export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
    //Another Way and that's pretty good
    // return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
}

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 300,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 800,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};

//DRAW circles on the map with intractive tooltip
export const showDataOnMap = ((data, casesType) => {
    return (
        data.map((country) => {
            return (
                <Circle
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={0.4}
                    color={casesTypeColors[casesType].hex}
                    fillColor={casesTypeColors[casesType].hex}
                    radius={
                        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                    }
                >
                    <Popup>
                        <div className="info-container">
                            <div
                                className="info-flag"
                                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                            />
                            <div className='info-name'>{country.country}</div>
                            <div className='info-cases'>Cases:{numeral(country.cases).format("0,0")}</div>
                            <div className='info-recover'> Recovered: {numeral(country.recovered).format("0,0")}</div>
                            <div className='info-deth'> Deaths: {numeral(country.deaths).format("0,0")}</div>
                        </div>
                    </Popup>

                </Circle >
            )
        })
    )
})

export const prettyPrintStat = (total) =>
    total ? `+${numeral(total).format("0.0a")}` : "+0";
