import React, { useState } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { apiConstants } from "../API/apiConstrants";
import { tableCustomStyles } from './tableStyle.jsx';
import AddEditDevice from "./AddEditDevice";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
Modal.setAppElement("#root");
const List = (props) => {
  const [EditmodalIsOpen, setIsOpeEditn] = React.useState(false);
  const [serial_number, setserial_number] = React.useState();
  const [customer, setcustomer] = React.useState();
  const [name, setname] = React.useState();
  const [state, setstate] = React.useState();
  const [city, setcity] = React.useState();
  const [model, setmodel] = React.useState();
  const [shiped_on, setshiped_on] = React.useState();
  const [warranty_valid, setwarranty_valid] = React.useState();
  const [unit_price, seunit_price] = React.useState();
  const [min_temp_a, setmin_temp_a] = React.useState();
  const [max_temp_a, setmax_temp_a] = React.useState();
  const [min_temp_b, setmin_temp_b] = React.useState();
  const [max_temp_b, setmax_temp_b] = React.useState();
  const [spiral_a_max_qty, setspiral_a_max_qty] = React.useState();
  const [spiral_b_max_qty, setspiral_b_max_qty] = React.useState();
  const [max_door_count, setmax_door_count] = React.useState();
  const [max_burn_time, setmax_burn_time] = React.useState();
  const [forced_burn_time, setforced_burn_time] = React.useState();
  const [installed_on, setinstalled_on] = React.useState();
  const [project, setproject] = React.useState();
  const [site, setsite] = React.useState();
  const [multipledeletebtn, setDletebtn] = React.useState();
  const [checkeddevice, setCheckedDevice] = useState([]);
  const customStylesEdit = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -60%)', 
    },
  };
  const closeModal = () => {
    setIsOpeEditn(false);
    props.loaddevicedata();
  }
  const bulkdevicedelete = () => {
    Swal.fire({
      title: 'Do you want to delete the device?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let method;
        method = "POST";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var body = JSON.stringify({
          serial_number: checkeddevice
        });
        var requestOptions = {
          method: method,
          headers: myHeaders,
          body: body,
        };
        await fetch(apiConstants.DELETE_MANY, requestOptions)
            .then((response) => response.json())
            .then((result) => 
            Swal.fire({
              position: 'top-end',
              text: "Device details deleted successful",
              icon: "success",
              confirmButtonText: "OK",
              showConfirmButton: false,
              timer: 1500
            }))
            .catch((error) => console.log("error", error));
            props.loaddevicedata();   
            setCheckedDevice(['']);
            setDletebtn('');
      } else if (result.isDenied) {
        Swal.fire('Device not deleted', '', 'info')
      }
    })
    props.loaddevicedata();   

  }

 


  const DeleteDevice = async(serial_number) => {
    Swal.fire({
      title: 'Do you want to delete the device?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await axios.delete(
          apiConstants.DELETEDEVICE_URL+serial_number
        );
        props.loaddevicedata();
        Swal.fire({
          position: 'top-end',
          text: "Device details deleted successful",
          icon: "success",
          confirmButtonText: "OK",
          showConfirmButton: false,
      timer: 1500
        });
    
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Device not deleted', '', 'info')
      }
    })
   
  
  }
  const EditopenModal = (serial_number, customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a, max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time) => {
    setinstalled_on(installed_on);
    setmax_burn_time(max_burn_time);
    setforced_burn_time(forced_burn_time);
    setmin_temp_b(min_temp_b);
    setmax_temp_b(max_temp_b);
    setspiral_a_max_qty(spiral_a_max_qty);
    setspiral_b_max_qty(spiral_b_max_qty);
    setmax_door_count(max_door_count);
    setshiped_on(shiped_on);
    setwarranty_valid(warranty_valid);
    seunit_price(unit_price);
    setstate(state);
    setmin_temp_a(min_temp_a);
    setmax_temp_a(max_temp_a);
    setserial_number(serial_number);
    setcustomer(customer);
    setname(name);
    setcity(city);
    setmodel(model);
    setproject(project);
    setsite(site);
    setIsOpeEditn(true);


  }
  const conditionalRowStyles = [
    {
      when: row => row.toggleSelected,
      style: {
        backgroundColor: "green",
        userSelect: "none"
      }
    }
  ];
  const handleRowClicked = row => {
     props.devices.map(item => {
      if (row.serial_number !== item.serial_number) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected
      };
    });
    EditopenModal(row.serial_number, row.customer, row.name, row.state, row.city, row.project, row.site, row.model, row.shiped_on, row.installed_on, row.warranty_valid, row.unit_price, row.min_temp_a, row.max_temp_a, row.min_temp_b, row.max_temp_b, row.spiral_a_max_qty, row.spiral_b_max_qty, row.max_door_count, row.max_burn_time, row.forced_burn_time)

  };
  const Deletebutton = (row) => {
    return <div onClick={() => DeleteDevice(row.serial_number)}>{row.serial_number} <FontAwesomeIcon icon={faTrash} /></div>;
};
  const EditAubutton = (row) => {
      return <div><div onClick={() => EditopenModal(row.serial_number, row.customer, row.name, row.state, row.city, row.project, row.site, row.model, row.shiped_on, row.installed_on, row.warranty_valid, row.unit_price, row.min_temp_a, row.max_temp_a, row.min_temp_b, row.max_temp_b, row.spiral_a_max_qty, row.spiral_b_max_qty, row.max_door_count, row.max_burn_time, row.forced_burn_time)}   className=" editbtn"><FontAwesomeIcon icon={faPen} /></div> | <div type="button" className=" deletebtn" onClick={() => DeleteDevice(row.serial_number)}><FontAwesomeIcon icon={faTrash} /></div></div>;
  };
  

  const handleCheckbox = ({target: {checked, value}}) => {
    

    if (checked) {
      checkeddevice.push(value);
  } else {
      var index = checkeddevice.indexOf(value);
      if (index > -1) {
        checkeddevice.splice(index, 1);
      }
};
setCheckedDevice(checkeddevice);
console.log(checkeddevice);
if (checkeddevice.length > 1) {
  setDletebtn(<div><a onClick={() => bulkdevicedelete()} class="btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><FontAwesomeIcon icon={faTrash} />Delete</a></div>);
} else {
  setDletebtn('');

}
  }
  const columns = [
    {
      name: "",
      cell: (row) => (
        <div className="App">
          <div className="openbtn text-center">
          <div><input type="checkbox" onChange={handleCheckbox} name={"serial"+row.serial_number} value={row.serial_number} /></div>
          </div>
        </div>
      ),
      width: "50px",
      selector: (row) => row.serial_number ,
      sortable: true,
      style: {
        background: "lightgrey",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "S.No.",
      cell: (row) => (
        <div className="App">
          <div className="openbtn text-center">
           {Deletebutton(row)}
          </div>
        </div>
      ),
      width: "100px",
      selector: (row) => row.serial_number ,
      sortable: true,
      style: {
        background: "lightgrey",
        fontSize: '17px',
        fontWeight: "bold"
      },
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Project",
      selector: (row) => row.project,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Site",
      selector: (row) => row.site,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Shipped on ",
      selector: (row) => row.shiped_on,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Installed on ",
      selector: (row) => row.installed_on,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Auction Start Time",
      selector: (row) => row.warranty_valid,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Unit Price ",
      selector: (row) => row.unit_price,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      name: "Min Temp A",
      selector: (row) => row.min_temp_a,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Max Temp A",
      selector: (row) => row.max_temp_a,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Min Temp B",
      selector: (row) => row.min_temp_b,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Max Temp B",
      selector: (row) => row.max_temp_b,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Spiral A Max Qty",
      selector: (row) => row.spiral_a_max_qty,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Spiral B Max Qty ",
      selector: (row) => row.spiral_b_max_qty,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Max Door Count",
      selector: (row) => row.max_door_count,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Max Burn Time ",
      selector: (row) => row.max_burn_time,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },{
      name: "Forced Burn Time",
      selector: (row) => row.forced_burn_time,
      sortable: true,
      style: {
        background: "#e6f5ff",
        fontSize: '15px',
        fontWeight: "bold"
      },
    },
    {
      right: true,
      name: "Action",
      cell: (row) => (
        <div className="App">
          <div className="openbtn text-center">
           {EditAubutton(row)}
          </div>
        </div>
      ),
      style: {
        background: "#e6f5ff",
      },
    }
  ];

  return (
<div className="row machinelistarea">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0 addeditformheader ">
              <div className="row">
                <div className="col-md-10"><h5>DEVICE DETAILS LISTING</h5></div>
                <div className="col-md-2">{ checkeddevice.length > 0 ?   multipledeletebtn : '' }</div>

              </div>

            </div>
           
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
            <DataTable
              columns={columns}
              data={props.devices}
              defaultSortFieldID={1}
              pagination
              onRowClicked={handleRowClicked}
              conditionalRowStyles={conditionalRowStyles}
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
      
      <Modal
        isOpen={EditmodalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesEdit}
        contentLabel="Example Modal"
      >
                    
<div className="modelindex">
  <div className="addeditformheader card-header text-center pt-4">
                <h5 >EDIT DEVICE DETAILS <button onClick={closeModal} className="closebtn btn bg-gradient-dark ">close</button></h5>
              </div>
<AddEditDevice checked="true"  serial_number={serial_number} customer={customer} name={name} state={state} city={city} project={project} site={site} model={model} shiped_on={shiped_on} installed_on={installed_on} warranty_valid={warranty_valid} unit_price={unit_price} min_temp_a={min_temp_a} max_temp_a={max_temp_a} min_temp_b={min_temp_b} max_temp_b={max_temp_b} spiral_a_max_qty={spiral_a_max_qty} spiral_b_max_qty={spiral_b_max_qty} max_door_count={max_door_count} max_burn_time={max_burn_time} forced_burn_time={forced_burn_time} closeModal={props.closeModal}  loaddevicedata={props.loaddevicedata} />
</div>
      </Modal>
      </div>
  );
};
export default List;
