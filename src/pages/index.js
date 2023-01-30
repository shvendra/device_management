import React, { Component, Fragment } from "react";
import { apiConstants } from "../API/apiConstrants";
import AddEditDevice from "./AddEditDevice";
import ListTransaction from "./ListTransaction";
import Modal from "react-modal";
import List from "./list";
import Logs from "./logs";

import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: true,
      isOpenModel: false,
      isOpenModellogs: false,
      serial_number: '',
      project: '',
      model: '',
      devices: [],
      devicess: [],
      errors: {},
      filterstatus: false,
      totaldevices: 0,
      devicefilecsv: '',
      importType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addeditdevice = this.addeditdevice.bind(this);
    this.listpageopen = this.listpageopen.bind(this);
    this.transactionListModel = this.transactionListModel.bind(this);
    this.logsmodel = this.logsmodel.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.loaddevicedata = this.loaddevicedata.bind(this);
    this.maxSelectFile = this.maxSelectFile.bind(this);
    this.checkMimeType = this.checkMimeType.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this);
    this.handleexcelChange = this.handleexcelChange.bind(this);
    this.csvDownload = this.csvDownload.bind(this);
    this.loaddevicedata();
  }

  csvDownload = (e) => {
    if (this.state.importType) {
      if (this.state.importType === 'bulkadd') {fetch('addsample.csv').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'addsample.csv';
            alink.click();
        })
    })} else {fetch('updatesample.csv').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'updatesample.csv';
            alink.click();
        })
    })}
    

  } else {
    Swal.fire({
      position: 'top-end',
      text: "Please  chose one add or update !",
      icon: "error",
      confirmButtonText: "OK",
      showConfirmButton: false,
  timer: 1500
    });
  }
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    this.loaddevicedata();
  }
  closeModal() {
    this.setState({isOpenModel: false})
    this.setState({isOpenModellogs: false})
    this.loaddevicedata();


   }
  transactionListModel(serial_number, customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a, max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time)  {
    this.setState({isOpenModel: true})
  }
  logsmodel(serial_number, customer, name, state, city, project, site, model, shiped_on, installed_on, warranty_valid, unit_price, min_temp_a, max_temp_a, min_temp_b, max_temp_b, spiral_a_max_qty, spiral_b_max_qty, max_door_count, max_burn_time, forced_burn_time)  {
    this.setState({isOpenModellogs: true})
  }
  loaddevicedata = async(e) => {
    const result = await axios.get(
      apiConstants.DEVICELISTURL
    );
    // console.log(result.data.reverse())
    this.setState({ devicess:result.data })
    // setDevice(result.data.reverse());
    // setTotaldevice(result.data.length);
    // props.totaldevice(totaldevice); 
  };

  handleexcelChange = (e) => {
      Swal.fire({
        title: 'Do you want to perform multiple operations?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.maxSelectFile(e) && this.checkMimeType(e) && this.checkFileSize(e)) {
            if (e.target.files[0]) {
          const data = new FormData();
          data.append("file", e.target.files[0]);
          axios.post("http://localhost:3001/device_details/importdevice", data).then((res) => {
            this.loaddevicedata();
            Swal.fire({
              position: 'top-end',
              text: "Device details added successful",
              icon: "success",
              confirmButtonText: "OK",
              showConfirmButton: false,
          timer: 1500
            });
          });
            }
          }
        }
      })
   
  };
   maxSelectFile = (event) => {
    this.setState({devicefilecsv:event.target.files[0]});

    let files = event.target.files; // create file object
    if (files.length > 5) {
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };
   checkMimeType = (event) => {
    this.setState({devicefilecsv:event.target.files[0]});
    return true;
  };
   checkFileSize = (event) => {
    this.setState({devicefilecsv:event.target.files[0]});

    let files = event.target.files;
    let size = 15000000000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    if (err !== "") {
      event.target.value = null;
     console.log(err);
      // setimagemessage(err);
      return false;
    }
    return true;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
    let method;
    method = "POST";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify({
      serial_number: this.state.serial_number,
      project: this.state.project,
      model: this.state.model,

    });
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: body,
    };
    fetch(apiConstants.DEVICEFILTER_URL, requestOptions)
        .then((response) => response.json())
        .then((result) =>  this.setState({ devicess:result}))
        .catch((error) => console.log("error", error));
        console.log(this.state.devicess)
  }
  };
  validate(){
    let errors = {};
    let isValid = true;
    if (!this.state.serial_number && !this.state.project && !this.state.model ) {
      isValid = false;
      
      errors["filtererror"] = "One field is maindatory";
    }
    this.setState({
      errors: errors
    });
    return isValid;
  }
  addeditdevice() {
    this.setState({ showResults: false  })
  }
  listpageopen() {
    this.setState({ showResults: true  })
    this.loaddevicedata();

  }
  handletotal = (total) => {
      this.setState({totaldevices: total});
  }
  // componentDidMount() {
  //   this.loaddevicedata()

  // }
  render() {
    return (
      <Fragment>
        <span className="mask  opacity-6"></span>
        <main className="container-fluid main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <img
                  src="assets/img/logo-ct-dark.png"
                  className="navbar-brand-img h-100"
                  alt="main_logo"
                />
              </nav>
              <div
                className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
              >
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <div className="input-group"></div>
                </div>
                <ul className="navbar-nav  justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                  <div className="card shadow-none border h-100">
<div className="card-header bg-gradient-dark text-sm-start text-center pt-4 pb-3 px-4">
<h3 class="font-weight-bolder whitecolor">
Device Management
</h3>
</div>
<hr className="horizontal dark my-0" />
</div>
                  </li>

                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a
                      className="nav-link text-body p-0"
                      id="iconNavbarSidenav"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item px-3 d-flex align-items-center"></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                    <div className="card countarea">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total devices
                              </p>
                              <h5 className="font-weight-bolder mb-0">{this.state.totaldevices}</h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                              <i
                                className="ni ni-money-coins text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                    <div className="card countarea">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total models
                              </p>
                              <h5 className="font-weight-bolder mb-0">
                                0
                                </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                              <i
                                className="ni ni-world text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4  col-sm-6 mb-xl-0 mb-4">
                    <div className="card countarea">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total units
                              </p>
                              <h5 className="font-weight-bolder mb-0">0</h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                              <i
                                className="ni ni-paper-diploma text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-xl-12  ">
                  <div className="sidenav-footer mx-3 btn-outline-dark border-radius">
                    <div
                      className="card card-background shadow-none card-background-mask-secondary"
                      id="sidenavCard"
                    >
                      <div className="full-background bg-gray-900"></div>
                      <div className="card-body text-start p-3 w-100">
                        <div className="docs-info">
                          <div className="row">
                            <div className="col-md-6">  <p className="text-xs font-weight-bold">
                            <span className="btn btn-primary btn-file">
                         Browse <input id="file" type="file" name="file" onChange={this.handleexcelChange}/>
                          </span>

                          </p>
                          <p className="text-white up mb-0">Bulk device upload?</p>
</div>
                            <div className="col-md-6"> <a   onClick={this.csvDownload} className="btn btn-primary"><FontAwesomeIcon icon={faDownload} />  Sample Download</a>
<br/>
<input className="form-check-input ms-auto"
                type="radio"
                name="importType"
                value={'bulkadd'}
                onChange={this.handleChange}
              />  Add ‏‏‎ ‎
              <input className="form-check-input ms-auto"
                type="radio"
                name="importType"
                value={'bulkupdate'}
                onChange={this.handleChange}
              /> ‏‏‎ ‎Update 

</div>

                          </div>
                        

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              </div>
              <form role="form text-left" id="devicesearchform" onSubmit={this.handleSubmit}>

              <div className="row searcharea">
              <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.filtererror}
                                  </div>
              <div className="col-md-2">
                <div className="input-group">
                  <input
                  onChange={this.handleChange}
                    type="text"
                    name="serial_number"
                    className="form-control"
                    placeholder="Serial number"
                  />
                  
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-group">
                  <input
                    type="text"
                    name="project"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Project"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-group">
                  <input
                    type="text"
                    name="model"
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Model number"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <button
                    type="submit"
                    id="form-submit"
                    className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark searcbutton"
                  >
                    Search
                  </button>{" "}
                </div>
              </div>
               
              <div className="col-md-4">
                  
                    <div className="col-md-12">
                    <div className="row">

                      <div className="col-md-4">
                        <div className="input-group"><span className="input-group-text text-body">
                    <i className="fas fa-plus" aria-hidden="true"></i>
                  </span> <a onClick={this.addeditdevice}
                    
                    className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark searcbutton"
                  >
                    Add new
                  </a>{" "}</div>
                  </div>
                      <div className="col-md-2"><a  onClick={this.listpageopen}
                    
                    className="btn btn-sm mb-1 me-1 bg-gradient-dark searcbutton"
                  >
                     listing
                  </a>{" "}</div>
                      <div className="col-md-4"><a onClick={this.transactionListModel}
                    
                    className="btn btn-sm  mb-0 me-1 bg-gradient-dark searcbutton"
                  >
                    Transactions
                  </a>{" "}</div>
                  <div className="col-md-2"><a  onClick={this.logsmodel}
                    
                    className="btn btn-sm mb-1 me-1 bg-gradient-dark searcbutton"
                  >
                     Logs
                  </a>{" "}</div>
                </div>
                    </div>
                  </div>
               
            </div>
            </form>
  
            { this.state.showResults ?  <List totaldevice={this.handletotal} closeModal={this.closeModal} loaddevicedata={this.loaddevicedata} devices={this.state.devicess} filter={this.state.filterstatus}/> : <AddEditDevice closeModal={this.closeModal}  loaddevicedata={this.loaddevicedata} /> }
           
            <footer className="footer pt-3  ">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="copyright text-center text-sm text-muted text-lg-start">
                      All rights reserve
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link text-muted"
                          target="_blank"
                        >
                          About Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Modal
        isOpen={this.state.isOpenModel}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.closeModal}
        style={''}
      >
                {/* <h5 > <button onClick={this.closeModal} className="closebtn btn bg-gradient-dark ">close</button></h5> */}
              <ListTransaction checked="true"  closemodelbtn={this.closeModal} />
      </Modal>

      <Modal
        isOpen={this.state.isOpenModellogs}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.closeModal}
        style={''}
      >
                {/* <h5 > <button onClick={this.closeModal} className="closebtn btn bg-gradient-dark ">close</button></h5> */}
              <Logs checked="true"  closemodelbtn={this.closeModal} />
      </Modal>
        </main>
        <script src="assets/js/core/popper.min.js"></script>
        <script src="assets/js/core/bootstrap.min.js"></script>
        <script src="assets/js/plugins/perfect-scrollbar.min.js"></script>
        <script src="assets/js/plugins/smooth-scrollbar.min.js"></script>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <script src="assets/js/soft-ui-dashboard.min.js?v=1.0.7"></script>
      </Fragment>
    );
  }
}

export default Index;
