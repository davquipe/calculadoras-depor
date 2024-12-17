import Table from 'react-bootstrap/Table';

//types
import { Team, TeamData } from '../../types/types';

//components
import TeamStanding from './TeamStanding';

type StandingProps = {
    headingTable: string,
    seasonId: number,
    standings: TeamData[],
    teams: Team
    type: number
}

const Standings = ({ headingTable, standings, seasonId, teams, type }: StandingProps) => {

    return (
        <section className="table-responsive px-0 content-standings">
            <h2 className="my-2 my-md-3 text-center heading-table">{headingTable}</h2>
            <Table size="sm" className="w-100 mb-0 text-center">
                <thead className="standing-head">
                    <tr>
                        <th scope="col"><span className="mx-0 mx-md-2"></span></th>
                        <th scope=""><span className="mx-1 mx-md-5"></span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">PJ</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">PG</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">PE</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">PP</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">GF</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">GC</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">Dif.</span></th>
                        <th scope="col"><span className="mx-0 mx-md-2">Pts.</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((stdTeam, i) =>
                            <TeamStanding
                                key={stdTeam.id}
                                id={stdTeam.id}
                                name={teams[stdTeam.id].name}
                                position={i + 1}
                                positionClass={type === 1 ? `bg-normal-${i + 1}` : `bg-position-${i + 1}`}
                                playedMatches={stdTeam.seasons[seasonId].playedMatches}
                                wonMatches={stdTeam.seasons[seasonId].wonMatches}
                                drawnMatches={stdTeam.seasons[seasonId].drawnMatches}
                                lostMatches={stdTeam.seasons[seasonId].lostMatches}
                                goalsFor={stdTeam.seasons[seasonId].goalsFor}
                                goalsAgainst={stdTeam.seasons[seasonId].goalsAgainst}
                                goalsDifference={stdTeam.seasons[seasonId].goalsDifference}
                                points={stdTeam.seasons[seasonId].points}
                            />
                        )
                    }
                </tbody>
            </Table>
        </section>
    )
}

export default Standings