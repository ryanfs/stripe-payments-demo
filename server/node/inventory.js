/**
 * inventory.js
 * Stripe Payments Demo. Created by Romain Huet (@romainhuet)
 * and Thorsten Schaeff (@thorwebdev).
 *
 * Simple library to store and interact with products stored on Stripe.
 * These methods are using the Stripe Products API, but we tried to abstract them
 * from the main code if you'd like to use your own product management system instead.
 */

'use strict';

const config = require('./config');
const stripe = require('stripe')(config.stripe.secretKey);
// For product retrieval and listing set API version to 2018-02-28 so that skus are returned.
stripe.setApiVersion('2018-02-28');

// List all products.
const listProducts = async () => {
  // return await stripe.products.list({limit: 10, type: 'good'});
  return await stripe.products.list();
};

// Retrieve a product by ID.
const retrieveProduct = async productId => {
  return await stripe.products.retrieve(productId);
};

// Get shipping cost from config based on selected shipping option.
const getShippingCost = shippingOption => {
  return config.shippingOptions.filter(
    option => option.id === shippingOption
  )[0].amount;
};

exports.products = {
  list: listProducts,
  retrieve: retrieveProduct,
  getShippingCost,
};
