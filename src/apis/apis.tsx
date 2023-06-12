import axios from 'axios';
import initialState from '../types/initialState';

const URL = "http://ergast.com/api/f1"
const RACE_RESULT_LIMIT = 1000
const SEASONS_LIMIT = 100
const SEASONS_OFFSET = 60
const DRIVERS_WITH_YEAR_LIMIT = 50

const formulaApi = {
    getResult(initialState: initialState) {
        const {season, round} = initialState

        let url = `${URL}/${season}/results.json?limit=${RACE_RESULT_LIMIT}`
        if(round !== "all") {
            url = `${URL}/${season}/${round}/results.json?limit=${RACE_RESULT_LIMIT}`
        }
        return axios.get(url)
    },
    getSeasons() {
        const url = `${URL}/seasons.json?limit=${SEASONS_LIMIT}&offset=${SEASONS_OFFSET}`
        return axios.get(url)
    },
    getDriversWithYear(initialState: initialState) {
        const {season, round} = initialState

        let url = `${URL}/${season}/driverStandings.json?limit=${DRIVERS_WITH_YEAR_LIMIT}`
        if(round !== "all") {
            url = `${URL}/${season}/${round}/driverStandings.json?limit=${DRIVERS_WITH_YEAR_LIMIT}`
        }
        return axios.get(url)
    },
    getDriverDetail(driverId: string){
        const url = `${URL}/drivers/${driverId}.json`
        return axios.get(url)
    },
    getDriverResultCurrentYear(driverId: string){
        const url = `${URL}/current/drivers/${driverId}/results.json`
        return axios.get(url)
    },
    getDriverResultPreviousYear(driverId: string){
        const url = `${URL}/drivers/${driverId}/driverStandings.json`
        return axios.get(url)
    }
}

export default formulaApi