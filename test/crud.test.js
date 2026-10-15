import {test} from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {app} from '../server.js';
test('MongoDB itinerary lifecycle and destination replacement',async()=>{
 const mongo=await MongoMemoryServer.create();let server;
 try{await mongoose.connect(mongo.getUri());server=app.listen(0);await new Promise(r=>server.once('listening',r));const base='http://127.0.0.1:'+server.address().port;
 const call=async(path,method='GET',body)=>{const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});return {status:r.status,data:await r.json()};};
 const ds=await call('/api/destinations');assert.equal(ds.data.length,6);
 const d=ds.data[0],next=ds.data[1];let payload={title:'My trip',destinationId:d.id,budget:d.budget,days:d.days};
 assert.equal((await call('/api/itineraries','POST',{...payload,budget:-1})).status,400);
 const created=await call('/api/itineraries','POST',payload);assert.equal(created.status,201);const id=created.data._id;
 assert.equal((await call('/api/itineraries/'+id)).data.title,'My trip');
 assert.equal((await call('/api/itineraries')).data.length,1);
 payload={title:'Siargao trip',destinationId:next.id,budget:next.budget,days:next.days};const updated=await call('/api/itineraries/'+id,'PUT',payload);assert.equal(updated.data.destinationId,next.id);assert.equal(updated.data.days.length,next.days.length);
 assert.equal((await call('/api/itineraries/'+id)).data.title,'Siargao trip');
 assert.equal((await call('/api/itineraries/bad')).status,400);
 assert.equal((await call('/api/itineraries/'+id,'DELETE')).status,200);
 assert.equal((await call('/api/itineraries/'+id)).status,404);
 assert.equal((await call('/api/itineraries')).data.length,0);
 for(const path of ['/','/destination.html','/itinerary.html','/about.html','/vendor/vue/vue.global.prod.js'])assert.equal((await fetch(base+path)).status,200);
 }finally{if(server)await new Promise(r=>server.close(r));await mongoose.disconnect();await mongo.stop();}
});
