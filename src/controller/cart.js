const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error })

            if (cart) {

                //update the cart
                res.status(200).json({ message:cart })
            }
            else {
                const cart = new Cart({
                    user:req.user._id,
                    cartItems:req.body.cartItems
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









