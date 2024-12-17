import { ChangeMatchDayActionType } from './enums';

type Ads = {
    id: string,
    path: string,
    size: (number[] | string)[] | any
};

declare global {
    interface Window {
        googletag: any
    }
};

interface Cell {
    v: string,
    f?: string
}

interface Row {
    c: Cell[]
}

type DefaultMatchDay = {
    defaultMatchDay: string
}

/*interface Standing {
    points: number,
    playedMatches: number,
    wonMatches: number,
    drawnMatches: number,
    lostMatches: number, 
    goalsFor: number,
    goalsAgainst: number,
    goalsDifference: number
}

interface TeamData {
    id: string,
    name: string,
    apertura: Standing,
    clausura: Standing,
    accumulated: Standing
}

interface Team {
    [key: string]: TeamData,
}
*/

type CalculatorProps = {
    allScores: Row[],
    defaultMatchDay: string
}

interface Standing {
    name: string,
    points: number,
    playedMatches: number,
    wonMatches: number,
    drawnMatches: number,
    lostMatches: number, 
    goalsFor: number,
    goalsAgainst: number,
    goalsDifference: number,
    additionalPoints?: number
}

interface TeamData {
    id: string,
    name: string,
    seasons: Standing[]
}

interface Team {
    [key: string]: TeamData,
}

interface Match {
    matchNumber: number,
    matchDay: number,                
    home: string,
    goalsHome: number,
    goalsAway: number,
    away: string,
    finished: boolean,
    currentMatchDay: boolean,
    pointsHome: number,
    pointsAway: number,
    winner: string,
    loser: string,
    drawnHome: string,
    drawnAway: string,
    fromApi: boolean,
    fromSessionStorage: boolean,
    season: string,
    additionalPointsHome?: number,
    additionalPointsAway?: number
}

interface MatchResult {
    pointsHome: number,
    pointsAway: number,
    drawnHome: string,
    drawnAway: string, 
    winner: string, 
    loser: string
}

interface MatchByMatchDay {
    [key: number]: Match[]
}

type LegendItem = {
    id: number,
    description: string
}

type ChangeMatchDayAction = {
    type: ChangeMatchDayActionType,
    payload: number
}

type ChangeMatchDayState = {
    activeMatchDay: number
}

interface FormFields {
    [key: string]: string,
    [key: string]: number
}

export { Ads, Window, Cell, Row, DefaultMatchDay, CalculatorProps, LegendItem, Team, TeamData, Standing, Match, MatchResult, MatchByMatchDay, ChangeMatchDayAction, ChangeMatchDayState, FormFields };