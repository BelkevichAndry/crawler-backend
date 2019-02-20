'use strict';

import mongoose from 'mongoose'

const schema = new mongoose.Schema({name: String, total: Number, date: {type: Date, default: new Date()}});
const Frequency = mongoose.model('Frequency', schema);

export default Frequency;