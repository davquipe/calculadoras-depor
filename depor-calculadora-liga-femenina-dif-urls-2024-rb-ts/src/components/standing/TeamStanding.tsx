import Image from 'react-bootstrap/Image';

//constants
import { urlShields } from '../../Constants';

//types
import { Standing } from '../../types/types';

type TeamStandingProps = Standing & {
    id: string,
    position: number,
    positionClass: string
}

const TeamStanding = ({ id, position, positionClass, name, playedMatches, wonMatches, drawnMatches, lostMatches, goalsFor, goalsAgainst, goalsDifference, points }: TeamStandingProps) => {
    return (
        <tr className={`border-bottom border-white align-middle standing-data ${positionClass}`}>
            <td><span className="align-bottom">{position}</span></td>
            <td>
                <article className="d-flex align-items-center justify-content-start">
                    <div className='table-team'>
                        <Image className="pe-1 pe-md-2" src={`${urlShields}/img/escudos/${id}.png`} alt={name} loading="lazy" />
                    </div>
                    <span className="ms-1 ms-md-3 text-start text-md-center">{name}</span>
                </article>
            </td>
            <td><span className="align-bottom">{playedMatches}</span></td>
            <td><span className="align-bottom">{wonMatches}</span></td>
            <td><span className="align-bottom">{drawnMatches}</span></td>
            <td><span className="align-bottom">{lostMatches}</span></td>
            <td><span className="align-bottom">{goalsFor}</span></td>
            <td><span className="align-bottom">{goalsAgainst}</span></td>
            <td><span className="align-bottom">{goalsDifference}</span></td>
            <td><span className="align-bottom fw-bolder">{points}</span></td>
        </tr>
    )
}

export default TeamStanding