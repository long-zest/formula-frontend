import React, { useEffect } from 'react'
import "./ShowDrivers.scss"
import { Space } from 'antd'
import { Link } from 'react-router-dom'

const ShowDrivers = ({ data }: any) => {
    console.log(data)
    return (
        <div>
            <div className='showDriversTitle'>
                All Drivers {data?.round ? <> on Round <span className='specificText'>{data?.round}</span> </> : null} in <span className='specificText'>{data.season}</span> Season:
            </div>
            {
                data.StandingsLists?.length === 0 
                ? 
                "Nothing here..."
                :
                data?.StandingsLists[0].DriverStandings?.map((driver: any) => (
                    <div className='dataField' key={driver?.Driver.driverId}>
                        <Link to={`/driver/${driver?.Driver.driverId}`}>
                            <Space size={'middle'}>
                                {driver?.positionText}
                                {driver?.Driver.givenName}
                                {driver?.Driver.familyName}
                                {driver?.Driver.nationality}
                                {driver?.Constructors[0].name}
                                {driver?.points}
                            </Space>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowDrivers