import { useEffect } from 'react';

//types
import { Ads } from '../types/types';

const UseDfpSlot = ({ path, size, id }: Ads) => {
    
    useEffect(() => {
        const googletag = window.googletag || {};
        googletag.cmd = googletag.cmd || [];
        googletag.cmd.push(function() {
            googletag.defineSlot(path, size, id).addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
        googletag.cmd.push(function() {
            googletag.display(id);
        });
    }, [path, size, id]);
};

export default UseDfpSlot;