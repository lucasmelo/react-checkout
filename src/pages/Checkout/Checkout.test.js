import React from 'react';
import Checkout from './index';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Tests for Checkout component', () => {
    it('Should render all input elements', async () => {
        const history = createMemoryHistory();
        const { getByTestId } = render(<Router history={history}><Checkout /></Router>);
        const numberFieldNode = await waitForElement(() => getByTestId('number'));
        const nameFieldNode = await waitForElement(() => getByTestId('name'));
        const expirationFieldNode = await waitForElement(() => getByTestId('expiration'));
        const cvvFieldNode = await waitForElement(() => getByTestId('cvv'));
        const parcelsFieldNode = await waitForElement(() => getByTestId('parcels'));
        const buttonFieldNode = await waitForElement(() => getByTestId('button'));

        const formDataMock = {
            number: '5331 4128 4090 5117',
            name: 'Lucas Melo',
            expiration: '10/22',
            cvv: '777',
            parcels: '3x de 2x de R$ 45.44'
        };

        // card number input
        await act(async () => {
            fireEvent.change(getByTestId("number"), {
                target: { value: formDataMock.number }
            });
        });
        expect(numberFieldNode.value).toEqual(formDataMock.number);

        // name input
        await act(async () => {
            fireEvent.change(getByTestId("name"), {
                target: { value: formDataMock.name }
            });
        });
        expect(nameFieldNode.value).toEqual(formDataMock.name);

        // expiration input
        await act(async () => {
            fireEvent.change(getByTestId("expiration"), {
                target: { value: formDataMock.expiration }
            });
        });
        expect(expirationFieldNode.value).toEqual(formDataMock.expiration);

        //cvv input
        await act(async () => {
            fireEvent.change(getByTestId("cvv"), {
                target: { value: formDataMock.cvv }
            });
        });
        expect(cvvFieldNode.value).toEqual(formDataMock.cvv);

        //parcel input
        expect(parcelsFieldNode).toBeDefined()

        //button
        await act(async () => {
            fireEvent.click(buttonFieldNode)
        })
        expect(buttonFieldNode).toBeDefined()
    })
})