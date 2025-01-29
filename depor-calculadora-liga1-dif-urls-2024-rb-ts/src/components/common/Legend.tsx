import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//constants
import { legend, legendApertura, legendClausura } from '../../Constants';

//types
import { LegendItem } from '../../types/types';
import { FC } from 'react';

const Legend: FC<{ isAcumulado: boolean, isClausura: boolean }> = ({ isAcumulado, isClausura }) => {

    const arrayLegend = isAcumulado ? legend : isClausura ? legendClausura : legendApertura

    const chunkArray = (arr: LegendItem[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (_: LegendItem, i: number) =>
            arr.slice(i * size, i * size + size)
        );

    const dividedLegend = chunkArray(arrayLegend, Math.ceil(arrayLegend.length / 2));

    return (
        <Row as="section" className="mx-0 px-1 py-3 py-md-5">
            {dividedLegend.map((divLegend, i) =>
                <Col key={i + 1} as="section" xs="12" md="6" style={{ width: '100%' }}>
                    {divLegend.map(legend =>
                        <Row key={legend.id} as="section">
                            <Col as="article" xs="1" className={`pb-1 legend-${legend.id}`}>
                            </Col>
                            <Col as="article" xs="11" className="pb-1 px-1 px-md-2">
                                <span className="legend">{legend.description}</span>
                            </Col>
                        </Row>
                    )}
                </Col>
            )}
            {isAcumulado && <p className='legend'>* Si un equipo gana Apertura y Clausura será Campeón Nacional directamente</p>}
        </Row>
    )
}

export default Legend