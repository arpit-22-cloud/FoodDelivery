import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// Placing user order from front-end
const placeOrder = async (req, res) => {
    const frontend_URL = process.env.FRONTEND_URL || "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        }); 
        await newOrder.save(); 
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); 

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 * 80 
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 * 80 
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_URL}/verify?session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error); 
        res.json({ success: false, message: "Error" }); 
    }
}

const verifyOrder = async (req, res) => {
    const orderId = req.body.orderId || req.query.orderId;
    const sessionId = req.body.sessionId || req.query.session_id || req.query.sessionId;

    if (!orderId || !sessionId) {
        return res.status(400).json({ success: false, message: "Missing orderId or sessionId" });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true, status: "Paid" },
                { new: true }
            );

            return res.json({ success: true, message: "Payment Verified" });
        }

        await orderModel.findByIdAndDelete(orderId);
        return res.json({ success: false, message: "Payment Failed" });
    } catch (error) {
        console.log("Order verification failed:", error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

// User orders for front-end
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders }); 
    } catch (error) {
        console.log(error); 
        res.json({ success: false, message: "Error" }); 
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
