import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

//constants
import { urlShields } from '../../Constants';

type MatchTeamProps = {
    direction: string,
    team: string,
    teamId: string,
    teamName: string,
    matchNumber: number,
    goals: number,
    finished: boolean,
    fromApi: boolean,
    fromSessionStorage: boolean,
    errorAlign: string,
}

const MatchTeam = ({ direction, team, teamId, teamName, matchNumber, goals, finished, fromApi, fromSessionStorage, errorAlign }: MatchTeamProps) => {

    const { formState: { errors }, register } = useFormContext();

    const name = `match${matchNumber}${team}Goals`;

    const allowedKeys = ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown','Backspace','Delete','Tab', 'Ctrl', 'F5', 'F12', 'Home', 'End'];

    const minValueAllowed = 0;

    const maxValueAllowed = 99;

    return (
        <section className="content-team">
            <section className={`d-flex ${direction} align-items-center justify-content-end px-0 py-1 px-md-2 py-md-2 content-team`}>
                <article className="px-0 px-md-2">
                    <span className="match-form">{teamName}</span>
                </article>
                <article className="mx-1 mx-md-2 px-1 px-md-2 border-team">
                    <Image src={`${urlShields}/img/escudos/${teamId}.png`} alt={teamName} loading="lazy" />
                </article>
                <article className="mx-1">
                    <Form.Control type="hidden" {...register(`match${matchNumber}${team}`)} value={teamId} />
                    <Form.Control 
                        bsPrefix={'-'}
                        className="pt-1 border border-white align-bottom text-center input-score"                     
                        type="number" 
                        readOnly={fromApi} 
                        onKeyDown={e => {
                            if(allowedKeys.includes(e.key)){
                                return;
                            }

                            if ((!/^[0-9]*$/.test(e.key)) || ((e.currentTarget.value.length + 1) > 2)) {
                                e.preventDefault();
                            }
                        }}
                        min={minValueAllowed}
                        max={maxValueAllowed}
                        defaultValue={((fromApi && finished) || fromSessionStorage) ? goals : ''}                        
                        {...register(name, { 
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'El marcador debe ser numérico'
                            },
                            max: {
                                value: 99,
                                message: 'El marcador debe ser hasta de dos cifras'
                            },
                            min: {
                                value: 0,
                                message: 'El marcador debe ser mayor o igual a 0'
                            },
                            validate: val => (!val.toString().includes('.')) || 'El marcador debe ser un entero'
                        })}
                    />
                </article>
            </section>
            {<ErrorMessage
                errors={errors} 
                name={name}
                render={({ message }) => 
                    <article className={`text-${errorAlign}`}>
                        <span className="px-3 text-danger error">{message}</span>
                    </article>                        
                } 
            />}
        </section>
    )
}

export default MatchTeam