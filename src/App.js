import React, { useState, useEffect } from 'react'
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core'
import axios from 'axios'
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { prettyPrintStat, sortData } from './helper'
// import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css' //this is map helper

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [countryTable, setCountryTable] = useState([])
  const [mapCenter, setMapCenter] = useState([20, 77])
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')



  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then((responce) => {
        setCountries(responce.data)

        setMapCountries(responce.data)

        //sidebar table data sorting 
        const sortedData = sortData(responce.data)
        setCountryTable(sortedData)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  //This one is worldwide corona data fetching action
  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all').then((responce) => {
      setCountryInfo(responce.data)
    })

  }, [])


  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    //side table setUp
    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    axios.get(url).then((responce) => {
      // console.log(responce);
      setCountry(countryCode)
      setCountryInfo(responce.data)

      const { lat, long } = responce.data.countryInfo;
      // setMapCenter({ lat: lat, lng: long })
      setMapCenter([lat, long])
      setMapZoom(3)
    })
  }
  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map((eachCountry, index) => {
                  return (
                    <MenuItem key={index} value={eachCountry.countryInfo.iso2}> {eachCountry.country}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="infoboxes">
          <InfoBox
            active={casesType === "cases"}
            onClick={() => setCasesType('cases')}
            title="Coronavirus cases"
            total={prettyPrintStat(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={() => setCasesType('recovered')}
            title="Recovered"
            total={prettyPrintStat(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          />
          <InfoBox
            active={casesType === "deaths"}
            onClick={() => setCasesType('deaths')}
            title="Deaths"
            total={prettyPrintStat(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          />
        </div>

        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
      </div>
      <div className="app_right">
        <Card className="app_right_card">
          <CardContent>
            <h3>Live Cases by Countries</h3>
            <Table countries={countryTable} />
            {/* <h3>Worldwide new </h3> */}
            {/* <LineGraph casesType={casesType} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
