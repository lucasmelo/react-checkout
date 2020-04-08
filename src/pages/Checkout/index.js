import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../global.css';
import creditCard from '../../assets/credit-card.svg'
import templateCreditCard from '../../assets/template-credit-card.svg';
import checked from '../../assets/checked.svg';
import { TextField } from '@material-ui/core';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Checkout() {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');

    const steps = { cart: 1, checkout: 2, done: 3 }

    function teste(e) {
        e.preventDefault();
    };

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

            <form onSubmit={teste}>
                <div className="stepper">
                    <img src={checked} alt="Check" className="checked" />
                    <span>Carrinho</span>

                    <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                    <img src={checked} alt="Check" className="checked" />
                    <span> Pagamento </span>

                    <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                    <img src={checked} alt="Check" className="checked" />
                    <span> Confirmação </span>
                </div>

                <TextField
                    label="Número do cartão"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    className="input"
                />
                <TextField
                    label="Nome (igual  ao cartão)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input"
                />
                
                <div className="input-group">
                    <TextField
                        label="Validade"
                        value={expiration}
                        onChange={e => setExpiration(e.target.value)}
                        className="input"
                    />
                    <TextField
                        label="CVV"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        className="input"
                    />

                </div>

                <button type="submit" className="button">CONTINUAR</button>
            </form>
        </div>
    );
}