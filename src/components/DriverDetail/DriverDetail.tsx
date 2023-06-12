import React, { useEffect, useState } from 'react'
import "./DriverDetail.scss"
import { useParams } from 'react-router-dom'
import formulaApi from '../../apis/apis'
import { Space, Spin } from 'antd'
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

const DriverDetail = () => {
    const { id }: any = useParams()
    const [driverData, setDriverData] = useState<any[]>([])
    const [driverResultData, setDriverResultData] = useState<any[]>([])
    const [driverPreviousResultData, setDriverPreviousResultData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const driverResultRes = await formulaApi.getDriverResultCurrentYear(id)
                setDriverData([...driverData, driverResultRes.data.MRData.RaceTable.Races[0].Results[0].Driver])
                setDriverResultData(driverResultRes.data.MRData.RaceTable.Races)
            } catch (error) {
                const driverDetailRes = await formulaApi.getDriverDetail(id)
                setDriverData(driverDetailRes.data.MRData.DriverTable.Drivers)
            }
            try {

                const driverPreviousResultRes = await formulaApi.getDriverResultPreviousYear(id)

                setDriverPreviousResultData([...driverPreviousResultRes.data.MRData.StandingsTable.StandingsLists]?.reverse().slice(0, 3))
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
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
        labels: driverPreviousResultData.map((driver) => driver.season),
        datasets: [
            {
                label: 'Season Point',
                data: driverPreviousResultData.map((driver) => driver.DriverStandings[0].points),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    console.log(driverResultData)

    return (
        <>
            <Spin tip="Loading..." spinning={loading}>
                <div>
                    {driverData.length === 0 ? "Nothing here..." :
                        <div className='topArea'>
                            <div className='topLeftArea'>
                                {
                                    driverData?.map((driver) => (
                                        <div className='infoField' key={driver.driverId}>
                                            <Space direction='vertical'>
                                                {'Name: ' + driver?.givenName + ' ' + driver?.familyName}
                                                {'Birthday: ' + driver?.dateOfBirth}
                                                {'Nation: ' + driver?.nationality}
                                            </Space>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='topCenterArea'>
                                <div className='pieChartArea'>
                                    <Pie options={{ maintainAspectRatio: false, }} data={pieData} />
                                </div>
                            </div>

                            <div className='topRightArea'>
                                {driverPreviousResultData.map((driver) => (
                                    <div className='topRightAreaText' key={driver.season}><span>{driver.season}</span>: {driver.DriverStandings[0].points} point</div>
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
                        {/* <div>
                            Current season point
                        </div> */}
                        {driverResultData.map((result) => (
                            <div className='bottomRightAreaText' key={result.round}>Round {result.round}: {result.Results[0].points} point</div>
                        ))}
                    </div>
                </div>

            </Spin>


        </>
    )
}

export default DriverDetail