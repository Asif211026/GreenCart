import Order from "../models/Order.js"
import Product from "../models/product.js"
import stripe from "stripe";
import User from "../models/User.js"

//place order COD : /api/order/cod



export const placeOrderCOD =async(req,res)=>{
    try {
        const {userId, items, address} = req.body
        if(!address || items.length === 0 ){
            return res.json({success:false,message:"Invalid data"})
        }
        //calculate amount
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)
        //add tax charge
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD",
        })
        return res.json({success: true, message: "order placed successfully"})
    } catch (error) {
        return res.json({success: false, message:error.message})
    }
}

//place order COD : /api/order/stripe



export const placeOrderStripe =async(req,res)=>{
    try {
        const {userId, items, address} = req.body
        const {origin} = req.headers;

        if(!address || items.length === 0 ){
            return res.json({success:false,message:"Invalid data"})
        }
        let productData = [];
        //calculate amount
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity: item.quantity,
            })
            return (await acc) + product.offerPrice * item.quantity;
        },0)
        //add tax charge
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"Online",
        })

        //stripe instance
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        //create line item for stripe
        const line_items = productData.map((items)={
            return: {
                price_data: {
                    currency: "usd",
                    product_data:{
                        name:items.name,
                    },
                    unit_amount: Math.floor(items.price + items.price* 0.02) * 100
                },
                quantity: items.quantity,
            }
        })
        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId: order._id.toString(),
                userId,
            }
        })


        return res.json({success: true, url: session.url});
    } catch (error) {
        return res.json({success: true, message:error.message})
    }
}

//stripe webhook to verify payment action :/stripe
export const stripeWebhooks = async (request, response)=>{
    //stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.header["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    //handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session meta data
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderId, userId } = session.data[0].metadata;

            //Mark payment as paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            //clear user cart
            await User.findByIdAndUpdate(userId, {cartItems: {}})
            break;
        }
            
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session meta data
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        } 
    
        default:
            console.error(`Unhandle event type ${event.type}`)
            break;
    }
    response.json({received: true})
}

//get order by user id : /api/order/user
export const getUSerOrder = async (req,res)=>{
    try {
        const { userId } = req.body;
        console.log("Fetching orders for userId:", userId);
        
        if (!userId) {
            console.log("No userId provided in request body");
            return res.json({success: false, message: "User ID is required"});
        }
        
        // Log all orders to debug
        const allOrders = await Order.find({}).lean();
        console.log("All orders in DB:", allOrders.length);
        
        try {
            // Get orders for this specific user
            const orders = await Order.find({
                userId: userId,
                $or: [{paymentType: "COD"},{isPaid:true}]
            }).populate({
                path: "items.product",
                model: "Product"
            }).populate({
                path: "address",
                model: "address"
            }).sort({createdAt:-1});
            
            console.log("Orders found for userId", userId, ":", orders.length);
            return res.json({success:true, orders});
        } catch (populateError) {
            console.log("Error populating order data:", populateError);
            
            // If population fails, just return the orders without populated data
            const orders = await Order.find({
                userId: userId,
                $or: [{paymentType: "COD"},{isPaid:true}]
            }).sort({createdAt:-1});
            
            return res.json({
                success: true, 
                orders,
                message: "Orders found, but details could not be populated"
            });
        }
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.json({success:false, message: error.message});
    }
}

//get all order for seller/admin   : /api/order/seller
export const getAllOrder = async (req,res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}