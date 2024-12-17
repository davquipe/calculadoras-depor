import React, { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import Container from "react-bootstrap/Container";

//styles
import './scss/Custom.scss';

//ads
import LateralIzquierdo from './ads/LateralIzquierdo';
import LateralDerecho from './ads/LateralDerecho';
import Caja3 from './ads/Caja3';
import Zocalo from './ads/Zocalo';

//components
import Header from './components/common/Header';
import EmptySpace from "./components/common/EmptySpace";
import Principal from "./components/Principal";

const App = () => {
    const [site, setSite] = useState({
        siteName: 'home',
        id: ''
    })

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const myTeamParam = queryParams.get('my-team');

        if (myTeamParam) {
            setSite({
                siteName: 'my-team',
                id: myTeamParam
            });
        } else if (site.id && site.siteName !== 'home') {
            const url = new URL(window.location.href);
            url.searchParams.set('my-team', site.id);
            window.history.pushState({}, '', url.toString());
        } else if (site.siteName === 'home') {
            const url = new URL(window.location.href);
            url.searchParams.delete('my-team');
            window.history.pushState({}, '', url.toString());
        }
    }, [site.id, site.siteName]);

    const isPath = site.siteName === 'home' || site.siteName === 'my-team' || site.siteName === 'position'

    return (
        <>
            <Header />
            <Container as="main" fluid className={`d-flex justify-content-around cont-principal px-0 ${isPath ? 'back-con-cancha' : 'back-sin-cancha'}`}>
                {isDesktop && <LateralIzquierdo />}
                <Container as="section" className="cont-layout px-0">
                    <Principal site={site} setSite={setSite} />
                    <section className="content-msgs">
                        {!isDesktop && <Caja3 />}
                        <EmptySpace />
                        <Zocalo isDesktop={isDesktop} />
                    </section>
                </Container>
                {isDesktop && <LateralDerecho />}
            </Container>
        </>
    );
}

export default App;