'use strict';

import mongoose from 'mongoose'

const schema = new mongoose.Schema({name: String, skills: Object, date: {type: Date, default: new Date()}});
const Technology = mongoose.model('Technology', schema);

export default Technology;