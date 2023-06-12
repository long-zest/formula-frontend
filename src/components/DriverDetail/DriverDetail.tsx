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
                const response = await formulaApi.getDriverDetail(id)
                const driverResultRes = await formulaApi.getDriverResultCurrentYear(id)
                const driverPreviousResultRes = await formulaApi.getDriverResultPreviousYear(id)
                setDriverData(response.data.MRData.DriverTable.Drivers)
                setDriverResultData(driverResultRes.data.MRData.RaceTable.Races)
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
                label: '# of Votes',
                data: driverPreviousResultData.map((driver) => driver.DriverStandings[0].points),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
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

    console.log(driverPreviousResultData)

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

                            <div className='topRightArea'>
                                <div className='pieChartArea'>
                                    <Pie options={{ maintainAspectRatio: false, }} data={pieData} />
                                </div>
                                <div>
                                    somethint
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className='lineChartArea'>
                    <Line options={options} data={lineChartData} />
                </div>
            </Spin>


        </>
    )
}

export default DriverDetail