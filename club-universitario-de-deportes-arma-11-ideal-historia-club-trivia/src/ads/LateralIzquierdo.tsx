import React, { memo } from 'react';
import UseDfpSlot from './UseDfpSlot';

//types
import { Ads } from '../types/types';

//constants
import { lateralIzquierdo } from '../Constants';

const LateralIzquierdo = () => {
    
    const { id, path, size }: Ads = lateralIzquierdo;

    UseDfpSlot({ id, path, size });

    return (
        <aside className="d-none d-xl-block position-fixed start-0 ms-4 text-end lateral-izq">
            <div id={id}></div> 
        </aside>
    )
}

export default memo(LateralIzquierdo);
