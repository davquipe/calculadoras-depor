import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//constants
import { googleSheetKey, keyData, query, staleTime } from '../Constants';
//types
import { Row } from '../types/types';


const getRanking = async (votes: boolean): Promise<Row[]> => {
    const newSheetKey = votes ? '1FztUbaUxPO5WWv87jdy7-X5ga1ZFV9QgaIxwpKOZ6Wc' : googleSheetKey
    const url = `https://docs.google.com/spreadsheets/d/${newSheetKey}/gviz/tq?tq=${encodeURIComponent(query)}`

    const { data } = await axios.get(url);
    const jsonContent = JSON.parse((data).substr(47).slice(0,-2));
    return jsonContent.table.rows;
};

const useRanking = (isVotes: boolean) => useQuery<Row[]>([keyData, query], () => getRanking(isVotes), { staleTime });

export { useRanking };