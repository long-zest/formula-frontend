import { Link } from 'react-router-dom'

const ShowPerRound = ({ data }: any) => {
    const indexData: any = {
        "0": "firstPlaceDataField",
        "1": "secondPlaceDataField",
        "2": "thirdPlaceDataField"
    }

    return (
        <>
            <div className='showResultTitle'>
                Result of Round <span className='specificText'>{data?.round}</span> in <span className='specificText'>{data.season}</span> Season:
            </div>
            <div className="labelData">
                <div className='labelDataItem roundNumber'>Pos</div>
                <div className="flexContainer">
                    <div className='labelDataItem racerNumberColumn'>No</div>
                    <div className='labelDataItem'>Racer</div>
                    <div className='labelDataItem carColumn'>Car</div>
                    <div className='labelDataItem lapsColumn'>Laps</div>
                    <div className='labelDataItem'>Time</div>
                    <div className='labelDataItem pointColumn'>Point</div>
                </div>
            </div>
            {
                data.Races[0].Results.map((race: any, index: any) => (
                    <div className={`dataField ${indexData[index]}`} key={race?.round}>
                        <Link to={`/driver/${race?.Driver.driverId}`}>
                            <div className='dataFlexContainer'>
                                <div className='labelDataItem roundNumber'><span>Racer Position:&nbsp;</span>{race?.positionText}</div>
                                <div className="flexContainer">

                                    <div className='labelDataItem racerNumberColumn'><span>Racer Number:&nbsp;</span>{race?.number}</div>

                                    <div className='labelDataItem'><span>Racer:&nbsp;</span>{race?.Driver.givenName + ' ' + race?.Driver.familyName}</div>
                                    
                                    <div className='labelDataItem carColumn'><span>Car:&nbsp;</span>{race?.Constructor.name}</div>

                                    <div className='labelDataItem lapsColumn'><span>Laps:&nbsp;</span>{race?.laps}</div>

                                    <div className='labelDataItem'><span>Time:&nbsp;</span>{race?.Time?.time ? race?.Time.time : 0}</div>

                                    <div className='labelDataItem pointColumn'><span>Point:&nbsp;</span>{race?.points}</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))
            }
        </>
    )
}

export default ShowPerRound