import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { apiConstants } from "../API/apiConstrants";
import { tableCustomStyles } from './tableStyle.jsx';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const List = (props) => {
  const [devices, setDevice] = useState([]);
  useEffect(() => { 
    loaddevicedata();
  });

  const loaddevicedata = async () => {
    const result = await axios.get(
      apiConstants.DEVICETRANSACTION_URL
    );
    setDevice(result.data.reverse());
  };

  const columns = [
    {
      name: "S.No.",
      width: "100px",
      selector: (row) => row.id ,
      sortable: true,
      style: {
        background: "lightgrey",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Current temp A",
      selector: (row) => row.current_temp_a,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Current temp B",
      selector: (row) => row.current_temp_b,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Current door count",
      selector: (row) => row.current_door_count,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Life door count",
      selector: (row) => row.life_door_count ,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Current Qty",
      selector: (row) => row.current_qty,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Life Qty",
      selector: (row) => row.life_qty,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Current burn cycle",
      selector: (row) => row.current_burn_cycle,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Life burn cycle",
      selector: (row) => row.life_burn_cycle,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Last on time",
      selector: (row) => row.last_on_time,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Life off time",
      selector: (row) => row.last_of_time,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Last status",
      selector: (row) => row.last_status,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Status ",
      selector: (row) => row.status,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Status type",
      selector: (row) => row.status_type,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },{
      name: "Spiral A status",
      selector: (row) => row.spiral_a_status,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },{
      name: "Spiral B status",
      selector: (row) => row.spiral_b_status,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },{
      name: "Current cash",
      selector: (row) => row.current_cash,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },{
      name: "Life cash",
      selector: (row) => row.life_cash,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    }
  ];
  const tableData = {
    columns,
    devices,
  };

  // console.log(tableData);
  return (
<div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0 addeditformheader ">
              <h5>DEVICE TRANSACTION DETAILS  <button onClick={props.closemodelbtn} className="closebtn btn bg-gradient-dark ">close</button></h5>            </div>
            <div className="card-body px-0 pt-0 pb-2">
            <form role="form text-left" id="devicesearchform">
   {/* <div class="row searcharea">
   <div class="col-md-1">
         <div class="input-group"><input type="text" name="model" class="form-control" placeholder="S.N."/></div>
      </div>
      <div class="col-md-2">
         <div class="input-group"><input type="text" name="serial_number" class="form-control" placeholder="Start date time"/></div>
      </div>
      <div class="col-md-2">
         <div class="input-group"><input type="text" name="project" class="form-control" placeholder="Stop date time"/></div>
      </div>
      <div class="col-md-1">
         <div class="input-group"><input type="text" name="model" class="form-control" placeholder="City"/></div>
      </div>
      <div class="col-md-2">
         <div class="input-group"><input type="text" name="model" class="form-control" placeholder="Location"/></div>
      </div>
      <div class="col-md-2">
         <div class="input-group"><input type="text" name="model" class="form-control" placeholder=" Project"/></div>
      </div>
      <div class="col-md-2">
         <div class="input-group"><span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span><button type="submit" id="form-submit" class="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark searcbutton">Search</button> </div>
      </div>
     
   </div> */}
</form>
              <div className="table-responsive p-0">
                {/* {console.log(devices)} */}
              {/* <DataTableExtensions {...tableData}> */}
        <DataTable
          columns={columns}
          data={devices}
          defaultSortFieldID={1}
          pagination
          searching={true}
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          customStyles={tableCustomStyles}
        />
      {/* </DataTableExtensions> */}


            </div>
            </div>
          <div>
          </div>
        </div>
      </div>
      </div>
  );
};
export default List;
