import { urlAssets } from "../../Constants";
import { useRanking } from "../../hooks/useRanking";
import SoccerField from "../common/SoccerField";
import { formattedData } from "../../hooks/utilitie";
import { FC } from "react";
import Loading from "../common/Loading";

interface Props {
    modifier: React.Dispatch<React.SetStateAction<{
        siteName: string;
        id: string;
    }>>
}

const MasVotadas: FC<Props> = ({ modifier }) => {
    const { data, isLoading } = useRanking(true)
    const formatted = formattedData(data || [])

    return (
        <div className="section-principal">
            <img src={`${urlAssets}/img/logo-100-u.png`} className="logo-img" alt="" width={189} height={114} />
            <div className="section-principal__description--votes">
                <p className="section-principal__description__link" onClick={() => modifier({ siteName: 'position', id: '' })}>Por posición</p>
                <p onClick={() => modifier({ siteName: 'ranking', id: '' })} className="section-principal__description__no-link">Por votos</p>
            </div>
            <div className="section-principal__players">
                {isLoading && <Loading />}
                {!isLoading && <SoccerField data={formatted?.[0]} />}
            </div>
            <div className="buttons">
                <button className="custom-button" onClick={() => modifier({ siteName: 'home', id: '' })}>Inicio</button>
            </div>
        </div>
    )
}

export default MasVotadas;