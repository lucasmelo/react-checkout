import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../global.css';
import creditCard from '../../assets/credit-card.svg'
import templateCreditCard from '../../assets/template-credit-card.svg';
import Form from '../Form'
import { FiChevronLeft } from 'react-icons/fi'


const Checkout = () => {
    const steps = { cart: 1, checkout: 2, done: 3 }

    return (
        <div className="checkout-container">
            <section>
                <div>
                    <Link to="/register">
                        <FiChevronLeft size={32} color="#fff" />
                        Alterar forma de pagamento
                    </Link>

                    <div className="steps">
                        <strong>Etapa {steps.checkout}</strong> de <strong>{steps.done}</strong>
                    </div>
                </div>

                <div className="group">
                    <img src={creditCard} alt="Icone cartão" />
                    <h1> Adicione um novo cartão de credito</h1>
                </div>

                <div className="img-credit-card">
                    <img src={templateCreditCard} alt="Cartão de Crédito" className="credit-card" />
                </div>
            </section>

            <Form />

        </div>
    );
}

export default Checkout;