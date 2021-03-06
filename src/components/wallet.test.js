import React from 'react';
import { shallow, configure } from 'enzyme';
import { Wallet } from './Wallet';

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Wallet', () => {
    const mockDeposit = jest.fn();
    const mockWithdraw = jest.fn();
    const props = { balance: 20, deposit: mockDeposit, withdraw: mockWithdraw };
    const wallet = shallow(<Wallet {...props}/>);

    it('renders properly', () => {
        expect(Wallet).toMatchSnapshot();
    });

    it('displays balance as props', () => {
        expect(wallet.find('.balance').text()).toEqual('Wallet balance: 20');
    });

    it('it creates an input to deposit into or withdraw from the balance', () => {
        expect(wallet.find('.input-wallet').exists()).toBe(true);
    });

    describe('when the user types into the wallet input', () => {
        const userBalance = '25';

        beforeEach(() => {
            wallet.find('.input-wallet')
            .simulate('change', { target: { value: userBalance }});
        })

        it('updates the local wallet balance in `state` and converts into to a number', () => {
            expect(wallet.state().balance).toEqual(parseFloat(userBalance));
        });

        describe('user wants to make a deposit', () => {
            beforeEach(() => wallet.find('.btn-deposit').simulate('click'));

            it('dispatches the `deposit()` it receives from props the local balance', () => {
                expect(mockDeposit).toHaveBeenCalledWith(parseFloat(userBalance));
            });
        });

        describe('user wants to make a withdrawal', () => {
            beforeEach(() => wallet.find('.btn-withdraw').simulate('click'));

            it('dispatches the `withdraw()` it receives from props the local balance', () => {
                expect(mockWithdraw).toHaveBeenCalledWith(parseFloat(userBalance));
            });
        });
    });
});