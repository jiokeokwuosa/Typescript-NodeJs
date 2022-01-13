import mongoose from "mongoose";

export interface StarShipDocument extends mongoose.Document {
  uid: string;
  name:string;
  count:number;
  url:string;
  createdAt: Date;
  updatedAt: Date;
}

const StarShipSchema = new mongoose.Schema(
  {    
    uid: {
      type: String, 
      required: true         
    },  
    name: {
      type: String,
      required: true     
    },
    count: {
      type: Number,
      default:0  
    },
    url:{
      type: String     
    }    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);


const starShip = mongoose.model<StarShipDocument>("starShip", StarShipSchema);

export default starShip;
