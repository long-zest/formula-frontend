import "./ShowResult.scss"
import ShowPerRound from './ShowPerRound/ShowPerRound'
import ShowAll from './ShowAll/ShowAll'

const ShowResult = ({ data, getData }: any) => {
    
    return (
        <div className='showResult'>
            {
                data.Races?.length === 0 
                ? 
                "Nothing here..." 
                : 
                data?.round 
                ? 
                <ShowPerRound data={data} /> 
                :
                <ShowAll getData={getData} data={data} />
            }
        </div>
    )
}

export default ShowResult