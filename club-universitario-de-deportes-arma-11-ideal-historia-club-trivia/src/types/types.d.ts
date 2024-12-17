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

export interface Ranking {
    countryIndex: string
    countryName: string
    slug: string
    gold: number
    silver: number
    bronze: number
    total: number
}

export interface TableProps {
    data: Row[]
}

export { Ads, Window, Cell, Row, Ranking, TableProps };