import { Space } from 'antd'
import { Link } from 'react-router-dom'

const ShowPerRound = ({ data }: any) => {
    return (
        <>
            <div className='showResultTitle'>
                Result of Round <span className='specificText'>{data?.round}</span> in <span className='specificText'>{data.season}</span> Season:
            </div>
            {
                data.Races[0].Results.map((race: any) => (
                    <div className='dataField' key={race?.round}>
                        <Link to={`/driver/${race?.Driver.driverId}`}>
                            <Space size={'middle'}>
                                {race?.positionText}

                                {race?.number}

                                {race?.date}

                                {race?.Driver.givenName + ' ' + race?.Driver.familyName}

                                {race?.laps}

                                {race?.Time?.time ? race?.Time.time : 0}

                                {race?.points}
                            </Space>
                        </Link>
                    </div>

                ))
            }
        </>
    )
}

export default ShowPerRound