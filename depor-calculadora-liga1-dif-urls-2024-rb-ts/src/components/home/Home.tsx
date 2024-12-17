import { useScores } from '../../hooks/useScores';

//components
import Error from '../common/Error';
// import CalculatorA from '../calculator/CalculatorA';
import CalculatorACA from '../calculator/CalculatorACA';

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
                <CalculatorACA allScores={data} defaultMatchDay={defaultMatchDay} />
            }
        </>
    )
}

export default Home;