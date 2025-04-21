import React, { memo } from 'react';
import UseDfpSlot from './UseDfpSlot';

//types
import { Ads } from '../types/types';

//constants
import { lateralDerecho } from '../Constants';

const LateralDerecho = () => {
    
    const { id, path, size }: Ads = lateralDerecho;

    UseDfpSlot({ id, path, size });

    return (
        <aside className="d-none d-xl-block position-fixed end-0 me-4 text-start lateral-der">
            <div id={id}></div> 
        </aside>
    )
}

export default memo(LateralDerecho);
