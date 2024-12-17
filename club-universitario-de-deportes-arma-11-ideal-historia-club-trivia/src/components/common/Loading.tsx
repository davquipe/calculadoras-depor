import React, { memo } from 'react';
import Image from 'react-bootstrap/Image';
import { urlCommonAssets } from '../../Constants';

const Loading = () => {
    return (
        <article className="d-flex align-items-center justify-content-center" style={{ marginTop: '100px' }}>
            <Image fluid src={`${urlCommonAssets}img/loading-brand.gif`} alt="Cargando" />
        </article>
    )
}

export default memo(Loading);