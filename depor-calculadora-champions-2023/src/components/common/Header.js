import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { brand, socialShareText, twitterAccount, urlEspecial, urlBrand, urlPortadaMarca } from '../../Constants';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'; 

const Header = () => {

    return (
        <header className="container-fluid position-fixed top-0">
            <section className="d-flex justify-content-between align-items-center h-100 mx-auto ctn-header">
                <section className="ctn-logo">
                    <a className="d-inline-block align-middle mx-1 logo" href={urlBrand} target="blank"><span className="d-none">{brand}</span></a>
                    <i className="d-inline-block align-middle bg-white header-barra-2"></i>
                    <a className="d-inline-block fw-bold text-white boton-especiales" href={urlPortadaMarca} target="blank">
                        <span className="h5 fw-bold mx-1 align-middle cruz">+</span>ESPECIALES
                    </a>
                </section>
                <section className="social">
                    <ul className="list-group list-group-horizontal align-items-center">
                        <li className="d-block mx-2">
                            <FacebookShareButton
                                url={urlEspecial}
                            >
                                <ASocialShare aClass="facebook" icon="facebook" />
                            </FacebookShareButton>
                        </li>                  
                        <li className="d-block mx-2">
                            <WhatsappShareButton
                                url={urlEspecial}
                                title={socialShareText}
                            >
                                <ASocialShare aClass="wst" icon="whatsapp" />
                            </WhatsappShareButton>  
                        </li>          
                        <li className="d-block" >
                            <TwitterShareButton
                                url={urlEspecial}
                                title={socialShareText}
                                via={twitterAccount}
                            >
                                <img alt='' style={{marginBottom: '2px'}} width={30} src='https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/elementos-comunes/img/tw-icon.png'/>                                
                            </TwitterShareButton>                            
                        </li>                        
                    </ul>
                </section>
            </section>
        </header>
    )
}

export default memo(Header);

const ASocialShare = props => {

    const { aClass, icon } = props;

    return (
        <a className={`text-white ${aClass}`} href="/#"><i className={`icon-${icon}`}></i></a>   
    )
}

ASocialShare.propTypes = {
    aClass: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}


