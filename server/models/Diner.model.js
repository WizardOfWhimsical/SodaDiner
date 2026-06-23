import mongoose from "mongoose";
// import Soda from "#Models/Soda"

const Schema = mongoose.Schema;

const dinerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  sodas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Soda",
    },
  ],
});

const Diner = mongoose.model("diner", dinerSchema);
export default Diner;
