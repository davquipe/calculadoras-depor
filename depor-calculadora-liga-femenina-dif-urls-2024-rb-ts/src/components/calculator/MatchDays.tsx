import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

//types
import { ChangeMatchDayAction } from '../../types/types';
import { ChangeMatchDayActionType } from '../../types/enums';

type MatchDaysProps = {
    activeMatchDay: number,
    dispatch: React.Dispatch<ChangeMatchDayAction>,
    halfMatchDay: number,
    handleActiveMatchDaysBlock: (selectedActiveMatchDaysBlock: number) => void,
    activeMatchDaysBlock: number,
    matchDays: string[]
}

const MatchDays = ({ activeMatchDay, dispatch, halfMatchDay, handleActiveMatchDaysBlock, activeMatchDaysBlock, matchDays }: MatchDaysProps) => {

    const chunkArray = (arr: string[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (_: string, i: number) =>
            arr.slice(i * size, i * size + size)
        );

    const separatedMatchDays = chunkArray(matchDays, halfMatchDay);

    const handleChangeActiveMatchDay = (sMatchDay: number) => {
        dispatch({ type: ChangeMatchDayActionType.UPDATE, payload: sMatchDay })
    }

    return (
        <section className="py-2 match-days">
            <section className="carousel-container mx-auto">
                <Carousel
                    as="section"
                    activeIndex={activeMatchDaysBlock}
                    indicators={false}
                    interval={null}
                    nextLabel={null}
                    onSelect={handleActiveMatchDaysBlock}
                    prevLabel={null}
                >
                    {separatedMatchDays.map((sepMatchDays, i) =>
                        <Carousel.Item as="section" key={i + 1}>
                            <section className="d-flex justify-content-start mx-auto px-4">
                                {sepMatchDays.map(sMatchDay =>
                                    <Button
                                        key={sMatchDay}
                                        bsPrefix={'-'}
                                        className={`me-1 btn-matchday ${parseInt(sMatchDay) === activeMatchDay ? 'active-match-day' : ''}`}
                                        type="button"
                                        onClick={() => handleChangeActiveMatchDay(parseInt(sMatchDay))}
                                    >
                                        {sMatchDay}
                                    </Button>
                                )}
                            </section>
                        </Carousel.Item>
                    )}
                </Carousel>
            </section>
        </section>
    )
}

export default MatchDays;