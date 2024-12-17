import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//constants
import { keyData, query2, staleTime } from '../Constants';
//types
import { Row } from '../types/types';


const getData = async (): Promise<Row[]> => {
    const newSheetKey = '1ToOLn2MGGv7td8cMKv0Iv-U5MZIOXgsiRp6y1FdHZGU'
    const url = `https://docs.google.com/spreadsheets/d/${newSheetKey}/gviz/tq?tq=${encodeURIComponent(query2)}`

    const { data } = await axios.get(url);
    const jsonContent = JSON.parse((data).substr(47).slice(0,-2));
    return jsonContent.table.rows;
};

const useNewData = () => useQuery<Row[]>([keyData, query2], () => getData(), { staleTime });

export { useNewData };