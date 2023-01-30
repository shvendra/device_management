const env = require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const cors = require('cors');
const {  device_details} = require('../models');
const {  history} = require('../models');

const { Op } = require("sequelize");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
var csv = require('csvtojson');
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'uploads')));

app.use(express.json())
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(cors());
app.options('*', cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

  app.post("/importdevice", upload.single("file"), (req, res) => {
    const file = req.file;
   try {
    csv().fromFile(req.file.path).then(async(response) => {
      let hasKey = response[0].hasOwnProperty('serial_number'); 
      console.log(hasKey);
      if (hasKey) {
           await device_details.bulkCreate(response, { updateOnDuplicate : ["name", "model", "project", "customer", "state", "city", "shiped_on", "site", "installed_on", "warranty_valid", "unit_price", "min_temp_a", "max_temp_a", "min_temp_b", "max_temp_b", "spiral_a_max_qty", "spiral_b_max_qty", "max_door_count", "max_burn_time", "forced_burn_time"], }).then(function() {console.log('insidelllll');});
          var changes = [];
           for (let i = 0; i < response.length; i++) {
            let serial_number = response[i].serial_number;
            var device_details_update = await device_details.findOne({ where: { serial_number } })
            if(response[i].name = device_details_update.name) {
              changes.push("Device name changed: "+ device_details_update.name  + " to " + response[i].name);
            }
            if(response[i].model != device_details_update.model) {
              changes.push("Model changed: "+ device_details_update.model  + " to " + response[i].model);
            }
            if(response[i].project != device_details_update.project) {
              changes.push("Project changed: "+ device_details_update.project  + " to " + response[i].project);
            }
            if(response[i].customer != device_details_update.customer) {
              changes.push("Customer name changed: "+ device_details_update.customer  + " to " + response[i].customer);
            }
            if(response[i].city != device_details_update.city) {
              changes.push("Coty changed: "+ device_details_update.city  + " to " + response[i].city);
            }
            if(response[i].shiped_on != device_details_update.shiped_on) {
              changes.push("Shiped on changed: "+ device_details_update.shiped_on  + " to " + response[i].shiped_on);
            }
            if(response[i].site != device_details_update.site) {
              changes.push("Site name changed: "+ device_details_update.site  + " to " + response[i].site);
            }
            if(response[i].installed_on != device_details_update.installed_on) {
              changes.push("Installed on changed: "+ device_details_update.installed_on  + " to " + response[i].installed_on);
            }
            if(response[i].warranty_valid != device_details_update.warranty_valid) {
              changes.push("Warrenty valid changed: "+ device_details_update.warranty_valid  + " to " + response[i].warranty_valid);
            }
            if(response[i].unit_price != device_details_update.unit_price) {
              changes.push("Unit price  changed: "+ device_details_update.unit_price  + " to " + response[i].unit_price);
            }
            if(response[i].min_temp_a != device_details_update.min_temp_a) {
              changes.push("Min temp a changed: "+ device_details_update.min_temp_a  + " to " + response[i].min_temp_a);
            }
            if(response[i].max_temp_a != device_details_update.max_temp_a) {
              changes.push("Max temp a  changed: "+ device_details_update.max_temp_a  + " to " + response[i].max_temp_a);
            }
            if(response[i].min_temp_b != device_details_update.min_temp_b) {
              changes.push("Min temp b changed: "+ device_details_update.min_temp_b  + " to " + response[i].min_temp_b);
            }
            if(response[i].max_temp_b != device_details_update.max_temp_b) {
              changes.push("Max temp b on changed: "+ device_details_update.max_temp_b  + " to " + response[i].max_temp_b);
            }
            if(response[i].spiral_a_max_qty != device_details_update.spiral_a_max_qty) {
              changes.push("Spiral a max qty changed: "+ device_details_update.spiral_a_max_qty  + " to " + response[i].spiral_a_max_qty);
            }
            if(response[i].spiral_b_max_qty != device_details_update.spiral_b_max_qty) {
              changes.push("Spiral b max qty changed: "+ device_details_update.spiral_b_max_qty  + " to " + response[i].spiral_b_max_qty);
            }
            if(response[i].max_door_count != device_details_update.max_door_count) {
              changes.push("Max door count changed: "+ device_details_update.max_door_count  + " to " + response[i].max_door_count);
            }
            if(response[i].max_burn_time != device_details_update.max_burn_time) {
              changes.push("Max burn time changed: "+ device_details_update.max_burn_time  + " to " + response[i].max_burn_time);
            }
            if(response[i].forced_burn_time != device_details_update.forced_burn_time) {
              changes.push("Forced burn time changed: "+ device_details_update.forced_burn_time  + " to " + response[i].forced_burn_time);
            }
          }
          var historydata = {
            operation: "On bulk update",
            operation_by: "Admin",
            changes: JSON.stringify(changes)
          }
          console.log(historydata);
           history.create(historydata);
      } else {
         device_details.bulkCreate(response).then(function() {console.log('inside');});
      }
    })
    res.send({status:400, success:true, msg:error.message})
   } catch(error) {
    res.send({status:400, success:false, msg:error.message})
   }
  });

app.get('/gethistory', async (req, res) => {
  try {
    const historydata = await history.findAll()
    return res.json(historydata)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
app.post('/adddevice', async (req, res) => {
   console.log(req.body);
const { customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a, max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time } = req.body
try {
const devices = await device_details.create({ customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a, max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time });
return res.json({ message: 'Device details updated succesfully' })
} catch (err) {
console.log(err)
return res.status(500).json(err)
}
})
app.put('/deviceupdate/:serial_number', async (req, res) => {
   console.log(req.body);
  const serial_number = req.params.serial_number
  const { customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a,max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time } = req.body
  try {
    const device_details_update = await device_details.findOne({ where: { serial_number } })
    device_details_update.customer = customer
    device_details_update.name = name
    device_details_update.state = state
    device_details_update.city = city
    device_details_update.project = project
    device_details_update.site = site
    device_details_update.model = model
    device_details_update.shiped_on = shiped_on
    device_details_update.installed_on = installed_on
    device_details_update.warranty_valid = warranty_valid
    device_details_update.unit_price = unit_price
    device_details_update.min_temp_a = min_temp_a
    device_details_update.max_temp_a = max_temp_a
    device_details_update.min_temp_b = min_temp_b
    device_details_update.max_temp_b = max_temp_b
    device_details_update.spiral_a_max_qty = spiral_a_max_qty
    device_details_update.spiral_b_max_qty = spiral_b_max_qty
    device_details_update.max_door_count = max_door_count
    device_details_update.max_burn_time = max_burn_time
    device_details_update.forced_burn_time = forced_burn_time
    await device_details_update.save()
    var changes = [];
    if( name = device_details_update.name) {
      changes.push("Device name changed: "+ device_details_update.name  + " to " + name);
    }
    if( model != device_details_update.model) {
      changes.push("Model changed: "+ device_details_update.model  + " to " +  model);
    }
    if( project != device_details_update.project) {
      changes.push("Project changed: "+ device_details_update.project  + " to " +  project);
    }
    if( customer != device_details_update.customer) {
      changes.push("Customer name changed: "+ device_details_update.customer  + " to " +  customer);
    }
    if( city != device_details_update.city) {
      changes.push("Coty changed: "+ device_details_update.city  + " to " + city);
    }
    if( shiped_on != device_details_update.shiped_on) {
      changes.push("Shiped on changed: "+ device_details_update.shiped_on  + " to " +  shiped_on);
    }
    if( site != device_details_update.site) {
      changes.push("Site name changed: "+ device_details_update.site  + " to " +  site);
    }
    if( installed_on != device_details_update.installed_on) {
      changes.push("Installed on changed: "+ device_details_update.installed_on  + " to " +  installed_on);
    }
    if( warranty_valid != device_details_update.warranty_valid) {
      changes.push("Warrenty valid changed: "+ device_details_update.warranty_valid  + " to " +  warranty_valid);
    }
    if( unit_price != device_details_update.unit_price) {
      changes.push("Unit price  changed: "+ device_details_update.unit_price  + " to " +  unit_price);
    }
    if( min_temp_a != device_details_update.min_temp_a) {
      changes.push("Min temp a changed: "+ device_details_update.min_temp_a  + " to " +  min_temp_a);
    }
    if( max_temp_a != device_details_update.max_temp_a) {
      changes.push("Max temp a  changed: "+ device_details_update.max_temp_a  + " to " +  max_temp_a);
    }
    if( min_temp_b != device_details_update.min_temp_b) {
      changes.push("Min temp b changed: "+ device_details_update.min_temp_b  + " to " +  min_temp_b);
    }
    if( max_temp_b != device_details_update.max_temp_b) {
      changes.push("Max temp b on changed: "+ device_details_update.max_temp_b  + " to " +  max_temp_b);
    }
    if( spiral_a_max_qty != device_details_update.spiral_a_max_qty) {
      changes.push("Spiral a max qty changed: "+ device_details_update.spiral_a_max_qty  + " to " +  spiral_a_max_qty);
    }
    if( spiral_b_max_qty != device_details_update.spiral_b_max_qty) {
      changes.push("Spiral b max qty changed: "+ device_details_update.spiral_b_max_qty  + " to " +  spiral_b_max_qty);
    }
    if( max_door_count != device_details_update.max_door_count) {
      changes.push("Max door count changed: "+ device_details_update.max_door_count  + " to " +  max_door_count);
    }
    if( max_burn_time != device_details_update.max_burn_time) {
      changes.push("Max burn time changed: "+ device_details_update.max_burn_time  + " to " +  max_burn_time);
    }
    if( forced_burn_time != device_details_update.forced_burn_time) {
      changes.push("Forced burn time changed: "+ device_details_update.forced_burn_time  + " to " +  forced_burn_time);
    }
    var historydata = {
      operation: "On device update",
      operation_by: "Admin",
      changes: JSON.stringify(changes)
    }
     history.create(historydata);
    return res.json({ message: 'Device details updated succesfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/devicedetailslist', async (req, res) => {
  try {
    const devicelist = await device_details.findAll({order: [
      ['serial_number', 'DESC']
  ],})
    return res.json(devicelist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/devicefilter', async (req, res) => {
  try {
    const  {serial_number,project,model} = req.body;
    const queryParams = {
 
  where: {
   [Op.or]: [{ serial_number: serial_number }, { project: project }, { model: model }],
  },
 };
    const devicelist = await device_details.findAll(queryParams)
    console.log(devicelist)
    return res.json(devicelist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
app.delete('/deletedevice/:serial_number', async (req, res) => {
  const serial_number = req.params.serial_number;
  console.log(serial_number);

  try {
     const device = await device_details.findOne({ where: { serial_number } })
     var changes = [];
       changes.push("Device deleted: "+ device.name  + " , Serial number:  " + device.serial_number);     
     var historydata = {
      operation: "On Delete",
      operation_by: "Admin",
      changes: JSON.stringify(changes)
    }
     history.create(historydata);
    await device.destroy()
     res.json({ message: 'Device deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/bulkdelete', async (req, res) => {
  try {
    await device_details.destroy({ where: { serial_number: req.body.serial_number }})
    var historydata = {
      operation: "On Bulk Delete",
      operation_by: "Admin",
      changes: JSON.stringify(req.body.serial_number)
    }
     history.create(historydata);
     res.json({ message: 'Device deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
module.exports = app;