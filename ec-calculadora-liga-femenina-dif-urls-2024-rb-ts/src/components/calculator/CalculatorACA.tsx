import { useState, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from 'react-router-dom';

//constants
import { accumulatedId, aperturaId, clausuraId, currentSeason, isCurrentMatchDay, isPlayed, sessionStorageKey } from '../../Constants';

//types
import { CalculatorProps, ChangeMatchDayAction, ChangeMatchDayState, FormFields, Match, MatchResult, MatchByMatchDay, Row, Team, TeamData } from '../../types/types';
import { ChangeMatchDayActionType } from '../../types/enums';

//teams
import { teamsAC } from '../../teams/TeamsAC';

//components
import Standings from '../standing/Standings';
import Legend from '../common/Legend';
import MatchDays from './MatchDays';
import MatchDayForm from '../form/MatchDayForm';

type CalculatorACAProps = CalculatorProps;

const defaultMatchResults = { pointsHome: 0, pointsAway: 0, drawnHome: '', drawnAway: '', winner: '', loser: '' };

const defaultMatch = {
    matchNumber: 0,
    matchDay: 0,
    home: '',
    goalsHome: 0,
    goalsAway: 0,
    away: '',
    finished: false,
    currentMatchDay: false,
    pointsHome: 0,
    pointsAway: 0,
    winner: '',
    loser: '',
    drawnHome: '',
    drawnAway: '',
    fromApi: false,
    fromSessionStorage: false,
    season: '',
    additionalPointsHome: 0,
    additionalPointsAway: 0
}

const CalculatorACA = ({ allScores, defaultMatchDay }: CalculatorACAProps) => {

    const middleIndex = Math.ceil(allScores.length / 2);
    const aperturaScores: Row[] = allScores.slice().splice(0, middleIndex);
    const clausuraScores = allScores.slice().splice(-middleIndex);

    const [showStandings, setShowStandings] = useState<boolean>(false);
    const [standings, setStandings] = useState<TeamData[][]>([]);
    const [showAperturaStandings, setShowAperturaStandings] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const pointsWinner = 3;
    const pointsTie = 1;
    const pointsLoser = 0;
    let matchResults: MatchResult = defaultMatchResults;

    const minActiveMatchDay = 1;

    const getMatchesFromApi = (scores: Row[]) => {

        let matches: Match[] = [];
        let match: Match = defaultMatch;
        let matchNumber = 0;
        let matchDay = 0;
        let home = '';
        let goalsHome = 0;
        let goalsAway = 0;
        let away = '';
        let finished = false;
        let currentMatchDay = false;
        let fromApi = false;
        let season = '';
        let pointsHome = 0;
        let pointsAway = 0;
        let winner = '';
        let drawnHome = '';
        let drawnAway = '';
        let loser = '';
        let fromSessionStorage = false;
        let additionalPointsHome = 0;
        let additionalPointsAway = 0;

        (Object.values(scores)).map(score => {

            matchDay = parseInt(score.c[0]['v']);
            season = score.c[1]['v'].toLowerCase();
            matchNumber = parseInt(score.c[2]['v']);
            home = score.c[3]['v'];
            goalsHome = parseInt(score.c[4]['v']);
            goalsAway = parseInt(score.c[5]['v']);
            away = score.c[6]['v'];
            finished = (score.c[7]['v'] === isPlayed) && true;
            currentMatchDay = (score.c[8]['v'] === isCurrentMatchDay) && true;
            additionalPointsHome = parseInt(score.c[9]['v']) - parseInt(score.c[10]['v']);
            additionalPointsAway = parseInt(score.c[11]['v']) - parseInt(score.c[12]['v']);

            if (finished) {
                matchResults = getMatchResults(home, away, goalsHome, goalsAway, pointsHome, pointsAway, drawnHome, drawnAway, winner, loser);
                fromApi = true;
            }

            match = {
                matchNumber,
                matchDay,
                home,
                goalsHome,
                goalsAway,
                away,
                finished,
                currentMatchDay,
                pointsHome: matchResults.pointsHome,
                pointsAway: matchResults.pointsAway,
                winner: matchResults.winner,
                loser: matchResults.loser,
                drawnHome: matchResults.drawnHome,
                drawnAway: matchResults.drawnAway,
                fromApi,
                fromSessionStorage,
                season,
                additionalPointsHome,
                additionalPointsAway
            };

            matches[matchNumber] = match;
            winner = '';
            drawnHome = '';
            drawnAway = '';
            loser = '';
            matchResults = defaultMatchResults;
            fromApi = false;
            season = '';
        });

        return matches;
    }

    const getMatchResults = (home: string, away: string, goalsHome: number, goalsAway: number, pointsHome: number, pointsAway: number, drawnHome: string, drawnAway: string, winner: string, loser: string) => {

        pointsHome = pointsTie;
        pointsAway = pointsTie;
        drawnHome = home;
        drawnAway = away;

        if (goalsHome > goalsAway) {
            pointsHome = pointsWinner;
            pointsAway = pointsLoser;
            winner = home;
            loser = away;
            drawnHome = '';
            drawnAway = '';
        } else if (goalsAway > goalsHome) {
            pointsAway = pointsWinner;
            pointsHome = pointsLoser;
            winner = away;
            loser = home;
            drawnHome = '';
            drawnAway = '';
        }

        return { pointsHome, pointsAway, drawnHome, drawnAway, winner, loser };
    }

    const getMatchesFromSessionStorage = () => {
        let matches: Match[] = [];

        let dataFromSessionStorage: string = sessionStorage.getItem(sessionStorageKey) || '';

        if (dataFromSessionStorage && typeof dataFromSessionStorage === 'string') {
            try {
                matches = JSON.parse(dataFromSessionStorage);
            } catch (err) {
                console.log(err);
            }
        }

        return matches;
    }

    const aperturaMatches = getMatchesFromApi(aperturaScores);
    const clausuraMatchesFromApi = getMatchesFromApi(clausuraScores);
    const clausuraMatchesFromSessionStorage = getMatchesFromSessionStorage();

    const restoreMatchesKeys = (matches: Match[]) => {
        const entries = Object.keys(matches).map(matchKey => {
            let nMatchkey = parseInt(matchKey);
            let match = matches[nMatchkey];
            let newKey = match.matchNumber;
            return { [newKey]: match };
        });

        return Object.assign([], ...entries);
    }

    const clausuraMatches = (clausuraMatchesFromSessionStorage.length > 0) ? restoreMatchesKeys(clausuraMatchesFromSessionStorage) : clausuraMatchesFromApi;

    const getMatchesByMatchDay = (matches: Match[]) => {
        const matchesByMatchDay = matches.reduce((group: MatchByMatchDay, match: Match) => ({
            ...group,
            [match.matchDay]: [...(group[match.matchDay] || []), match]
        }), {});

        return matchesByMatchDay;
    }

    const matchesByMatchDay = getMatchesByMatchDay(clausuraMatches);

    const getCurrentMatchDay = (matches: Match[]) => (typeof defaultMatchDay === 'string') ? parseInt(defaultMatchDay) : getCurrentMatchDayFromApi(matches);

    const getCurrentMatchDayFromApi = (matches: Match[]) => {
        const matchWithCurrentDay = Object.values(matches).find(match => match.currentMatchDay === true);

        return (typeof matchWithCurrentDay !== 'undefined') ? matchWithCurrentDay.matchDay : minActiveMatchDay;
    }

    const breakTies = (arrayTeams: TeamData[], seasonId: number) => {

        arrayTeams.sort((a, b) => {

            if (a.seasons[seasonId].points === b.seasons[seasonId].points) {
                if (a.seasons[seasonId].goalsDifference < b.seasons[seasonId].goalsDifference) {
                    return 1;
                }

                if (a.seasons[seasonId].goalsDifference > b.seasons[seasonId].goalsDifference) {
                    return -1;
                }

                if (a.seasons[seasonId].goalsDifference === b.seasons[seasonId].goalsDifference) {
                    if (a.seasons[seasonId].goalsFor < b.seasons[seasonId].goalsFor) {
                        return 1;
                    }

                    if (a.seasons[seasonId].goalsFor > b.seasons[seasonId].goalsFor) {
                        return -1;
                    }

                    return 0;
                }

                return 0;
            }

            return 0;
        });

        return arrayTeams;
    }

    const getStanding = (matches: Match[], teams: Team, seasonId: number) => {

        let pointsHome = 0;
        let pointsAway = 0;
        let playedMatches = 0;
        let goalsFor = 0;
        let goalsAgainst = 0;
        let wonMatches = 0;
        let drawnMatches = 0;
        let lostMatches = 0;
        let additionalPointsHome = 0;
        let additionalPointsAway = 0;

        const arrayTeams = Object.values(teams);

        arrayTeams.map(team => {
            matches.map(match => {
                if (match.finished) {
                    if (team.id === match.home) {
                        pointsHome += match.pointsHome;
                        playedMatches++;
                        goalsFor += match.goalsHome;
                        goalsAgainst += match.goalsAway;
                        additionalPointsHome += match.additionalPointsHome!;
                    }
                    if (team.id === match.away) {
                        pointsAway += match.pointsAway;
                        playedMatches++;
                        goalsFor += match.goalsAway;
                        goalsAgainst += match.goalsHome;
                        additionalPointsAway += match.additionalPointsAway!;
                    }
                    if (team.id === match.winner) {
                        wonMatches++;
                    }
                    if (team.id === match.loser) {
                        lostMatches++;
                    }
                    if (team.id === match.drawnHome || team.id === match.drawnAway) {
                        drawnMatches++;
                    }
                }
            });

            team.seasons[seasonId].points = pointsHome + pointsAway;
            team.seasons[seasonId].playedMatches = playedMatches;
            team.seasons[seasonId].goalsFor = goalsFor;
            team.seasons[seasonId].goalsAgainst = goalsAgainst;
            team.seasons[seasonId].goalsDifference = goalsFor - goalsAgainst;
            team.seasons[seasonId].wonMatches = wonMatches;
            team.seasons[seasonId].lostMatches = lostMatches;
            team.seasons[seasonId].drawnMatches = drawnMatches;
            team.seasons[seasonId].additionalPoints = additionalPointsHome + additionalPointsAway;

            pointsHome = 0;
            pointsAway = 0;
            playedMatches = 0;
            goalsFor = 0;
            goalsAgainst = 0;
            wonMatches = 0;
            drawnMatches = 0;
            lostMatches = 0;
            additionalPointsHome = 0;
            additionalPointsAway = 0;
        });

        arrayTeams.sort((a, b) => (b.seasons[seasonId].points > a.seasons[seasonId].points ? 1 : -1));

        return breakTies(arrayTeams, seasonId);
    }

    const getAccumulatedStandings = () => {
        const arrayTeams = Object.values(teamsAC);

        arrayTeams.map(team => {
            team.seasons[accumulatedId].playedMatches = team.seasons[aperturaId].playedMatches + team.seasons[clausuraId].playedMatches;
            team.seasons[accumulatedId].wonMatches = team.seasons[aperturaId].wonMatches + team.seasons[clausuraId].wonMatches;
            team.seasons[accumulatedId].drawnMatches = team.seasons[aperturaId].drawnMatches + team.seasons[clausuraId].drawnMatches;
            team.seasons[accumulatedId].lostMatches = team.seasons[aperturaId].lostMatches + team.seasons[clausuraId].lostMatches;
            team.seasons[accumulatedId].goalsFor = team.seasons[aperturaId].goalsFor + team.seasons[clausuraId].goalsFor;
            team.seasons[accumulatedId].goalsAgainst = team.seasons[aperturaId].goalsAgainst + team.seasons[clausuraId].goalsAgainst;
            team.seasons[accumulatedId].goalsDifference = team.seasons[aperturaId].goalsDifference + team.seasons[clausuraId].goalsDifference;
            team.seasons[accumulatedId].points = (team.seasons[aperturaId].points + team.seasons[clausuraId].points) + (team.seasons[aperturaId].additionalPoints! + team.seasons[clausuraId].additionalPoints!);
        });

        arrayTeams.sort((a, b) => (b.seasons[accumulatedId].points > a.seasons[accumulatedId].points ? 1 : -1));

        return breakTies(arrayTeams, accumulatedId);
    }

    useEffect(() => {
        setStandings([
            getStanding(aperturaMatches, teamsAC, aperturaId),
            getStanding(clausuraMatches, teamsAC, clausuraId),
            getAccumulatedStandings()
        ])
        setShowStandings(true);
    }, []);

    const matchDays = Object.keys(matchesByMatchDay);
    const maxActiveMatchDay = matchDays.length;

    const initialMatchDay: ChangeMatchDayState = {
        activeMatchDay: getCurrentMatchDay(clausuraMatches)
    }

    const activeMatchDayReducer = (state: ChangeMatchDayState, action: ChangeMatchDayAction) => {

        switch (action.type) {
            case ChangeMatchDayActionType.INCREMENT:
                return { activeMatchDay: state.activeMatchDay + 1 };
            case ChangeMatchDayActionType.DECREMENT:
                return { activeMatchDay: state.activeMatchDay - 1 };
            case ChangeMatchDayActionType.UPDATE:
                return { activeMatchDay: action.payload };
            case ChangeMatchDayActionType.RESET:
                return { activeMatchDay: getCurrentMatchDayFromApi(clausuraMatches) };
        }
    }

    const [state, dispatch] = useReducer(activeMatchDayReducer, initialMatchDay);

    useEffect(() => {
        setSearchParams({ fecha: state.activeMatchDay.toString() });
    }, [state.activeMatchDay]);

    const disableButton = (matchDay: number, value: number) => (matchDay === value) ? true : false;

    const UsePersistForm = (matches: Match[]) => sessionStorage.setItem(sessionStorageKey, JSON.stringify(matches.filter(match => match !== null)));

    const deleteMatchesFromSessionStorage = () => sessionStorage.removeItem(sessionStorageKey);

    const handleUpdateStandings = (data: FormFields) => {
        let pointsHome = 0;
        let pointsAway = 0;
        let winner = '';
        let drawnHome = '';
        let drawnAway = '';
        let loser = '';
        let home = '';
        let goalsHome = 0;
        let goalsAway = 0;
        let away = '';

        const matchesNumbers = Object.keys(clausuraMatches);

        matchesNumbers.map(matchNumber => {
            let matchNum = parseInt(matchNumber);
            home = data[`match${matchNum}Home`];
            goalsHome = parseInt(data[`match${matchNum}HomeGoals`]);
            goalsAway = parseInt(data[`match${matchNum}AwayGoals`]);
            away = data[`match${matchNum}Away`];

            if (Number.isInteger(goalsHome) && Number.isInteger(goalsAway)) {

                matchResults = getMatchResults(home, away, goalsHome, goalsAway, pointsHome, pointsAway, drawnHome, drawnAway, winner, loser);

                clausuraMatches[matchNum].goalsHome = goalsHome;
                clausuraMatches[matchNum].goalsAway = goalsAway;
                clausuraMatches[matchNum].finished = true;
                clausuraMatches[matchNum].pointsHome = matchResults.pointsHome;
                clausuraMatches[matchNum].pointsAway = matchResults.pointsAway;
                clausuraMatches[matchNum].winner = matchResults.winner;
                clausuraMatches[matchNum].loser = matchResults.loser;
                clausuraMatches[matchNum].drawnHome = matchResults.drawnHome;
                clausuraMatches[matchNum].drawnAway = matchResults.drawnAway;
                clausuraMatches[matchNum].fromSessionStorage = true;

                winner = '';
                drawnHome = '';
                drawnAway = '';
                loser = '';
                matchResults = defaultMatchResults;
            }
        });

        setStandings(prevStandings => {
            const newStandings = [
                prevStandings[aperturaId],
                getStanding(clausuraMatches, teamsAC, clausuraId),
                getAccumulatedStandings()
            ]

            return newStandings;
        });

        UsePersistForm(clausuraMatches);
    }

    const resetMatches = () => {
        const matchesNumbers = Object.keys(clausuraMatches);

        matchesNumbers.map(matchNumb => {
            let matchNum = parseInt(matchNumb);

            if (clausuraMatches[matchNum].fromApi === false) {
                clausuraMatches[matchNum].goalsHome = defaultMatch.goalsHome;
                clausuraMatches[matchNum].goalsAway = defaultMatch.goalsAway;
                clausuraMatches[matchNum].finished = defaultMatch.finished;
                clausuraMatches[matchNum].pointsHome = defaultMatch.pointsHome;
                clausuraMatches[matchNum].pointsAway = defaultMatch.pointsAway;
                clausuraMatches[matchNum].winner = defaultMatch.winner;
                clausuraMatches[matchNum].loser = defaultMatch.loser;
                clausuraMatches[matchNum].drawnHome = defaultMatch.drawnHome;
                clausuraMatches[matchNum].drawnAway = defaultMatch.drawnAway;
                clausuraMatches[matchNum].fromSessionStorage = defaultMatch.fromSessionStorage;
            }
        });

        setStandings(prevStandings => {
            const newStandings = [
                prevStandings[aperturaId],
                getStanding(clausuraMatches, teamsAC, clausuraId),
                getAccumulatedStandings()
            ]

            return newStandings;
        });

        deleteMatchesFromSessionStorage();
    }

    const halfMatchDay = Math.ceil(maxActiveMatchDay / 2);

    const defaultActiveMatchDaysBlock = (state.activeMatchDay <= halfMatchDay) ? 0 : 1;
    const [activeMatchDaysBlock, setActiveMatchDaysBlock] = useState<number>(defaultActiveMatchDaysBlock);

    const handleActiveMatchDaysBlock = (selectedActiveMatchDaysBlock: number) => setActiveMatchDaysBlock(selectedActiveMatchDaysBlock);

    const handleShowAperturaStandings = (value: boolean) => setShowAperturaStandings(value);

    return (
        <section className="content-calculator">
            <MatchDays
                activeMatchDay={state.activeMatchDay}
                activeMatchDaysBlock={activeMatchDaysBlock}
                dispatch={dispatch}
                halfMatchDay={halfMatchDay}
                handleActiveMatchDaysBlock={handleActiveMatchDaysBlock}
                matchDays={matchDays}
            />
            <MatchDayForm
                activeMatchDay={state.activeMatchDay}
                disableButton={disableButton}
                dispatch={dispatch}
                halfMatchDay={halfMatchDay}
                handleActiveMatchDaysBlock={handleActiveMatchDaysBlock}
                minActiveMatchDay={minActiveMatchDay}
                maxActiveMatchDay={maxActiveMatchDay}
                matchesByMatchDay={Object.values(matchesByMatchDay)}
                handleUpdateStandings={handleUpdateStandings}
                teams={teamsAC}
                resetMatches={resetMatches}
            />
            {showStandings &&
                <>
                    <Standings
                        headingTable={`Así va el Torneo ${currentSeason}`}
                        standings={standings[clausuraId]}
                        seasonId={clausuraId}
                        teams={teamsAC}
                        type={1}
                    />
                    <Legend isAcumulado={false} isClausura={true} />
                    <Standings
                        headingTable="Así va la tabla acumulada"
                        standings={standings[accumulatedId]}
                        seasonId={accumulatedId}
                        teams={teamsAC}
                        type={2}
                    />
                    <Legend isAcumulado={true} isClausura={false} />
                    {!showAperturaStandings
                        ?
                        <Button
                            type="button"
                            bsPrefix={'-'}
                            className="d-block mx-auto py-2 py-md-3 px-3 px-md-4 shadow btn-show-apertura"
                            onClick={() => handleShowAperturaStandings(true)}
                        >
                            ASÍ QUEDÓ EL APERTURA
                        </Button>
                        :
                        <>
                            <Standings
                                headingTable="Torneo Apertura"
                                standings={standings[aperturaId]}
                                seasonId={aperturaId}
                                teams={teamsAC}
                                type={1}
                            />
                            <Legend isAcumulado={false} isClausura={false} />
                            <Button
                                type="button"
                                bsPrefix={'-'}
                                className="d-block mx-auto my-4 my-md-5 py-2 py-md-3 px-3 px-md-4 shadow btn-show-apertura"
                                onClick={() => handleShowAperturaStandings(false)}
                            >
                                OCULTAR
                            </Button>
                        </>
                    }
                </>
            }
        </section>
    )
}

export default CalculatorACA;