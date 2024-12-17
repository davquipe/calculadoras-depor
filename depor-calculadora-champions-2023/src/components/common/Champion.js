import { memo } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {urlAssetsChampion} from '../../Constants'

const Champion = props => {

    const { name, slugFlag} = props;

    return (
        <section className="mb-3 text-center">
            <LazyLoadImage
                alt={name}
                className="mt-3 img-fluid"
                effect="blur"
                src={`${urlAssetsChampion}/${slugFlag}.png`}
            />            
        </section>
    )
}

export default memo(Champion);

Champion.propTypes = {
    name: PropTypes.string.isRequired,
    slugFlag: PropTypes.string.isRequired,
}