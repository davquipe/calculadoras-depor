import React, { FC } from "react";

import { urlAssets } from "../../Constants";
import SoccerField from "../common/SoccerField";
import useStore, { FormValues } from "../../store/useStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    modifier: React.Dispatch<React.SetStateAction<{
        siteName: string;
        id: string;
    }>>
}

const Home: FC<Props> = ({ modifier }) => {
    const { formValues } = useStore()

    async function submitToGoogleForm(formData: FormValues) {
        console.log('OK!')
        const googleFormURL = 'https://docs.google.com/forms/d/1_a4JhrwiRUyo4fQixdqYSYhHm8cQhyZNaVTrCEurtyU/formResponse';
        const id = (Date.now()).toString();
        const formBody = new FormData();
        formBody.append("entry.674249644", id.toString());
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formBody.append(key, formData[key as keyof FormValues]);
            }
        }
        try {
            await axios.post(googleFormURL, formBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.response?.status, error.response?.data);
            } else {
                console.error('General Error:', error);
            }
        } finally {
            alert("¡Tu respuesta fue enviada!")
            setTimeout(() => { }, 2000)
            modifier({ siteName: 'my-team', id });
        }
    }


    return (
        <div className="section-principal">
            <img src={`${urlAssets}/img/logo-100-u.png`} alt="" width={189} height={114} className="logo-img" />
            <p className="section-principal__description">Arma tu once histórico crema <span>por su centenario. ¡Participa y comparte!</span></p>
            <p className="section-principal__instruction">Dale click y elige al jugador</p>
            <div className="section-principal__players">
                <SoccerField />
            </div>
            <div className="buttons">
                <button className="custom-button" onClick={() => submitToGoogleForm(formValues)}>Compartir</button>
                <button className="custom-button" onClick={() => modifier({ siteName: 'position', id: '' })}>Los más elegidos</button>
            </div>
        </div >
    )
}

export default Home;