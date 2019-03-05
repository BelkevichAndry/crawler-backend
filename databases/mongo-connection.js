'use strict';
import mongoose from 'mongoose'

const db =  mongoose.connect('mongodb://localhost:27017/local', {useNewUrlParser: true});

export default db;
