import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../global.css';
import creditCard from '../../assets/credit-card.svg'
import templateCreditCard from '../../assets/template-credit-card.svg';
// import Form from '../Form'
import { FiChevronLeft } from 'react-icons/fi'
import visaImg from '../../assets/visa.png';
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import checked from '../../assets/checked.svg';
import { FiChevronRight } from 'react-icons/fi';
import * as yup from 'yup'
import Validate from 'card-validator';

const name = '';

const validations = yup.object().shape({
    number: yup
        .string()
        .test('test-number', 'Número de cartão inválido', value => Validate.number(value).isValid) // return true false based on validation
        .min(10, 'Seu cartão possui mais numeros')
        .required(),

    name: yup
        .string()
        .min(3, '* Insira o nome completo')
        .matches(' ', '* Insira o nome completo')
        .required('* Campo nome é obrigatório'),

    expiration: yup
        .string()
        .matches(
            /([0-9]{2})\/([0-9]{2})/,
            'Not a valid expiration date. Example: MM/YY'
        )
        .test('test-number', 'Data inválida', value => {name = value; Validate.expirationDate(value).isValid}) // return true false based on validation
        .required('* Campo validade é obrigatório'),

    cvv: yup
        .string()
        .min(3, 'Código inválido')
        .test('test-number', 'Código inválido', value => Validate.cvv(value).isValid) // return true false based on validation
        .required('* Campo CVV é obrigatório')
});


const Checkout = () => {
    const steps = { cart: 1, checkout: 2, done: 3 };

    function writeName (e) {
        this.name = e.target.value;
    }

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
                    <div className="top-left">
                        <img src={visaImg} alt="Visa" />
                    </div>
                    <div className="centered">Card Number</div>
                    <div className="bottom-left">Nome</div>
                    <div className="bottom-right">Expiration</div>
                </div>
            </section>

            <div className="form-container">
                <Formik
                    initialValues={{ name: '', number: '', expiration: '', cvv: '' }}
                    onSubmit={(values) => { console.log(values) }}
                    validationSchema={validations}>
                    <FormikForm>
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

                        <Field
                            placeholder="Número do cartão"
                            name="number"
                            className="input-error"
                        />
                        <ErrorMessage component="span" name="number" className="error-message" />

                        <Field
                            placeholder="Nome (igual  ao cartão)"
                            name="name"
                            className="input"
                        />
                        <ErrorMessage component="span" name="name" className="error-message" />

                        <div className="input-group">
                            <div>
                                <Field
                                    placeholder="Validade"
                                    name="expiration"
                                    className="input"
                                />
                                <ErrorMessage component="span" name="expiration" className="error-message" />
                            </div>

                            <div>
                                <Field
                                    placeholder="CVV"
                                    name="cvv"
                                    className="input"
                                />
                                <ErrorMessage component="span" name="cvv" className="error-message" />
                            </div>
                        </div>

                        <button type="submit" className="button">CONTINUAR</button>
                    </FormikForm>
                </Formik>
            </div>
        </div>
    );
}

export default Checkout;