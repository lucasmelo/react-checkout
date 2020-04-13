import React from 'react';
import Checkout from './index'

import { render, waitForElement } from '@testing-library/react'

describe('Tests for Checkout component', () => {
    it('add text', async () => {
        const { getByTestId } = render(<Checkout />);
        const fieldNode = await waitForElement(() => getByTestId('number'))
        console.log(fieldNode)
    })
})