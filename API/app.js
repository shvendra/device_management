const express = require('express')
const { sequelize, device_transaction, device_details } = require('./models');
const app = express()
app.use(express.json())
const deviceRoute = require('./routes/device_details');
const devicetransaction = require('./routes/device_transaction');
app.use('/device_details', deviceRoute);
app.use('/device_transaction', devicetransaction);
app.listen({ port: 3001}, async () => {
    console.log('Server up on http://localhost:3001')
     sequelize.sync() 
    await sequelize.authenticate()
  })
const mqtt = require('mqtt')
const clientId = `mqttx_9acec18d`
const connectUrl = `mqtt://zest-iot.in:1883`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'realzest',
  password: 'Realzest@123',
  reconnectPeriod: 1000,
})
console.log(clientId);
const topic = 'GVC/VM/ALL'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {

  // client.publish(topic, '12 45 01 256 68 235 59 85 87 87 98 89 4 10 10 10 10 10', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', async (topic, payload) => {
  // console.log("Received message " + payload.toString() + " on topic: " + topic.toString());
  const split_string = payload.toString().split(" ");
  console.log(split_string[0]);
  const devicedetails = await device_details.findOne({ where: { 'serial_number':12 },  order: [
    ["serial_number", "DESC"],
  ], limit: 1})
  // console.log(devicedetails);
       const device = await device_transaction.findOne({ where: { 'device_id':12 },  order: [
        ["id", "DESC"],
      ], limit: 1})
      if(device) {
        var life_door_count =    device['life_door_count'];
        var current_qty = device['current_qty'];
        var current_cash = device['current_cash'];
        var life_qty = device['life_qty'];
        var current_door_count = device['current_door_count'];
        var current_burn_cycle = device['current_burn_cycle'];
        var life_burn_cycle = device['life_burn_cycle'];
        var lifecash = device['life_cash'];
if (split_string[0] == 'life_cash') {
  console.log(lifecash + 'inif..........................................................................................................................');

  var lifecash = Number(split_string[1])+device['life_cash'];
  console.log(lifecash + 'inif');

}
if (split_string[0] == 'life_door_count') {
  var  life_door_count =    Number(split_string[1])+Number(device['life_door_count']);

}
if (split_string[0] == 'current_qty') {

}     var current_qty = Number(split_string[1])+device['current_qty'];

if (split_string[0] == 'current_cash') {
  var current_cash = Number(split_string[1])+device['current_cash'];

}
if (split_string[0] == 'life_qty') {
  var life_qty = Number(split_string[1])+device['life_qty'];

}
if (split_string[0] == 'current_door_count') {
  var current_door_count = Number(split_string[1])+device['current_door_count'];

}
if (split_string[0] == 'life_burn_cycle') {
  var life_burn_cycle = Number(split_string[1])+device['life_burn_cycle'];

}
if (split_string[0] == 'current_burn_cycle') {
  var current_burn_cycle = Number(split_string[1])+device['current_burn_cycle'];

}

        // const devices = await device_transaction.create({ current_temp_a:0,current_temp_b:0,current_door_count:current_door_count,life_door_count:life_door_count,current_qty:current_qty,life_qty:life_qty,current_burn_cycle:current_burn_cycle,life_burn_cycle:life_burn_cycle,last_status:'On',status: 'UNIT ON',status_type:split_string[0],spiral_a_status:split_string[0],spiral_b_status:split_string[0],current_cash:current_cash,life_cash:lifecash,device_id: 12 });
      } else {
        // const devices = await device_transaction.create({ current_temp_a:0,current_temp_b:0,current_door_count:0,life_door_count:0,current_qty:0,life_qty:0,current_burn_cycle:0,life_burn_cycle:0,last_status:'On',status:'UNIT ON',status_type:'',spiral_a_status:'',spiral_b_status:'',current_cash:0,life_cash:0,device_id: 12 });
      }
})
module.exports = app;