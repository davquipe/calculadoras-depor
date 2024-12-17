import React, { FC, useEffect } from 'react'
import { urlAssets } from '../../Constants'
import Modal from './Modal'
import useStore, { FormValues } from '../../store/useStore'
import { jugadoresPorPosicion } from '../../players'

interface ButtonProps {
    position: string
    entry: string
    id?: string
}

const Button: FC<ButtonProps> = ({ position, entry, id }) => {
    const [player, setPlayer] = React.useState<{ id: string; name: string; slug: string }>({
        id: '',
        name: '',
        slug: ''
    })

    useEffect(() => {
        if (id && position) {
            const slug = jugadoresPorPosicion?.[position]?.find(el => el.includes(id)) || ''
            setPlayer({
                id,
                name: formatName(slug),
                slug,
            })
        }
    }, [id, position])

    const [displayModal, setDisplayModal] = React.useState<boolean>(false)

    const formatNumber = (num: string | number) => {
        const newNum = num.toString()
        if (newNum.length === 2) {
            if (newNum.charAt(0) === "0") return newNum.charAt(1)
            return newNum
        }
        return newNum
    }

    const { setFormValue } = useStore()
    useEffect(() => {
        setFormValue(`entry.${entry}` as keyof FormValues, formatNumber(player.id))
    }, [player])

    const defaultImage = player.slug ? `${urlAssets}/img/position/${position}/${player.slug}.png` : `${urlAssets}/img/rostro-boton.png`

    const handleClick = () => setDisplayModal(true)


    function formatName(input: string): string {
        const parts = input.split('-');
        const nameParts = parts.slice(1).map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        );

        return nameParts.join(' ');
    }

    const formattedName = player.slug && formatName(player.slug);
    return (
        <>
            <button onClick={handleClick} className='button-player' disabled={!!id}>
                <img src={defaultImage} alt="" width={66} height={66} className='icon-img' />
                {player.slug && <span className='button-player__text'>{formattedName}</span>}
            </button>
            {displayModal &&
                <Modal position={position} setPlayer={setPlayer} setDisplayModal={setDisplayModal} />
            }
        </>
    )
}

export default Button
