'use strict';
import mongoose from 'mongoose'

const mongodb =  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

export default mongodb;
