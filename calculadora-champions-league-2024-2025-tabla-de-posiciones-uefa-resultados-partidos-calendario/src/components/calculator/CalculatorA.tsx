import { useState, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';

//constants
import { aperturaId, isCurrentMatchDay, isPlayed, sessionStorageKey } from '../../Constants';

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

type CalculatorAProps = CalculatorProps;

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
    matchDayDate: '',
    pointsHome: 0,
    pointsAway: 0,
    winner: '',
    loser: '',
    drawnHome: '',
    drawnAway: '',
    fromApi: false,
    fromSessionStorage: false,
    season: '',
    hour: '',
}

const CalculatorA = ({ allScores, defaultMatchDay }: CalculatorAProps) => {

    const middleIndex = Math.ceil(allScores.length);
    const aperturaScores: Row[] = allScores.slice().splice(0, middleIndex);

    const [showStandings, setShowStandings] = useState<boolean>(false);
    const [aperturaStandings, setAperturaStandings] = useState<TeamData[]>([]);

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
        let matchDayDate = ''
        let fromApi = false;
        let season = '';
        let pointsHome = 0;
        let pointsAway = 0;
        let winner = '';
        let drawnHome = '';
        let drawnAway = '';
        let loser = '';
        let fromSessionStorage = false;
        let hour = '';

        (Object.values(scores)).map(score => {

            matchDay = parseInt(score.c[0]['v']);
            matchNumber = parseInt(score.c[1]['v']);
            home = score.c[2]['v'];
            goalsHome = parseInt(score.c[3]['v']);
            goalsAway = parseInt(score.c[4]['v']);
            away = score.c[5]['v'];
            finished = (score.c[6]['v'] === isPlayed) && true;
            matchDayDate = score.c[7]['f'] || '';
            currentMatchDay = (score.c[9]['v'] === isCurrentMatchDay) && true;
            hour = score.c[8]['v']

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
                matchDayDate,
                pointsHome: matchResults.pointsHome,
                pointsAway: matchResults.pointsAway,
                winner: matchResults.winner,
                loser: matchResults.loser,
                drawnHome: matchResults.drawnHome,
                drawnAway: matchResults.drawnAway,
                fromApi,
                fromSessionStorage,
                season,
                hour
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

    const aperturaMatchesFromApi = getMatchesFromApi(aperturaScores);
    const aperturaMatchesFromSessionStorage = getMatchesFromSessionStorage();

    const restoreMatchesKeys = (matches: Match[]) => {
        const entries = Object.keys(matches).map(matchKey => {
            let nMatchkey = parseInt(matchKey);
            let match = matches[nMatchkey];
            let newKey = match.matchNumber;
            return { [newKey]: match };
        });

        return Object.assign([], ...entries);
    }

    const aperturaMatches = (aperturaMatchesFromSessionStorage.length > 0) ? restoreMatchesKeys(aperturaMatchesFromSessionStorage) : aperturaMatchesFromApi;

    const getMatchesByMatchDay = (matches: Match[]) => {
        const matchesByMatchDay = matches.reduce((group: MatchByMatchDay, match: Match) => ({
            ...group,
            [match.matchDay]: [...(group[match.matchDay] || []), match]
        }), {});

        return matchesByMatchDay;
    }

    const matchesByMatchDay = getMatchesByMatchDay(aperturaMatches);

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

        const arrayTeams = Object.values(teams);

        arrayTeams.map(team => {
            matches.map(match => {
                if (match.finished) {
                    if (team.id === match.home) {
                        pointsHome += match.pointsHome;
                        playedMatches++;
                        goalsFor += match.goalsHome;
                        goalsAgainst += match.goalsAway;
                    }
                    if (team.id === match.away) {
                        pointsAway += match.pointsAway;
                        playedMatches++;
                        goalsFor += match.goalsAway;
                        goalsAgainst += match.goalsHome;
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

            pointsHome = 0;
            pointsAway = 0;
            playedMatches = 0;
            goalsFor = 0;
            goalsAgainst = 0;

            wonMatches = 0;
            drawnMatches = 0;
            lostMatches = 0;
        });

        arrayTeams.sort((a, b) => (b.seasons[seasonId].points > a.seasons[seasonId].points ? 1 : -1));

        return breakTies(arrayTeams, seasonId);
    }

    useEffect(() => {
        setAperturaStandings(getStanding(aperturaMatches, teamsAC, aperturaId));
        setShowStandings(true);
    }, []);

    const matchDays = Object.keys(matchesByMatchDay);
    const maxActiveMatchDay = matchDays.length;

    const initialMatchDay: ChangeMatchDayState = {
        activeMatchDay: getCurrentMatchDay(aperturaMatches)
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
                return { activeMatchDay: getCurrentMatchDayFromApi(aperturaMatches) };
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

        const matchesNumbers = Object.keys(aperturaMatches);

        matchesNumbers.map(matchNumber => {
            let matchNum = parseInt(matchNumber);
            home = data[`match${matchNum}Home`];
            goalsHome = parseInt(data[`match${matchNum}HomeGoals`]);
            goalsAway = parseInt(data[`match${matchNum}AwayGoals`]);
            away = data[`match${matchNum}Away`];

            if (Number.isInteger(goalsHome) && Number.isInteger(goalsAway)) {

                matchResults = getMatchResults(home, away, goalsHome, goalsAway, pointsHome, pointsAway, drawnHome, drawnAway, winner, loser);

                aperturaMatches[matchNum].goalsHome = goalsHome;
                aperturaMatches[matchNum].goalsAway = goalsAway;
                aperturaMatches[matchNum].finished = true;
                aperturaMatches[matchNum].pointsHome = matchResults.pointsHome;
                aperturaMatches[matchNum].pointsAway = matchResults.pointsAway;
                aperturaMatches[matchNum].winner = matchResults.winner;
                aperturaMatches[matchNum].loser = matchResults.loser;
                aperturaMatches[matchNum].drawnHome = matchResults.drawnHome;
                aperturaMatches[matchNum].drawnAway = matchResults.drawnAway;
                aperturaMatches[matchNum].fromSessionStorage = true;

                winner = '';
                drawnHome = '';
                drawnAway = '';
                loser = '';
                matchResults = defaultMatchResults;
            }
        });

        setAperturaStandings(getStanding(aperturaMatches, teamsAC, aperturaId));
        UsePersistForm(aperturaMatches);
    }

    const resetMatches = () => {
        const matchesNumbers = Object.keys(aperturaMatches);

        matchesNumbers.map(matchNumb => {
            let matchNum = parseInt(matchNumb);

            if (aperturaMatches[matchNum].fromApi === false) {
                aperturaMatches[matchNum].goalsHome = defaultMatch.goalsHome;
                aperturaMatches[matchNum].goalsAway = defaultMatch.goalsAway;
                aperturaMatches[matchNum].finished = defaultMatch.finished;
                aperturaMatches[matchNum].pointsHome = defaultMatch.pointsHome;
                aperturaMatches[matchNum].pointsAway = defaultMatch.pointsAway;
                aperturaMatches[matchNum].winner = defaultMatch.winner;
                aperturaMatches[matchNum].loser = defaultMatch.loser;
                aperturaMatches[matchNum].drawnHome = defaultMatch.drawnHome;
                aperturaMatches[matchNum].drawnAway = defaultMatch.drawnAway;
                aperturaMatches[matchNum].fromSessionStorage = defaultMatch.fromSessionStorage;
            }
        });

        setAperturaStandings(getStanding(aperturaMatches, teamsAC, aperturaId));
        deleteMatchesFromSessionStorage();
    }

    const halfMatchDay = Math.ceil(maxActiveMatchDay);

    const defaultActiveMatchDaysBlock = (state.activeMatchDay <= halfMatchDay) ? 0 : 1;
    const [activeMatchDaysBlock, setActiveMatchDaysBlock] = useState<number>(defaultActiveMatchDaysBlock);

    const handleActiveMatchDaysBlock = (selectedActiveMatchDaysBlock: number) => setActiveMatchDaysBlock(selectedActiveMatchDaysBlock);

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
                        headingTable={`Así va la clasificación`}
                        standings={aperturaStandings}
                        seasonId={aperturaId}
                        teams={teamsAC}
                        type={1}
                    />
                    <Legend isAcumulado={false} isClausura={false} />
                </>
            }
        </section>
    )
}

export default CalculatorA;