import React, { memo } from 'react';
import UseDfpSlot from './UseDfpSlot';

//types
import { Ads } from '../types/types';

//constants
import { caja3 } from '../Constants';

const Caja3 = () => {

    const { id, path, size }: Ads = caja3;

    UseDfpSlot({ id, path, size });

    return (
        <section className="d-xl-none my-3 mx-auto text-center container-caja3">
            <div id={id}></div> 
        </section>
    )
}

export default memo(Caja3);
