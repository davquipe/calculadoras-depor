import React from 'react'
import { isDesktop, isTablet } from "react-device-detect";
import Image from 'react-bootstrap/Image';

//constants
import { titleEspecial, urlAssets } from '../../Constants';

const getImg = () => (isDesktop || isTablet) ? 'header-desktop' : 'header-mobile';

const Heading = () => {
    return (
        <section className="banner-heading">
            <Image
                fluid
                alt={titleEspecial}
                className="w-100"
                src={`${urlAssets}/img/${getImg()}.jpg`}
                loading="lazy"
            />
        </section>    
    )
}

export default Heading