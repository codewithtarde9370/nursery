import { Description } from "@mui/icons-material";
import {Schema, module} from "mongoose";

const plantSchema = new Schema({
    name:String,
    Description:String,
    price:Number,
    image:String
},{
    timestamps:true
})
const Plant = model("Plant", plantSchema)

export default Plant
