import { useScores } from '../../hooks/useScores';

//components
import Error from '../common/Error';
import Table from '../table/Table';

type HomeProps = {
    defaultMatchDay: string
}

const Home = ({ defaultMatchDay }: HomeProps) => {

    const { data, error, isLoading, isSuccess } = useScores();
    return (
        <>
            {error && <Error />}
            {
                (!isLoading && isSuccess && (typeof data !== 'undefined')) &&
                <Table allScores={data} />
            }
        </>
    )
}

export default Home;