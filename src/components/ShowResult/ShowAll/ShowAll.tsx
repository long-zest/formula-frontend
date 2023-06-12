
const ShowAll = ({ data, getData }: any) => {
    return (
        <>
            <div className='showResultTitle'>
                All of Round in <span className='specificText'>{data.season}</span> Season:
            </div>
            <div className="labelData">
                <div className='labelDataItem roundNumber'>Ro.Num</div>
                <div className="flexContainer">
                    <div className='labelDataItem'>Race Name</div>
                    <div className='labelDataItem dateColumn'>Date</div>
                    <div className='labelDataItem'>Racer</div>
                    <div className='labelDataItem lapsColumn'>Laps</div>
                    <div className='labelDataItem'>Time</div>
                </div>
            </div>
            {
                [...data.Races]?.reverse()?.map((race: any, index) => (
                    <div onClick={() => { getData({ season: race.season, round: race.round }) }} className={`dataField ${index === 0 ? "firstDataField" : null}`} key={race?.round}>
                        <div className='dataFlexContainer'>
                            <div className='labelDataItem roundNumber'><span>Round Number:&nbsp;</span>{race?.round}</div>
                            <div className="flexContainer">
                                <div className='labelDataItem'><span>Race Name:&nbsp;</span>{race?.raceName}</div>
                                <div className='labelDataItem dateColumn'><span>Date:&nbsp;</span>{race?.date}</div>
                                <div className='labelDataItem'><span>Racer:&nbsp;</span>{race?.Results[0].Driver.givenName + ' ' + race?.Results[0].Driver.familyName}</div>
                                <div className='labelDataItem lapsColumn'><span>Laps:&nbsp;</span>{race?.Results[0].laps}</div>
                                <div className='labelDataItem'><span>Time:&nbsp;</span>{race?.Results[0].Time.time}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ShowAll