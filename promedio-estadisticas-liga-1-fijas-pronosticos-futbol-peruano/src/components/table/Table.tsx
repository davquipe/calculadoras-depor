import React, { useEffect, useState } from 'react'
import { Row, TableRowProps } from '../../types/types'
import { urlShields } from '../../Constants';
import Image from 'react-bootstrap/Image';
import { teamsConvertedName } from './teams';
import ButtonCall from './button';



export interface TeamStats {
    team: string;
    name: string;
    position: number;
    matches: number;
    corners: number;
    offside: number;
    goalsFavor: number;
    goalsAgainst: number;
    yellowCards: number;
    undefeatedArch: number;
};

const TableNew = ({ allScores }: TableRowProps) => {

    const [teams, setTeams] = useState<TeamStats[]>([])
    const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);

    const defaultTeam: TeamStats = {
        team: '',
        name: '',
        position: 0,
        matches: 0,
        corners: 0,
        offside: 0,
        goalsFavor: 0,
        goalsAgainst: 0,
        yellowCards: 0,
        undefeatedArch: 0,
    }

    const transformData = (data: Row[]) => {
        let arrayTeams: TeamStats[] = [];
        let dataTeam: TeamStats = defaultTeam;
        let team = '';
        let name = ''
        let position = 0;
        let matches = 0;
        let offside = 0;
        let corners = 0;
        let goalsFavor = 0;
        let goalsAgainst = 0;
        let yellowCards = 0;
        let undefeatedArch = 0;

        (Object.values(data)).map(teamData => {
            const getValue = (index: number) => (teamData.c[index] && teamData.c[index]['v']) ? teamData.c[index]['v'] : '';

            team = getValue(0);
            name = teamsConvertedName(team)
            position = parseInt(getValue(1)) || 0;
            matches = parseInt(getValue(2)) || 0;
            corners = (parseInt(getValue(3)) || 0) / matches;
            offside = (parseInt(getValue(4)) || 0) / matches;
            goalsFavor = (parseInt(getValue(5)) || 0) / matches;
            goalsAgainst = (parseInt(getValue(6)) || 0) / matches;
            yellowCards = (parseInt(getValue(7)) || 0) / matches;
            undefeatedArch = parseInt(getValue(8)) || 0;

            dataTeam = {
                team,
                name,
                position,
                matches,
                offside,
                corners,
                goalsFavor,
                goalsAgainst,
                yellowCards,
                undefeatedArch
            }

            return dataTeam.position !== 0 && arrayTeams.push(dataTeam)
        })

        arrayTeams.sort((a, b) => {
            if (a.position > b.position) return 1;
            if (a.position < b.position) return -1;
            return 0;
        })

        return arrayTeams
    }

    useEffect(() => {
        setTeams(transformData(allScores))
    }, [])

    const messagesButtons = [
        { description: 'Tiros de esquina', criterion: 'corners' as keyof TeamStats },
        { description: 'Fueras de juego', criterion: 'offside' as keyof TeamStats },
        { description: 'Goles a favor', criterion: 'goalsFavor' as keyof TeamStats },
        { description: 'Goles recibidos', criterion: 'goalsAgainst' as keyof TeamStats },
        { description: 'Tarjetas amarillas', criterion: 'yellowCards' as keyof TeamStats },
        { description: 'Vallas invictas', criterion: 'undefeatedArch' as keyof TeamStats },
    ]

    const orderFunction = (criterion: keyof TeamStats, order: 'max' | 'min') => {
        const orderTeams = [...teams];
        orderTeams.sort((a, b) => {
            if (order === 'min') {
                if (a?.[criterion] > b?.[criterion]) return 1;
                if (a?.[criterion] < b?.[criterion]) return -1;
            } else if (order === 'max') {
                if (a?.[criterion] < b?.[criterion]) return 1;
                if (a?.[criterion] > b?.[criterion]) return -1;
            }
            return 0;
        });
        return setTeams(orderTeams);
    };


    return (
        <section className="table-responsive px-0 content-standings">
            <div className='table-width legend-button'>
                <div className='w-100 d-flex only-margin'>
                    <div className='legend-table legend-table__first'>
                        <p>Equipo</p>
                    </div>
                    <div className='legend-table legend-table__second'>
                        <p>Partidos</p>
                    </div>
                    <div className='legend-table legend-table__third'>
                        <p>Promedio por partido</p>
                    </div>
                </div>
                <div className='d-flex width-max'>
                    {messagesButtons.map((button, i) => (
                        <ButtonCall
                            key={i}
                            button={button}
                            orderFunction={orderFunction}
                            isActive={activeButtonIndex === i}
                            onClick={() => setActiveButtonIndex(activeButtonIndex === i ? null : i)}
                            setActiveButtonIndex={setActiveButtonIndex}
                        />
                    ))}
                </div>
            </div>

            <table className="w-100 mb-0 text-center table-width" >
                <tbody>
                    {teams.map((team, i) => (
                        <tr key={`${i}-${team.team}`} className='row-table'>
                            <td>
                                <article className="teams-flag">
                                    <Image src={`${urlShields}/img/flags/${team.team}.png`} alt={`${team.team}-icon`} loading="lazy" height={20} />
                                    <p><span style={{ fontWeight: 'bolder' }}>{`${i + 1}. `}</span>{team.name}</p>
                                </article>
                            </td>
                            <td className='row-table__item'>
                                <span className='row-item__1'><span>{team.matches}</span></span>
                                <span className='row-item'><span>{team.corners.toFixed(2)}</span></span>
                                <span className='row-item'><span>{team.offside.toFixed(2)}</span></span>
                                <span className='row-item'><span>{team.goalsFavor.toFixed(2)}</span></span>
                                <span className='row-item'><span>{team.goalsAgainst.toFixed(2)}</span></span>
                                <span className='row-item'><span>{team.yellowCards.toFixed(2)}</span></span>
                                <span className='row-item'><span>{team.undefeatedArch}</span></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TableNew