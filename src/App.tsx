import React, { useState, useEffect } from 'react';
import './App.scss';
import DropdownBox from './components/DropdownBox/DropdownBox';
import formulaApi from './apis/apis';
import initialState from './types/initialState';
import ShowResult from './components/ShowResult/ShowResult';
import * as publicConstant from "./constants/public"
import { Space, Spin } from 'antd';
import ShowDrivers from './components/ShowDrivers/ShowDrivers';
import { Routes, Route, Link, useLocation } from "react-router-dom"
import DriverDetail from './components/DriverDetail/DriverDetail';

const YEAR = publicConstant.SEASON
const ROUND = publicConstant.ROUND

const initialStateData: initialState = {
  season: YEAR,
  round: ROUND
}

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const [searchType, setSearchType] = useState(location.pathname.slice(1))

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (location.pathname.slice(1) === "drivers") {
          setLoading(true)
          setData([])
          const response = await formulaApi.getDriversWithYear(initialStateData)
          setData(response.data.MRData.StandingsTable)
        } else {
          setLoading(true)
          setData([])
          const response = await formulaApi.getResult(initialStateData)
          setData(response.data.MRData.RaceTable)
        }
        
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [location.pathname]);

  const getData = async (initialStateData: initialState) => {
    setLoading(true)
    try {
      const response = await formulaApi.getResult(initialStateData)

      setData(response.data.MRData.RaceTable)
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  const getDrivers = async (initialStateData: initialState) => {
    setLoading(true)
    try {
      const response = await formulaApi.getDriversWithYear(initialStateData)

      setData(response.data.MRData.StandingsTable)
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleSearchTypeChange = (type: string) => {
    setData([])
    switch (type) {
      case "results":
        setSearchType("results")
        getData(initialStateData)
        break
      case "drivers":
        setSearchType("drivers")
        getDrivers(initialStateData)
        break
      case "rounds":
        setSearchType("rounds")
        getData(initialStateData)
        break
      default:
        break
    }
  }

  return (
    <div className="App">
      <div className='Nav'>
        <Space>
          <Link to="/results" onClick={() => handleSearchTypeChange("results")} className='Nav-item'>
            RESULTS
          </Link>
          <Link to="/drivers" onClick={() => handleSearchTypeChange("drivers")} className='Nav-item'>
            DRIVERS
          </Link>
          <Link to="/rounds" onClick={() => handleSearchTypeChange("rounds")} className='Nav-item'>
            ROUNDS
          </Link>
        </Space>
      </div>

      {/* <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} /> */}

      <Routes>
        <Route path='/' element={
            data.length !== 0
            ? 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              <ShowResult getData={getData} data={data} />
            </Spin> 
            : 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              "Nothing here..."
            </Spin>
          }
        />
        <Route path='/results' element={
            data.length !== 0 && searchType === 'results'
            ? 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              <ShowResult getData={getData} data={data} />
            </Spin> 
            : 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              "Nothing here..."
            </Spin>
          }
        />
        <Route path='/drivers' element={
            data.length !== 0 && searchType === 'drivers'
            ? 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              <ShowDrivers data={data} />
            </Spin> 
            : 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              "Nothing here..."
            </Spin>
          }
        />
        <Route path='/rounds' element={
            data.length !== 0 && searchType === 'rounds'
            ? 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              <ShowResult getData={getData} data={data} />
            </Spin> 
            : 
            <Spin tip="Loading..." spinning={loading}>
              <DropdownBox getData={getData} getDrivers={getDrivers} races={data} searchType={searchType} />
              "Nothing here..."
            </Spin>
          }
        />
        <Route path='/driver/:id' element={<DriverDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
