import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
    const {currency, axios} = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get('/api/order/seller');
            console.log("Seller orders response:", data);
            
            if(data.success){
                setOrders(data.orders || []);
            }else{
                toast.error(data.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error("Error fetching seller orders:", error);
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[]);

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : orders && orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 ">
                        <div className="flex gap-5 max-w-80">
                            <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
                            <div>
                                {order.items && order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex flex-col ">
                                        <p className="font-medium">
                                            {item.product && item.product.name ? item.product.name : 'Product'} {" "}
                                            <span className="text-primary">x {item.quantity || 1}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm md:text-base text-black/60">
                            {order.address ? (
                                <>
                                    <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
                                    <p>{order.address.street}, {order.address.city}</p>
                                    <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                                    <p>{order.address.phone}</p>
                                </>
                            ) : (
                                <p>Address not available</p>
                            )}
                        </div>

                        <p className="font-medium text-lg my-auto ">{currency}{order.amount}</p>

                        <div className="flex flex-col text-sm md:text-base text-black/60">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No orders found</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Orders