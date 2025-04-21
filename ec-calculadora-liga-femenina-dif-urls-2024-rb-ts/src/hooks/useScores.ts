import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//constants
import { googleSheetKey, keyData, query, staleTime } from '../Constants';

//types
import { Row } from '../types/types';

const getScores = async (): Promise<Row[]> => {
    const { data } = await axios.get(`https://docs.google.com/spreadsheets/d/${googleSheetKey}/gviz/tq?tq=${encodeURIComponent(query)}`);
    const jsonContent = JSON.parse((data).substr(47).slice(0,-2));
    return jsonContent.table.rows;
};

const useScores = () => useQuery<Row[]>([keyData, query], () => getScores(), { staleTime });

export { useScores };