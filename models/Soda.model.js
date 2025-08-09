import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sodaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
    default: "SodaPop",
  },
  fizziness: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
    required: true,
  },
  served: {
    //<==We Todd Ed Sofa King WE TODD ED!
    type: Boolean,
    default: false,
  },
});

const Soda = mongoose.model("Soda", sodaSchema);
export default Soda;
