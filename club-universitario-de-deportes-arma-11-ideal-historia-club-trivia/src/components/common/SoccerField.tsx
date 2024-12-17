import React, { FC } from 'react'
import Button from "../common/Button";

const SoccerField: FC<{ data?: any }> = ({ data }) => {
    return (
        <>
            <div className="section-principal__players--arquero">
                <Button position="arquero" entry="1469072389" id={data?.arquero} />
            </div>
            <div className="section-principal__players--centrales">
                <Button position="central-derecho" entry="44380923" id={data?.centralDerecho} />
                <Button position="central-izquierdo" entry="1044544954" id={data?.centralIzquierdo} />
            </div>
            <div className="section-principal__players--laterales">
                <Button position="lateral-derecho" entry="713507181" id={data?.lateralDerecho} />
                <Button position="lateral-izquierdo" entry="614685073" id={data?.lateralIzquierdo} />
            </div>
            <div className="section-principal__players--contenciones">
                <Button position="contencion-derecho" entry="602000525" id={data?.contencionDerecho} />
                <Button position="contencion-izquierdo" entry="1337238517" id={data?.contencionIzquierdo} />
            </div>
            <div className="section-principal__players--volantes">
                <Button position="volante-derecho" entry="1762750381" id={data?.volanteDerecho} />
                <Button position="volante-izquierdo" entry="1641758152" id={data?.volanteIzquierdo} />
            </div>
            <div className="section-principal__players--delanteros">
                <Button position="delantero-derecho" entry="102149249" id={data?.delanteroDerecho} />
                <div style={{ position: 'relative', top: '50px' }}>
                    <Button position="delantero-izquierdo" entry="1362723749" id={data?.delanteroIzquierdo} />
                </div>
            </div>
        </>
    )
}

export default SoccerField