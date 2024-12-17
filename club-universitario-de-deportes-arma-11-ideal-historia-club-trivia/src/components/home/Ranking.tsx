import { urlAssets } from "../../Constants";
import { useNewData } from "../../hooks/useNewData";

import { Row } from "../../types/types";
import { playersNames } from "../../players";
import { FC } from "react";
import Loading from "../common/Loading";

interface Props {
    appId?: string
    modifier: React.Dispatch<React.SetStateAction<{
        siteName: string;
        id: string;
    }>>
}

const MasVotadas: FC<Props> = ({ modifier }) => {
    const { data, isLoading } = useNewData()

    const format = (newData: Row[]) => {
        let id = ''
        let cantidad = 0
        let name = ''
        let playerTeam = {}
        let players: any[] = []

        data?.forEach(player => {
            const getValue = (index: number) => player.c[index]?.v ?? '';
            id = getValue(0)
            cantidad = Number(getValue(1))
            name = playersNames[Number(id)]
            playerTeam = {
                id,
                cantidad,
                name
            }

            players.push(playerTeam)
        })

        players.sort((a, b) => b.cantidad - a.cantidad)

        return players
    }
    const formatted = format(data || [])

    return (
        <div className="section-principal">
            <img src={`${urlAssets}/img/logo-100-u.png`} className="logo-img" alt="" width={189} height={114} />
            <div className="section-principal__description--votes">
                <p className="section-principal__description__no-link" onClick={() => modifier({ siteName: 'position', id: '' })}>Por posición</p>
                <p onClick={() => modifier({ siteName: 'ranking', id: '' })} className="section-principal__description__link">Por votos</p>
            </div>
            <div className="section-principal__rankingg">
                {isLoading && <Loading />}
                {!isLoading && formatted && formatted.map((el, index) => (<p key={el.id} className="table-ranking">
                    <span>{index + 1}. {el.name}</span>
                    <span>{el.cantidad} votos</span>
                </p>))}
            </div>
            <div className="buttons buttons__variant" style={{ marginTop: '80px !important' }}>
                <button className="custom-button" onClick={() => modifier({ siteName: 'home', id: '' })}>Inicio</button>
            </div>
        </div>
    )
}

export default MasVotadas;