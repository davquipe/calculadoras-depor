import React, { FC } from 'react'
import { TeamStats } from './Table';

interface Props {
    button: { description: string; criterion: keyof TeamStats },
    orderFunction: (criterion: keyof TeamStats, order: "max" | "min") => void
    isActive: boolean;
    onClick: () => void;
    setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>
}

const ButtonCall: FC<Props> = (props) => {
    const { button, orderFunction, isActive, onClick, setActiveButtonIndex } = props
    return (
        <div className='button-container'>
            <button className='buttons-order' key={`${button.description}-i`} onClick={onClick}>
                <p>{button.description}</p>
                <div className='buttons-order__icons'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6">
                        <path id="Polígono_1" data-name="Polígono 1" d="M3.5,0,7,6H0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6">
                        <path id="Polígono_2" data-name="Polígono 2" d="M3.5,0,7,6H0Z" transform="translate(7 6) rotate(180)" />
                    </svg>

                </div>
            </button>
            {isActive && <div key={`${button.description}-i-btn-active`} className='buttons-dispatch'>
                <span onClick={() => {
                    orderFunction(button.criterion, 'max');
                    setActiveButtonIndex(null)
                }}>Mayor a menor</span>
                <span onClick={() => {
                    orderFunction(button.criterion, 'min');
                    setActiveButtonIndex(null)
                }}>Menor a mayor</span>
            </div>}
        </div>
    )
}

export default ButtonCall