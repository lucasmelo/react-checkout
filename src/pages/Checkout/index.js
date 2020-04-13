import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../global.css';
import creditCard from '../../assets/credit-card.svg';
import shopLogo from '../../assets/shop-logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import checked from '../../assets/checked.svg';
import * as yup from 'yup';
import Validate from 'card-validator';
import { MenuItem } from '@material-ui/core';
import MaskedInput from 'react-text-mask'
import moment from 'moment';
import api from '../../services/api';
import { Select } from 'formik-material-ui';

const validations = yup.object().shape({
    number: yup
        .number()
        .required('Campo obrigatório')
        .test('test-number', 'Número de cartão inválido', value => Validate.number(value).isValid)
        .min(16, 'Digite todos os números do seu cartão'),
    name: yup
        .string()
        .required('Campo obrigatório')
        .min(3, 'Insira o nome completo')
        .matches(' ', 'Insira o nome completo'),
    expiration: yup
        .string()
        .required('Campo obrigatório')
        .matches(/([0-9]{2})\/([0-9]{2})/, 'Formato inválido. Use: MM/AA')
        .test('test-number', 'Data inválida', value => Validate.expirationDate(value).isValid),
    cvv: yup
        .string()
        .required('Campo obrigatório')
        .test('test-number', 'Código inválido', value => Validate.cvv(value).isValid)
        .min(3, 'Código inválido'),
    parcels: yup
        .string()
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
            parcels: '',
            brand: '',
            displayBrand: 'no-display',
            filledCreditCard: 'card-no-filled',
            showInputedCardData: true,
            parcelOption: [
                { option: 0, description: "2x de R$ 45.44" },
                { option: 1, description: "3x de R$ 75.44" },
                { option: 2, description: "4x de R$ 95.44" }
            ]
        };
    };

    async handleSubmit(values) {
        values.expiration = moment(values.expiration).format('MM-YY,h:mm:ssa');
        values.number = values.number.replace(/\s/g, '');

        try {
            const response = await api.post('pagar', values);
            alert(`Seu id de acesso: ${response.data.id}`);
        } catch (err) {
            console.log(err)
        }
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
                        this.setState({ brand: '', filledCreditCard: 'card-no-filled' });
                        break;
                }
                this.setState({ displayBrand: 'display', filledCreditCard: 'card-filled' })
            }
        } else {
            this.setState({ displayBrand: 'no-display', filledCreditCard: 'card-no-filled' })
        }
    }

    handleImgChange(e) {
        switch (e) {
            case 'keyup':
                this.setState({ filledCreditCard: 'cvv-template' });
                this.setState({ showInputedCardData: false });
                break;
            case 'blur':
                if (!this.state.number.length && !this.state.name.length && !this.state.expiration.length) {
                    this.setState({ filledCreditCard: 'card-no-filled' });
                } else {
                    this.setState({ filledCreditCard: 'card-filled' });
                }
                this.setState({ showInputedCardData: true });
                break;
            default:
                this.setState({ filledCreditCard: 'card-no-filled' });

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
                            <img
                                src={`../${this.state.filledCreditCard}.svg`}
                                alt="Cartão de Crédito" className="credit-card"
                            />
                            <div className={this.state.showInputedCardData ? 'top-left' : 'no-display'}>
                                <img
                                    src={`../${this.state.brand}.png`}
                                    alt="Visa"
                                    className={this.state.displayBrand.toString()}
                                />
                            </div>
                            <div className={this.state.showInputedCardData ? 'centered' : 'no-display'}> {this.state.number || '**** **** **** ****'} </div>
                            <div className={this.state.showInputedCardData ? 'bottom-left' : 'no-display'}> {this.state.name.toUpperCase() || 'NOME DO TITULAR'} </div>
                            <div className={this.state.showInputedCardData ? 'bottom-right' : 'no-display'}>{this.state.expiration || '00/00'} </div>
                        </div>

                    </section>

                    <div className="form-container">
                        <Formik initialValues={{ name: '', number: '', expiration: '', cvv: '', parcels: '' }} onSubmit={(values) =>
                            this.handleSubmit(values)} validationSchema={validations} >
                            {({ errors, touched }) => (
                                <FormikForm>
                                    <div className="stepper">
                                        <img src={checked} alt="Check" className="checked" />
                                        <span> Carrinho</span>

                                        <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                                        <div>2</div>
                                        <span>Pagamento </span>

                                        <FiChevronRight size={20} color="#de4b4b" style={{ marginRight: '30px' }} />
                                        <div>3</div>
                                        <span>Confirmação</span>
                                    </div>

                                    <Field name="number">
                                        {({ field }) => (
                                            <MaskedInput
                                                data-testid="number"
                                                guide={false}
                                                mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                                                {...field}
                                                placeholder="Número do cartão"
                                                className={touched.number && errors.number ? 'input-error' : 'input'}
                                                onKeyUp={e => this.handleValues('number', e.target.value)}
                                            />
                                        )}
                                    </Field>

                                    <ErrorMessage component="span" name="number" className="error-message" />

                                    <Field
                                        data-testid="name"
                                        placeholder="Nome (igual  ao cartão)"
                                        name="name" className={touched.name && errors.name ? 'input-error' : 'input'}
                                        onKeyUp={e => this.handleValues('name', e.target.value)}
                                        maxLength={30}
                                    />
                                    <ErrorMessage component="span" name="name" className="error-message" />

                                    <div className="input-group">
                                        <div>
                                            <Field name="expiration">
                                                {({ field }) => (
                                                    <MaskedInput
                                                        data-testid="expiration"
                                                        guide={false}
                                                        mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                                                        {...field}
                                                        placeholder="Data de validade"
                                                        className={touched.expiration && errors.expiration ? 'input-error' : 'input'}
                                                        onKeyUp={e => this.handleValues('expiration', e.target.value)}
                                                    />
                                                )}
                                            </Field>

                                            <ErrorMessage component="span" name="expiration" className="error-message" />
                                        </div>

                                        <div>
                                            <Field
                                                data-testid="cvv"
                                                name="cvv"
                                                onKeyUp={e => this.handleImgChange('keyup', e.target.value)}
                                                onBlur={e => this.handleImgChange('blur', e.target.value)}
                                                placeholder="CVV"
                                                className={touched.cvv && errors.cvv ? 'input-error' : 'input'}
                                                maxLength={3}
                                            />
                                            <ErrorMessage component="span" name="cvv" className="error-message" />
                                        </div>

                                    </div>

                                    <Field
                                        data-testid="parcels"
                                        component={Select}
                                        name="parcels"
                                        className={touched.parcels && errors.parcels ? 'select-error' : 'input'}
                                        options={this.state.parcelOption}
                                        type="text"
                                        label="parcels"
                                        disableUnderline={true}
                                        style={{ borderBottom: '1px solid #dadada', marginTop: '30px'}}
                                        displayEmpty
                                    >
                                        <MenuItem value="" >
                                            <span style={{ fontSize: '14px', color: '#757575' }}>
                                                Quantidade de parcelas
                                            </span>
                                        </MenuItem>

                                        {this.state.parcelOption.map((parcel, index) => (
                                            <MenuItem key={index} name="parcels" value={parcel.description}>
                                                {parcel.description}
                                            </MenuItem>
                                        ))};
                                    </Field>

                                    <ErrorMessage component="span" name="parcels" className="error-message" />

                                    <button type="submit" className="button" data-testid="button">
                                        CONTINUAR
                                        </button>

                                </FormikForm>
                            )}
                        </Formik>
                    </div>

                    <div className="sidebar-container">
                        <h3>SUA COMPRA</h3>

                        <hr></hr>
                        <p>Fone de ouvido X</p>
                        <p>Mouse Y</p>
                        <p>Roteador X</p>
                        <p>SSD Y</p>
                        <hr></hr>

                        <h4> TOTAL </h4>

                        <span> R$ 4.750.99 </span>
                    </div>

                </div>
            </div>
        );
    }
}

export default Checkout;