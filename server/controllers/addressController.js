import Address from "../models/Address.js"

//Add address : /api/address/add



export const addAddress = async(req, res)=>{
    try {
        const {address, userId} = req.body

        console.log("Request Body:", req.body);
        console.log("Address:", address);
        console.log("User ID:", userId);

        if (!address || !userId) {
            return res.json({ success: false, message: "User ID and address are required" });
        }

        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "street",
            "city",
            "state",
            "zipcode",
            "country",
            "phone"
        ];

        for (const field of requiredFields) {
            if (!address[field]) {
                return res.json({ success: false, message: `${field} is required` });
            }
        }
         // Ensure zipcode is a number
        address.zipcode = Number(address.zipcode);
        if (isNaN(address.zipcode)) {
            return res.json({ success: false, message: "Invalid zipcode" });
        }

        await Address.create({...address, userId})
        res.json({success: true, message: "Address added successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

//get address : /api/address/get

export const getAddress = async(req, res)=>{
    try {
        const {userId} = req.body
        const addresses = await Address.find({userId})
        res.json({success: true, addresses})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}