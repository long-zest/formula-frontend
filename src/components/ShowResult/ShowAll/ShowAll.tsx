import { Space } from 'antd';


const ShowAll = ({ data, getData }: any) => {
    return (
        <>
            <div className='showResultTitle'>
                All of Round in <span className='specificText'>{data.season}</span> Season:
            </div>
            <div className="labelData">
                <div className='labelDataItem roundNumber'>Ro.Num</div>
                <div className="flexthing">
                    <div className='labelDataItem'>Race Name</div>
                    <div className='labelDataItem dateThing'>Date</div>
                    <div className='labelDataItem'>Racer</div>
                    <div className='labelDataItem lapsThing'>Laps</div>
                    <div className='labelDataItem'>Time</div>
                </div>
            </div>
            {
                [...data.Races]?.reverse()?.map((race: any) => (
                    <div onClick={() => { getData({ season: race.season, round: race.round }) }} className='dataField' key={race?.round}>
                        <div className='flexthing0'>
                            <div className='labelDataItem roundNumber'>{race?.round}</div>
                            <div className="flexthing">
                                <div className='labelDataItem'>{race?.raceName}</div>
                                <div className='labelDataItem dateThing'>{race?.date}</div>
                                <div className='labelDataItem'>{race?.Results[0].Driver.givenName + ' ' + race?.Results[0].Driver.familyName}</div>
                                <div className='labelDataItem lapsThing'>{race?.Results[0].laps}</div>
                                <div className='labelDataItem'>{race?.Results[0].Time.time}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ShowAll