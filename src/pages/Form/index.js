import React from 'react';
import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import './style.css'
import checked from '../../assets/checked.svg';
import { FiChevronRight } from 'react-icons/fi';
import * as yup from 'yup'
import Validate from 'card-validator';
// import PropTypes from 'prop-types'



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
        .test('test-number', 'Data inválida', value => Validate.expirationDate(value).isValid) // return true false based on validation
        .required('* Campo validade é obrigatório'),

    cvv: yup
        .string()
        .min(3, 'Código inválido')
        .test('test-number', 'Código inválido', value => Validate.cvv(value).isValid) // return true false based on validation
        .required('* Campo CVV é obrigatório')
});


const Form = () => {

    return (
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
    )
};

// Form.propTypes = {
//     handleSubmit: PropTypes.func.isRequired,
//     initialValues: PropTypes.object.isRequired
// }

export default Form;