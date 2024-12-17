import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import Container from "react-bootstrap/Container";

//constants
import { qryMatchDay } from './Constants';

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
import Home from "./components/home/Home";
import Heading from "./components/home/Heading";

const App = () => {

    return (
        <>
            <Header />
            <Container as="main" fluid className="d-flex justify-content-around cont-principal px-0">
                {isDesktop && <LateralIzquierdo />}
                <Container as="section" className="cont-layout px-0">
                    <Router>
                        <Heading />
                        <HandleMatchDay />
                        <section className="content-msgs">
                            {!isDesktop && <Caja3 />}
                            <EmptySpace />
                            <Zocalo isDesktop={isDesktop} />
                        </section>
                    </Router>
                </Container>
                {isDesktop && <LateralDerecho />}
            </Container>
        </>
    );
}

export default App;

const GetQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const HandleMatchDay = () => {
    const query: URLSearchParams = GetQuery();
    const defaultMatchDay = query.get(qryMatchDay) as string;

    return <Home defaultMatchDay={defaultMatchDay} />
}