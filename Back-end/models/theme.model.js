import mongoose from "mongoose";
const themeSchema = new mongoose.Schema(
  {
    
   
    
    name: {
      type: String,
      required: true,
      trim: true
    },

    mode: {
      type: String,
      enum: ["light", "dark"],
      required: true
    },
     buttonType:{
      type:String,
      enum:["text","contained","outlined"],
      default:"contained"
    },
    inputType:{
      type:String,
      enum:["filled","standard","outlined"],
      default:"outlined"
    },

    colors: {
      background: {
        main: String,
        paper: String,
        card: String
      },

      sidebar: {
        background: String,
        text: String,
        icon: String,
        active: {
          background: String,
          text: String,
          icon: String
        },
        hover: {
          background: String,
          text: String,
          icon: String
        },
        border: String
      },

      text: {
        primary: String,
        secondary: String,
        disabled: String
      },

      button: {
        primary: {
          background: String,
          text: String,
          hover: String,
          border: String
        },
        secondary: {
          background: String,
          text: String,
          hover: String,
          border: String
        },
        danger: {
          background: String,
          text: String,
          hover: String,
          border: String
        }
      },

      icon: {
        default: String,
        active: String,
        disabled: String
      },

      border: {
        default: String,
        focus: String
      }
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
const themModel = mongoose.models.theme || mongoose.model("theme", themeSchema);

export default themModel
