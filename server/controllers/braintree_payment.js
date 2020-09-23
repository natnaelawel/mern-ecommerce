const User = require("../models/user");
// const mybraintree = require('braintree');
const braintree = require("braintree");

// require("dotenv").config();

// console.log(braintree.BraintreeGateway(
//   PublicKeyCredential
// ))
// const gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "zx3jpkrw4r4ckyvm",
//   publicKey: "xgp6dqtxbx293qrn",
//   privateKey: "b06910e34239b1dc98cb0aa4e8319b24",
// });
// const gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate(
    {
      // customerId: aCustomerId,
    },
    function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        const clientToken = response.clientToken;
        res.send(clientToken);
      }
    }
  );
};

exports.saleTransaction = (req, res) => {
  gateway.transaction
    .sale({
      amount: "5.00",
      paymentMethodNonce: "nonce-from-the-client",
      options: {
        submitForSettlement: true,
      },
    })
    .then(function (result) {
      if (result.success) {
        console.log("Transaction ID: " + result.transaction.id);
      } else {
        console.error(result.message);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  // charge the user

  gateway.transaction
    .sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      if (result.success) {
        console.log("Transaction ID: " + result.transaction.id);
        return res.status(200).json(result);
        
      } else {
        console.error(result.message);
        return res.status(500).json(result.message);

      }
    })
    .catch(function (err) {
      console.error(err);
      return res.status(500).json(err)
    });
};
