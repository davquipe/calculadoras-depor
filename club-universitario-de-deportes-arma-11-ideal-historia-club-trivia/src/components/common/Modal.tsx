import React, { FC } from 'react'
import { Jugador, playersPosition } from '../../players'
import { urlAssets } from '../../Constants'

interface ModalProp {
    position: string
    setPlayer: React.Dispatch<React.SetStateAction<{ id: string; name: string, slug: string }>>
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<ModalProp> = ({ position, setPlayer, setDisplayModal }) => {
    const players = playersPosition(position)

    const handleModalClick = (player: Jugador) => {
        setPlayer(
            {
                id: player.slug.charAt(0) + player.slug.charAt(1),
                name: player.jugador,
                slug: player.slug
            })
        setDisplayModal(false)
    }

    return (
        <div className='modal'>
            <div className='modal__content'>
                {players.map((player) => (
                    <button className='modal__button' onClick={() => handleModalClick(player)} key={player.slug}>
                        <img
                            src={`${urlAssets}/img/position/${position}/${player.slug}.png`}
                            alt={`Jugador ${player.jugador}`}
                            width={70}
                            height={70}
                            className='icon-img'
                        />
                        <span>{player.jugador}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Modal
