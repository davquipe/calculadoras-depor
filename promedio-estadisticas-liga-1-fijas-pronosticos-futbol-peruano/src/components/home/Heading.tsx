import React from 'react'
import Image from 'react-bootstrap/Image';

//constants
import { titleEspecial, urlAssets, epigraph } from '../../Constants';

const Heading = () => {
    return (
        <section className="banner-heading">
            <Image
                fluid
                alt={titleEspecial}
                src={`${urlAssets}/img/logo.png`}
                loading="lazy"
                style={{ margin: '45px auto auto', position: 'relative', width: '209px', height: '143px', top: '72px' }}
            />
            <p className="mb-0 px-2 text-center epigraph">{epigraph}</p>
        </section>
    )
}

export default Heading