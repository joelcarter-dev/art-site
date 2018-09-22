import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'

export class PayPalCheckout extends Component {

  payment() {
    if (paypal !== "undefined") {
      const env = this.props.env
      const client = this.props.client
      const itemData = this.props.itemData
      return paypal.rest.payment.create(env, client, {
        transactions: [
          itemData
        ]
      })
    }
  }

  render() {

    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    // const {
    //   showButtƒon,
    // } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

    if (typeof window !== 'undefined' && window ) {
      
      const PaypalButton = paypal.Button.driver('react', {React, ReactDOM})
      
      return (
        <div>
          {<PaypalButton
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />}
        </div>
      )
      
    } else {
      return <div>SSR did not work</div>  
    }
    
  }
}
export default PayPalCheckout