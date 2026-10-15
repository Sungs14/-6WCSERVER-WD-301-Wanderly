import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const destinations = JSON.parse(readFileSync(new URL('./destinations.json', import.meta.url)));
const daySchema = new mongoose.Schema({title:{type:String,required:true},activities:[String]}, {_id:false});
const tripSchema = new mongoose.Schema({title:{type:String,required:true},destinationId:{type:String,required:true},budget:{type:Number,required:true,min:0},days:{type:[daySchema],required:true}}, {timestamps:true});
export const Trip = mongoose.model('Trip',tripSchema);
export const app = express();
app.use(express.json({limit:'100kb'}));
app.get('/api/destinations', (req,res)=>res.json(destinations));
function validate(body) {
 const {title,destinationId,budget,days}=body;
 if(typeof title!=='string'||!title.trim()||title.length>120) throw Error('Enter a title of 1–120 characters.');
 if(!destinations.some(d=>d.id===destinationId)) throw Error('Choose a valid destination.');
 if(typeof budget!=='number'||!Number.isFinite(budget)||budget<0||budget>100000000) throw Error('Enter a valid non-negative budget.');
 if(!Array.isArray(days)||days.length<1||days.length>30||days.some(d=>typeof d.title!=='string'||!d.title.trim()||d.title.length>120||!Array.isArray(d.activities)||d.activities.length<1||d.activities.length>20||d.activities.some(a=>typeof a!=='string'||!a.trim()||a.length>500))) throw Error('Add 1–30 days with titles and 1–20 activities per day.');
 return {title:title.trim(),destinationId,budget,days:days.map(d=>({title:d.title.trim(),activities:d.activities.map(a=>a.trim())}))};
}
const route=fn=>(req,res,next)=>Promise.resolve(fn(req,res)).catch(next);
app.param('id',(req,res,next,id)=>mongoose.isValidObjectId(id)?next():res.status(400).json({error:'Invalid itinerary ID.'}));
app.get('/api/itineraries',route(async(req,res)=>res.json(await Trip.find().sort({updatedAt:-1}))));
app.get('/api/itineraries/:id',route(async(req,res)=>{const trip=await Trip.findById(req.params.id);res.status(trip?200:404).json(trip||{error:'Itinerary not found.'});}));
app.post('/api/itineraries',route(async(req,res)=>{let data;try{data=validate(req.body);}catch(e){return res.status(400).json({error:e.message});}res.status(201).json(await Trip.create(data));}));
app.put('/api/itineraries/:id',route(async(req,res)=>{let data;try{data=validate(req.body);}catch(e){return res.status(400).json({error:e.message});}const trip=await Trip.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true});res.status(trip?200:404).json(trip||{error:'Itinerary not found.'});}));
app.delete('/api/itineraries/:id',route(async(req,res)=>{const trip=await Trip.findByIdAndDelete(req.params.id);res.status(trip?200:404).json(trip?{message:'Itinerary deleted.'}:{error:'Itinerary not found.'});}));
app.use('/vendor/vue',express.static(fileURLToPath(new URL('./node_modules/vue/dist/',import.meta.url))));
app.use(express.static(fileURLToPath(new URL('./public/',import.meta.url))));
app.use((err,req,res,next)=>{console.error(err.message);res.status(500).json({error:'Could not complete the request. Please try again.'});});
if(process.argv[1]===fileURLToPath(import.meta.url)) {
 try { await mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/wanderly',{serverSelectionTimeoutMS:5000});app.listen(process.env.PORT||3000,()=>console.log('Wanderly: http://localhost:'+(process.env.PORT||3000))); }
 catch(e){console.error('MongoDB connection failed. Start MongoDB or set MONGODB_URI in .env. '+e.message);process.exitCode=1;}
}
