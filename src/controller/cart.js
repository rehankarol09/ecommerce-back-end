

const Cart = require('../models/cart')

const runupdate = (condition, updatedata) => {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updatedata, { upsert: true, new: true })
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    })
}


exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {  //if user already have cart
                /* const product = req.body.cartItems.product;
                const items = cart.cartItems.find(c => c.product == product);
                if (items) {
                    Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product }, {
                        /* "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: items.quantity + req.body.cartItems.quantity
                            }
                        } 

                        "$set": {
                            "cartItems.$.quantity": items.quantity + req.body.cartItems.quantity
                          }

                    }).exec((error, _cart) => {
                        if (error) return res.status(400).json({ error });

                        if (_cart) {
                            res.status(200).json({
                                cart: _cart
                            });
                        }

                    });

                } else {
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            
                            "cartItems": req.body.cartItems
                        }
                    }).exec((error, _cart) => {
                            if (error) return res.status(400).json({ error });

                            if (_cart) {
                                res.status(200).json({
                                    cart: _cart
                                });
                            }
                        });
                } */


                let promiseArray = []
                req.body.cartItems.forEach(cartItem => {
                    const product = cartItem.product;
                    const item = cart.cartItems.find(c => c.product == product);
                    if (item) {  //if item is added
                        condition = { user: req.user._id, "cartItems.product": product }
                        update = {
                            $set: {
                                "cartItems.$": cartItem
                            }
                        }
                    } else {   //if new item to be added
                            condition={user:req.user._id}
                            update={
                                $push:{
                                    "cartItems":cartItem
                                }
                            }
                    }
                    promiseArray.push(runupdate(condition,update));
                });

             

             Promise.all(promiseArray)
             .then((response)=>res.status(200).json({response}))
             .catch((err)=>res.status(400).json({err}))
            }
            else {
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error })
                    if (cart) {
                        res.status(200).json({
                            cart
                        });
                    }
                });
            }
        });
}









