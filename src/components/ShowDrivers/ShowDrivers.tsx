import "./ShowDrivers.scss"
import { Link } from 'react-router-dom'

const ShowDrivers = ({ data }: any) => {
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
                    <>  
                        <div className="labelData">
                            <div className='labelDataItem roundNumber'>Pos</div>
                            <div className="flexContainer">
                                <div className='labelDataItem racerNumberColumn'>Racer</div>
                                <div className='labelDataItem nationNumberColumn'>Nation</div>
                                <div className='labelDataItem carColumn'>Car</div>
                                <div className='labelDataItem pointColumn'>Point</div>
                            </div>
                        </div>

                        {data?.StandingsLists[0].DriverStandings?.map((driver: any) => (
                            <div className='dataField' key={driver?.Driver.driverId}>
                                <Link to={`/driver/${driver?.Driver.driverId}`}>
                                    <div className='dataFlexContainer'>
                                        <div className='labelDataItem roundNumber'><span>Racer Position:&nbsp;</span>{driver?.positionText}</div>
                                        <div className="flexContainer">
                                            <div className='labelDataItem racerNumberColumn'><span>Racer Number:&nbsp;</span>{driver?.Driver.givenName + ' ' + driver?.Driver.familyName}</div>
                                        
                                            <div className='labelDataItem nationNumberColumn'><span>Nation:&nbsp;</span>{driver?.Driver.nationality}</div>
                                            <div className='labelDataItem carColumn'><span>Car:&nbsp;</span>{driver?.Constructors[0].name}</div>
                                            <div className='labelDataItem pointColumn'><span>Point:&nbsp;</span>{driver?.points}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>
            }
        </div>
    )
}

export default ShowDrivers