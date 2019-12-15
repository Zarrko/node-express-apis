/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    status: {
        default: "active",
        required: true,
        type: String,
        enum: ["active", "complete", "pastdue"]
    },

    notes: String,

    due: Date,

    createdBy: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },

    list: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: "list"
    }
}, { timestamps: true })

itemSchema.index({ list: 1, name: 1 }, { unique: true })
export const Item = mongoose.model('item', itemSchema)
