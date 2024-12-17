import React from 'react';

//constants
import { urlEspecial } from '../../Constants';

const Error = () => {
    return (
        <section className="vh-100 d-flex flex-column justify-content-center align-items-center">            
            <article className="my-3">
                <p className="mb-0 option">Error al cargar los datos</p>
            </article>
            <article className="my-3">
                <a
                    className="border-0 py-2 px-4 btn btn-trivia"
                    href={urlEspecial}
                >
                    Inicio
                </a>
            </article>            
        </section>
    )
}

export default Error;