import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const notificationSchema = new Schema({
orderId : {
    type : ObjectId,
    ref : 'Order'
},

text : {
    type : String
},
from : {
    type : ObjectId,
    ref: 'User'
},
userId : {
    type : ObjectId,
    ref : 'User'
},
readed: {
    type : Boolean,
    default : false
}
},{timestamps: true})

export default mongoose.model('Notification',notificationSchema)