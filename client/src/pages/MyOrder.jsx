import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const {currency, axios, user} = useAppContext();

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            console.log("Fetching orders for user:", user._id);
            
            // Send the userId explicitly in the request
            const {data} = await axios.post('/api/order/user', { userId: user._id });
            
            if(data.success){
                console.log("Orders received:", data.orders);
                
                if (data.message) {
                    // Show message if orders couldn't be fully populated
                    toast.error(data.message);
                }
                
                setMyOrder(data.orders);
            } else {
                console.log("Failed to fetch orders:", data.message);
                toast.error(data.message || "Failed to fetch orders");
            }
        } catch (error) {
            console.log("Error fetching orders:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if(user){
           fetchMyOrders();
        }
    },[user]);
    
    // Extract safe product details even with incomplete population
    const getProductDetails = (item) => {
        if (!item) return { name: 'Unknown Product', price: 0 };
        
        // If product is not populated, return basic info
        if (!item.product || typeof item.product !== 'object') {
            return {
                name: 'Product Information Unavailable',
                category: 'N/A',
                image: null,
                price: 0
            };
        }
        
        return {
            name: item.product.name || 'Unknown Product',
            category: item.product.category || 'N/A',
            image: item.product.image && item.product.image.length > 0 ? item.product.image[0] : null,
            price: item.product.offerPrice || 0
        };
    };
    
  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        
        {loading ? (
            <div className="text-center py-8">
                <p className="text-xl text-gray-500">Loading orders...</p>
            </div>
        ) : myOrder && myOrder.length > 0 ? (
            myOrder.map((order, index)=>(
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : {currency}{order.amount}</span>
                    </p>
                    {order.items && order.items.map((item, index)=>{
                        const product = getProductDetails(item);
                        return (
                            <div key={index} className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b"}border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-primary/10 p-4 rounded-lg'>
                                        {product.image ? (
                                            <img src={product.image} alt='' className='w-16 h-16'/>
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs text-gray-500">No image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='ml-4'>
                                        <h2 className='text-xl font-medium text-gray-800'>{product.name}</h2>
                                        <p>Category: {product.category}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                    <p>Quantity: {item.quantity || "1"}</p>
                                    <p>Status: {order.status || "Processing"}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className='text-primary text-lg font-medium'>
                                    Amount: {currency}{product.price * (item.quantity || 1)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ))
        ) : (
            <div className="text-center py-8">
                <p className="text-xl text-gray-500">No orders found</p>
            </div>
        )}
    </div>
  )
}

export default MyOrder