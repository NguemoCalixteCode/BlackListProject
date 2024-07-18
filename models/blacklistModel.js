import { model, Schema } from "mongoose";

const blacklistSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blacklist = model("Blacklist", blacklistSchema);
export default Blacklist;
