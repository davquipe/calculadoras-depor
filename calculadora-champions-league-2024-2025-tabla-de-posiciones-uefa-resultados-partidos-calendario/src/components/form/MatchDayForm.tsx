import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm, FormProvider } from "react-hook-form";

//constants
import { epigraph, titleEspecial } from '../../Constants';

//types
import { ChangeMatchDayAction, Match, Team, FormFields } from '../../types/types';
import { ChangeMatchDayActionType } from '../../types/enums';

//components
import MatchTeam from './MatchTeam';

type MatchDayFormProps = {
    activeMatchDay: number,
    disableButton: (matchDay: number, value: number) => boolean,
    dispatch: React.Dispatch<ChangeMatchDayAction>,
    halfMatchDay: number,
    handleActiveMatchDaysBlock: (selectedActiveMatchDaysBlock: number) => void,
    minActiveMatchDay: number,
    maxActiveMatchDay: number,
    matchesByMatchDay: Match[][],
    handleUpdateStandings: (data: FormFields) => void,
    resetMatches: () => void,
    teams: Team
}

const MatchDayForm = ({ activeMatchDay, disableButton, dispatch, halfMatchDay, handleActiveMatchDaysBlock, handleUpdateStandings, resetMatches, minActiveMatchDay, maxActiveMatchDay, matchesByMatchDay, teams }: MatchDayFormProps) => {

    const methods = useForm<any>();
    const { reset, handleSubmit, formState: { errors } } = methods;

    const handleMatchDayVariation = (actionType: ChangeMatchDayActionType, value: number) => {
        dispatch({ type: actionType, payload: 0 });
        let activeBlock = (value <= halfMatchDay) ? 0 : 1;
        handleActiveMatchDaysBlock(activeBlock);
    }

    const onSubmit = (data: FormFields) => {
        if (errors) {
            handleUpdateStandings(data)
        }
    }

    const handleReset = () => {
        reset();
        resetMatches();
        dispatch({ type: ChangeMatchDayActionType.RESET, payload: 0 })
    }

    return (
        <>
            <section className="my-0 py-3">
                <h1 className="d-none">{titleEspecial}</h1>
                <p className="mb-0 px-2 text-center epigraph">{epigraph}</p>
            </section>
            <FormProvider {...methods} >
                <Form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <section className="my-1 my-md-2 content-scores">
                        {matchesByMatchDay.map((matchDayMatches, i) => {
                            const orderArray = (array: any) => {
                                const order = array.reduce((acc: any, obj: any) => {
                                    const clave = obj['matchDayDate'];
                                    if (!acc[clave]) {
                                        acc[clave] = [];
                                    }
                                    acc[clave].push(obj);
                                    return acc;
                                }, {})

                                return Object.values(order)
                            }

                            const newOrder = orderArray(matchDayMatches)
                            return <section key={i + 1} className={`${(activeMatchDay === (i + 1)) ? 'd-block' : 'd-none'}`}>
                                {newOrder.map((matches: any, k) => (
                                    <div key={`un-${k}`}>
                                        <div className='match-day-form'>{matches[0]?.matchDayDate}</div>
                                        {matches.map((match: any, j: number) =>
                                            <section key={match.matchNumber} className={``} style={{ marginBottom: '17px' }}>
                                                <div className='match-hour'>
                                                    <p>{match.hour}</p>
                                                </div>
                                                <div className='d-flex justify-content-center bg-odd-match'>
                                                    <MatchTeam
                                                        direction="flex-row"
                                                        team="Home"
                                                        teamId={match.home}
                                                        teamName={teams[match.home].name}
                                                        matchNumber={match.matchNumber}
                                                        goals={match.goalsHome}
                                                        finished={match.finished}
                                                        fromApi={match.fromApi}
                                                        fromSessionStorage={match.fromSessionStorage}
                                                        errorAlign="end"
                                                    />
                                                    <article className="d-flex align-items-center justify-content-center px-0 score-separator">
                                                        <span className="match-form">:</span>
                                                    </article>
                                                    <MatchTeam
                                                        direction="flex-row-reverse"
                                                        team="Away"
                                                        teamId={match.away}
                                                        teamName={teams[match.away].name}
                                                        matchNumber={match.matchNumber}
                                                        goals={match.goalsAway}
                                                        finished={match.finished}
                                                        fromApi={match.fromApi}
                                                        fromSessionStorage={match.fromSessionStorage}
                                                        errorAlign="start"
                                                    />
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                ))}
                                {/* {matchDayMatches.map((match, j) =>
                                    <section key={match.matchNumber} className={``} style={{ marginBottom: '17px' }}>
                                        <div style={{ width: '157px', height: '31px', background: '#283539', margin: 'auto', textAlign: 'center', color: '#fff' }}>
                                            <p>11:45 am</p>
                                        </div>
                                        <div className='d-flex justify-content-center bg-odd-match'>
                                            <MatchTeam
                                                direction="flex-row"
                                                team="Home"
                                                teamId={match.home}
                                                teamName={teams[match.home].name}
                                                matchNumber={match.matchNumber}
                                                goals={match.goalsHome}
                                                finished={match.finished}
                                                fromApi={match.fromApi}
                                                fromSessionStorage={match.fromSessionStorage}
                                                errorAlign="end"
                                            />
                                            <article className="d-flex align-items-center justify-content-center px-0 score-separator">
                                                <span className="match-form">:</span>
                                            </article>
                                            <MatchTeam
                                                direction="flex-row-reverse"
                                                team="Away"
                                                teamId={match.away}
                                                teamName={teams[match.away].name}
                                                matchNumber={match.matchNumber}
                                                goals={match.goalsAway}
                                                finished={match.finished}
                                                fromApi={match.fromApi}
                                                fromSessionStorage={match.fromSessionStorage}
                                                errorAlign="start"
                                            />
                                        </div>
                                    </section>
                                )} */}
                            </section>
                        }
                        )}
                    </section>
                    <section className="d-flex justify-content-center py-2 match-days">
                        <Button
                            type="button"
                            bsPrefix={'-'}
                            className="mx-1 px-3 px-md-4 border border-white  btn-form"
                            onClick={() => handleMatchDayVariation(ChangeMatchDayActionType.DECREMENT, (activeMatchDay - 1))}
                            disabled={disableButton(activeMatchDay, minActiveMatchDay)}
                        >
                            «
                        </Button>
                        <Button
                            type="button"
                            bsPrefix={'-'}
                            className="bg-white mx-1 px-2 px-md-4 btn-reset"
                            onClick={() => handleReset()}
                        >
                            Limpiar
                        </Button>
                        <Button
                            type="submit"
                            bsPrefix={'-'}
                            className="mx-1 px-2 px-md-4 border border-white  btn-form"
                        >
                            Calcular
                        </Button>
                        <Button
                            type="button"
                            bsPrefix={'-'}
                            className="mx-1 px-2 px-md-4 border border-white  btn-form"
                            onClick={() => handleMatchDayVariation(ChangeMatchDayActionType.INCREMENT, (activeMatchDay + 1))}
                            disabled={disableButton(activeMatchDay, maxActiveMatchDay)}
                        >
                            »
                        </Button>
                    </section>
                </Form>
            </FormProvider>
        </>
    )
}

export default MatchDayForm