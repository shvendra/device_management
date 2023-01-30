import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { apiConstants } from "../API/apiConstrants";
import { tableCustomStyles } from './tableStyle.jsx';
const Logs = (props) => {
  const [devices, setDevice] = useState([]);
  useEffect(() => { 
    loaddevicedata();
  });

  const loaddevicedata = async () => {
    const result = await axios.get(
      apiConstants.HISTORY_URL
    );
    console.log(result.data.reverse())
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
      name: "Operation on",
      width: "400px",
      selector: (row) => row.operation,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Modification By",
      width: "200px",
      selector: (row) => row.operation_by,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
        name: "Changes",
        width: "500px",
        cell: (row) => (
            <div className="App">
              <div className="openbtn text-center">
               <textarea className="form-control textarea" rows="2" cols="50">{row.changes.toString()}</textarea>
              </div>
            </div>
          ),
        selector: (row) => row.changes,
        sortable: true,
        style: {
          background: "#e6f5ff",
          fontSize: '17px',
          fontWeight: "bold"
        },
      },
      {
        name: "Date/Time",
        width: "300px",
        selector: (row) => row.updatedAt,
        sortable: true,
        style: {
          background: "#e6f5ff",
          fontSize: '17px',
          fontWeight: "bold"
        },
      },
  
    
  ];

  return (
<div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0 addeditformheader ">
              <h5>USER ACTIVITY LOGS  <button onClick={props.closemodelbtn} className="closebtn btn bg-gradient-dark ">close</button></h5>            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
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
            </div>
            </div>
          <div>
          </div>
        </div>
      </div>
      </div>
  );
};
export default Logs;
