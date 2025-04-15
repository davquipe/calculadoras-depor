import React, { memo } from 'react';
import UseDfpSlot from './UseDfpSlot';

//types
import { Ads } from '../types/types';

//constants
import { zocalo } from '../Constants';

type Props = {
    isDesktop: boolean
}

const Zocalo = ({ isDesktop }: Props) => {

    const { id, path, size }: Ads = zocalo;

    var finalSize = isDesktop ? size[0] : size[1];

    UseDfpSlot({ id, path, size: finalSize });

    return (
        <section className="position-fixed bottom-0 start-0 end-0 mx-auto text-center container-zocalo">
            <div id={id}></div> 
        </section>
    )
}

export default memo(Zocalo);
