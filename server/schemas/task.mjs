import mongoose, { Schema } from "mongoose";



const taskSchema = new Schema({
    taskName: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    category: {type: String},
    createdat: {type: Date, default: Date.now()},
    
})

const Task = mongoose.model('Task', taskSchema)
export default Task