import React, { useEffect, useState } from 'react'
import "./DriverDetail.scss"
import { useParams } from 'react-router-dom'
import formulaApi from '../../apis/apis'
import { Image, Spin } from 'antd'
import * as constIndex from "../../constants/constIndexData"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,

        },
        title: {
            display: true,
            text: 'Point of all round of current Season',
        },
        colors: {
            forceOverride: true
        }
    },
    maintainAspectRatio: false,
};

const indexData: any = constIndex.INDEX_DATA

const DriverDetail = () => {
    const { id }: any = useParams()
    const [driverData, setDriverData] = useState<any[]>([])
    const [driverResultData, setDriverResultData] = useState<any[]>([])
    const [driverPreviousResultData, setDriverPreviousResultData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [imgData, setImgData] = useState("error")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            handleGetDriverData()
            handleGetDriverPreviousResultData()
        };

        fetchData();
        // eslint-disable-next-line
    }, [])

    const labels = driverResultData.map((data) => data.round);

    const lineChartData = {
        labels,
        fill: false,
        datasets: [
            {
                label: 'Point',
                data: driverResultData.map((data) => data.Results[0].points),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const pieData = {
        labels: driverPreviousResultData.slice(0, 5).map((driver) => driver.season),
        datasets: [
            {
                label: 'Season Point',
                data: driverPreviousResultData.slice(0, 5).map((driver) => driver.DriverStandings[0].points),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const handleGetDriverData = async () => {
        try {
            const driverResultRes = await formulaApi.getDriverResultCurrentYear(id)
            setDriverData([...driverData, driverResultRes.data.MRData.RaceTable.Races[0].Results[0].Driver])
            setDriverResultData(driverResultRes.data.MRData.RaceTable.Races)
        } catch (error) {
            const driverDetailRes = await formulaApi.getDriverDetail(id)
            setDriverData(driverDetailRes.data.MRData.DriverTable.Drivers)
        }
    }

    const handleGetDriverPreviousResultData = async () => {
        try {
            const driverPreviousResultRes = await formulaApi.getDriverResultPreviousYear(id)
            console.log(driverPreviousResultRes)
            handleGetImg([...driverPreviousResultRes.data.MRData.StandingsTable.StandingsLists]?.reverse()[0]?.DriverStandings[0].Driver.url)
            setDriverPreviousResultData([...driverPreviousResultRes.data.MRData.StandingsTable.StandingsLists]?.reverse())
        } catch (error) {
            console.log('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    const handleGetImg = async (url: string) => {
        const res = await formulaApi.getImgFromWiki(url?.substring(url.lastIndexOf('/') + 1))
        const objectData: Object = res.data.query.pages
        const imgLink: string = Object.values(objectData)[0].original?.source

        setImgData(imgLink)
    }


    return (
        <>
            <Spin tip="Loading..." spinning={loading}>
                <div>
                    {driverData.length === 0 ? "Nothing here..." :
                        <div className='topArea'>
                            <div className='topLeftArea'>
                                <div className='textAreaTitle'>
                                    Racer Info
                                </div>
                                {
                                    driverData?.map((driver) => (
                                        <div className='infoField' key={driver.driverId}>
                                            <div className='infoFieldImageContainer'>
                                                <Image
                                                    className='infoFieldImage'
                                                    preview={false}
                                                    width={"100%"}
                                                    src={imgData}
                                                    loading='lazy'
                                                    fallback="data:image/png;base64,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"
                                                />
                                            </div>
                                            <div className='infoFieldItemContainer'>
                                                <div className='infoFieldItem'>Name: <span className='infoFieldItemTextData'>{driver?.givenName + ' ' + driver?.familyName}</span></div>
                                                <div className='infoFieldItem'>Birthday: <span className='infoFieldItemTextData'> {driver?.dateOfBirth}</span></div>
                                                <div className='infoFieldItem'>Nation:  <span className='infoFieldItemTextData'>{driver?.nationality}</span></div>
                                                <div className='infoFieldItem'>Number:  <span className='infoFieldItemTextData'>{driver?.permanentNumber}</span></div>
                                                <div className='infoFieldItem'>{driverPreviousResultData[0]?.season} Position: <span className='infoFieldItemTextData'>{driverPreviousResultData[0]?.DriverStandings[0].position}</span></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='topCenterArea'>
                                <div className='pieChartArea'>
                                    <Pie options={{
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: "right"
                                            }
                                        }, maintainAspectRatio: false,
                                    }} data={pieData} />
                                </div>
                            </div>

                            <div className='topRightArea'>
                                <div className='textAreaTitle'>
                                    Season Racer participated
                                </div>
                                {driverPreviousResultData.map((driver, index) => (
                                    <div className='topRightAreaText' key={driver.season}><span className={`${indexData[index]}`}>{driver.season}</span>: <span className='topRightAreaTextPoint'>{driver.DriverStandings[0].points} point</span></div>
                                )
                                )}
                            </div>
                        </div>
                    }
                </div>

                <div className='bottomArea'>
                    <div className='lineChartArea'>
                        <Line options={options} data={lineChartData} />
                    </div>
                    <div className='bottomRightArea'>
                        <div className='textAreaTitle'>
                            Current season point
                        </div>
                        {driverResultData.map((result) => (
                            <div className='bottomRightAreaText' key={result.round}>Round {result.round}: <span className='bottomRightAreaTextPoint'>{result.Results[0].points} point</span></div>
                        ))}
                    </div>
                </div>

            </Spin>


        </>
    )
}

export default DriverDetail