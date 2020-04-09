import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../global.css';
import creditCard from '../../assets/credit-card.svg'
// import templateCreditCard from '../../assets/template-credit-card.svg';
// import Form from '../Form'
import shopLogo from '../../assets/shop-logo.svg'
import { FiChevronLeft } from 'react-icons/fi'
// import visaImg from '../../assets/visa.png';
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import checked from '../../assets/checked.svg';
import { FiChevronRight } from 'react-icons/fi';
import * as yup from 'yup'
import Validate from 'card-validator';
import moment from 'moment';

const validations = yup.object().shape({
    number: yup
        .number()
        .required('Campo obrigatório')
        .test('test-number', 'Número de cartão inválido', value => Validate.number(value).isValid)
        .min(10, 'Seu cartão possui mais numeros')
        .max(20),
    name: yup
        .string()
        .min(3, 'Insira o nome completo')
        .matches(' ', 'Insira o nome completo')
        .required('Campo nome é obrigatório'),
    expiration: yup
        .string()
        .matches(/([0-9]{2})\/([0-9]{2})/, 'Formato inválido. Use: MM/AA')
        .test('test-number', 'Data inválida', value => Validate.expirationDate(value).isValid)
        .required('Campo obrigatório'),
    cvv: yup
        .string()
        .min(3, 'Código inválido')
        .test('test-number', 'Código inválido', value => Validate.cvv(value).isValid)
        .required('Campo obrigatório')
});

const steps = { cart: 1, checkout: 2, done: 3 };

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            expiration: '',
            cvv: '',
            brand: '',
            displayBrand: 'no-display',
            filledCreditCard: 'card-no-filled'
        };
    };

    handleSubmit(e, values) {
        e.preventDefault();
        console.log(values)
    }

    handleValues(field, value) {
        this.setState({
            [field]: value
        });
        if (field === 'number') { this.handleBrands(value) };
    }

    handleBrands(value) {
        if (value.length >= 4) {
            const brand = Validate.number(value);
            if (brand && brand.card && brand.card.type) {
                switch (brand.card.type) {
                    case 'mastercard':
                        this.setState({ brand: 'mastercard' })
                        break;
                    case 'visa':
                        this.setState({ brand: 'visa' })
                        break;
                    default:
                        this.setState({ brand: '' });
                        break;
                }
                this.setState({ displayBrand: 'display', filledCreditCard: 'card-filled' })
            }
        } else {
            this.setState({ displayBrand: 'no-display', filledCreditCard: 'card-no-filled' })
        }
    }

    render() {
        return (

            <div>
                <div className="header-container">
                    <div className="header-content">
                        <header>
                            <img src={shopLogo} alt="Logo" />
                            <Link to="/products" >PRODUTOS</Link>
                            <Link to="/location" >LOCALIZAÇÃO  </Link>
                            <Link to="/about" >SOBRE</Link>
                            <Link to="/contact" >CONTATO</Link>
                        </header>
                    </div>
                </div>


                <div className="checkout-container">

                    <section>
                        <div>
                            <Link to="/register">
                                <FiChevronLeft size={32} color="#fff" /> Alterar forma de pagamento
                        </Link>
                            <div className="steps">
                                <strong> Etapa {steps.checkout} </strong> de <strong>{steps.done}</strong>
                            </div>
                        </div>

                        <div className="group">
                            <img src={creditCard} alt="Icone cartão" />
                            <h1> Adicione um novo cartão de credito </h1>
                        </div>

                        <div className="img-credit-card">
                            <img src={`../${this.state.filledCreditCard}.svg`} alt="Cartão de Crédito" className="credit-card" />
                            <div className="top-left">
                                <img src={`../${this.state.brand}.png`} alt="Visa" className={this.state.displayBrand.toString()} />
                            </div>
                            <div className="centered"> {this.state.number || '**** **** **** ****'} </div>
                            <div className="bottom-left"> {this.state.name.toUpperCase() || 'NOME DO TITULAR'} </div>
                            <div className="bottom-right">{this.state.expiration || '00/00'} </div>
                        </div>
                    </section>

                    <div className="form-container">
                        <Formik initialValues={{ name: '', number: '', expiration: '', cvv: '' }} onSubmit={(values, event) =>
                            this.handleSubmit(values, event)} validationSchema={validations} >
                            {({ errors, touched }) => (
                                <FormikForm>
                                    <div className="stepper">
                                        <img src={checked} alt="Check" className="checked" />
                                        <span> Carrinho</span>

                                        <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                                        <img src={checked} alt="Check" className="checked" />
                                        <span>Pagamento </span>

                                        <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                                        <img src={checked} alt="Check" className="checked" />
                                        <span>Confirmação</span>
                                    </div>

                                    <Field type="number" maxLength={20} placeholder="Número do cartão" name="number" className={touched.number && errors.number ? 'input-error' : 'input'} onKeyUp={e =>
                                        this.handleValues('number', e.target.value)} />
                                    <ErrorMessage component="span" name="number" className="error-message" />

                                    <Field placeholder="Nome (igual  ao cartão)" name="name" className={touched.name && errors.name ? 'input-error' : 'input'} onKeyUp={e =>
                                        this.handleValues('name', e.target.value)} />
                                    <ErrorMessage component="span" name="name" className="error-message" />

                                    <div className="input-group">
                                        <div>
                                            <Field type="number" placeholder="Validade" name="expiration" className={touched.expiration && errors.expiration ? 'input-error' : 'input'}
                                                onKeyUp={e =>
                                                    this.handleValues('expiration', moment().format(e.target.value))} />
                                            <ErrorMessage component="span" name="expiration" className="error-message" />
                                        </div>

                                        <div>
                                            <Field placeholder="CVV" name="cvv" className={touched.cvv && errors.cvv ? 'input-error' : 'input'} />
                                            <ErrorMessage component="span" name="cvv" className="error-message" />
                                        </div>
                                    </div>

                                    <button type="submit" className="button">
                                        CONTINUAR
                                </button>
                                </FormikForm>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;