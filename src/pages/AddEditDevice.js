import React, { Component } from "react";
import { apiConstants } from "../API/apiConstrants";
import Swal from "sweetalert2";
// import { redirect as Redirect } from 'react-router';
import DatepickerComponent from "./DatepickerComponent,js";

class AddEditDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serial_number: this.props.serial_number,
      customer: this.props.customer,
      name: this.props.name,
      state: this.props.state,
      city: this.props.city,
      project: this.props.project,
      site: this.props.site,
      model: this.props.model,
      shiped_on: this.props.shiped_on,
      installed_on: this.props.installed_on,
      warranty_valid: this.props.warranty_valid,
      unit_price: this.props.unit_price,
      min_temp_a: this.props.min_temp_a,
      max_temp_a: this.props.max_temp_a,
      min_temp_b: this.props.min_temp_b,
      max_temp_b: this.props.max_temp_b,
      spiral_a_max_qty: this.props.spiral_a_max_qty,
      spiral_b_max_qty: this.props.spiral_b_max_qty,
      max_door_count: this.props.max_door_count,
      max_burn_time: this.props.max_burn_time,
      forced_burn_time: this.props.forced_burn_time,
      errors: {},
      redirect: false,
      selectedDate:"2015-04-14",
    };
    

    this.handleChange = this.handleChange.bind(this);
    this.addeditdevice = this.addeditdevice.bind(this);

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  showAlert = () => {
   
    Swal.fire({
        position: 'top-end',
        text: "Device details added successful",
        icon: "success",
        confirmButtonText: "OK",
        showConfirmButton: false,
    timer: 1500
      });
}
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      Swal.fire({
        title: 'Do you want to save the device details?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          let method;
          method = "POST";
          let APIURL  = apiConstants.REGISTRATION_URL;
         if (this.props.serial_number) {
          method = "PUT";
          APIURL = apiConstants.DEVICEUPDATE_URL+this.props.serial_number;
         }
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var body = JSON.stringify({
            customer: this.state.customer,
            name: this.state.name,
            state: this.state.state,
            city: this.state.city,
            project: this.state.project,
            site: this.state.site,
            model: this.state.model,
            shiped_on: this.state.shiped_on,
            installed_on: this.state.installed_on,
            warranty_valid: this.state.warranty_valid,
            unit_price: this.state.unit_price,
            min_temp_a: this.state.min_temp_a,
            max_temp_a: this.state.max_temp_a,
            min_temp_b: this.state.min_temp_b,
            max_temp_b: this.state.max_temp_b,
            spiral_a_max_qty: this.state.spiral_a_max_qty,
            spiral_b_max_qty: this.state.spiral_b_max_qty,
            max_door_count: this.state.max_door_count,
            max_burn_time: this.state.max_burn_time,
            forced_burn_time: this.state.forced_burn_time,
          });
          // alert(body);
          var requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: "follow",
          };
    
          fetch(APIURL, requestOptions)
            .then((response) => response.text())
            .then((result) => this.showAlert() )
            .catch((error) => console.log("error", error));

          Swal.fire({
            position: 'top-end',
            text: "Device details added successful",
            icon: "success",
            confirmButtonText: "OK",
            showConfirmButton: false,
        timer: 1500
          });

        } else if (result.isDenied) {
          Swal.fire('device details are not saved', '', 'info')
        }

      })
      this.props.loaddevicedata();
      this.props.closeModal();

  }
  };
  validate(){
    let errors = {};
    let isValid = true;
    if (!this.state.customer) {
      isValid = false;
      errors["customer"] = "Customer field maindatory";
    }
    if (!this.state.name) {
      isValid = false;
      errors["name"] = "This field is required";
    }
    if (!this.state.state) {
      isValid = false;
      errors["state"] = "This field is required";
    }
    if (!this.state.city) {
      isValid = false;
      errors["city"] = "This field is required";
    }
    if (!this.state.project) {
      isValid = false;
      errors["project"] = "This field is required";
    }
    if (!this.state.site) {
      isValid = false;
      errors["site"] = "This field is required";
    }
    if (!this.state.model) {
      isValid = false;
      errors["model"] = "This field is required";
    }
    if (!this.state.shiped_on) {
      isValid = false;
      errors["shiped_on"] = "This field is required";
    }
    if (!this.state.installed_on) {
      isValid = false;
      errors["installed_on"] = "This field is required";
    }
        if (!this.state.warranty_valid) {
      isValid = false;
      errors["warranty_valid"] = "This field is required";
    }
        if (!this.state.unit_price) {
      isValid = false;
      errors["unit_price"] = "This field is required";
    }
        if (!this.state.min_temp_a) {
      isValid = false;
      errors["min_temp_a"] = "This field is required";
    }
    if (!this.state.max_temp_a) {
      isValid = false;
      errors["max_temp_a"] = "This field is required";
    }
    if (!this.state.min_temp_b) {
      isValid = false;
      errors["min_temp_b"] = "This field is required";
    }
    if (!this.state.max_temp_b) {
      isValid = false;
      errors["max_temp_b"] = "This field is required";
    }
    if (!this.state.spiral_a_max_qty) {
      isValid = false;
      errors["spiral_a_max_qty"] = "This field is required";
    }
    if (!this.state.spiral_b_max_qty) {
      isValid = false;
      errors["spiral_b_max_qty"] = "This field is required";
    }

    if (!this.state.max_door_count) {
      isValid = false;
      errors["max_door_count"] = "This field is required";
    }
    if (!this.state.max_burn_time) {
      isValid = false;
      errors["max_burn_time"] = "This field is required";
    }
    if (!this.state.forced_burn_time) {
      isValid = false;
      errors["forced_burn_time"] = "This field is required";
    }
    this.setState({
      errors: errors
    });
    return isValid;
}

  addeditdevice(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  formheadertitle (serial_number) {
    if (serial_number) {
        
    } else {
      return <div className="addeditformheader card-header text-center pt-4">
      <h5 className="mb-1">REGISTER DEVICE DETAILS</h5>
    </div>;
    }
  }
  render() {
    return (
       <div>
         <div className="row machinelistarea">
          <div className="col-xl-12 col-lg-12 col-md-12 mx-auto">
            <div className="card z-index-0">
             
              {this.formheadertitle(this.state.serial_number)}
             
              <div className="card-body">
                <form role="form text-left" id="devicedetailform" onSubmit={this.handleSubmit}>
                 <div className="row">
                 <div className="col-md-3">
                
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Customer</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.customer}
                            id="customer" className="form-control" name="customer" placeholder="Customer" aria-label="Customer" aria-describedby="customer-addon" />
                            <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.customer}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Name</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.name}
                            id="name" className="form-control" name="name" placeholder="Name" aria-label="Name" aria-describedby="name-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.name}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">State</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.state}
                            id="state" className="form-control" name="state" placeholder="State" aria-label="State" aria-describedby="state-addon" />
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.state}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">City</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.city}
                            id="city" className="form-control" name="city" placeholder="City" aria-label="City" aria-describedby="city-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.city}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Project</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.project}
                            id="project" className="form-control" name="project" placeholder="Project" aria-label="Project" aria-describedby="project-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.project}
                                  </div>
                  </div>
                  </div>
                  <div className="col-md-3">
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Site</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.site}
                            id="site" className="form-control" name="site" placeholder="Site" aria-label="Site" aria-describedby="site-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.site}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Model</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.model}
                            id="model" className="form-control" name="model" placeholder="Model" aria-label="Model" aria-describedby="model-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.model}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Shipped on</h6>
                  <DatepickerComponent selectedValue={this.state.shiped_on} id={'shiped_on'} name={'shiped_on'} onChange={this.handleChange}/>

                   
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.shiped_on}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Installed on</h6>
                  <DatepickerComponent selectedValue={this.state.installed_on} id={'installed_on'} name={'installed_on'} onChange={this.handleChange}/>
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.installed_on}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Warranty Valid</h6>
                  <DatepickerComponent selectedValue={this.state.warranty_valid} id={'warranty_valid'} name={'warranty_valid'} onChange={this.handleChange}/>

                    
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.warranty_valid}
                                  </div>
                  </div>
                 
                  </div>
                  <div className="col-md-3">
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Unit Price</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.unit_price}
                            id="unit_price" className="form-control" name="unit_price" placeholder="Unit Price" aria-label="Unit Price" aria-describedby="unit_price-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.unit_price}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Min Temp A</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.min_temp_a}
                            id="min_temp_a" className="form-control" name="min_temp_a" placeholder="Min Temp A " aria-label="Min Temp A " aria-describedby="min_temp_a-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.min_temp_a}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Max Temp A</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.max_temp_a}
                            id="max_temp_a" className="form-control" name="max_temp_a" placeholder="Max Temp A" aria-label="Max Temp A" aria-describedby="max_temp_a-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.max_temp_a}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Min Temp B</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.min_temp_b}
                            id="min_temp_b" className="form-control" name="min_temp_b" placeholder="Min Temp B " aria-label="Min Temp B " aria-describedby="min_temp_b-addon" />
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.min_temp_b}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Max Temp B</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.max_temp_b}
                            id="max_temp_b" className="form-control" name="max_temp_b" placeholder="Max Temp B" aria-label="Max Temp B" aria-describedby="max_temp_b-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.max_temp_b}
                                  </div>
                  </div>
                  
                  
                  </div>
                  <div className="col-md-3">
                  
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Spiral A Max Qty</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.spiral_a_max_qty}
                            id="spiral_a_max_qty" className="form-control" name="spiral_a_max_qty" placeholder="Spiral A Max Qty " aria-label="Spiral A Max Qty " aria-describedby="spiral_a_max-addon" />
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.spiral_a_max_qty}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Spiral B Max Qty</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.spiral_b_max_qty}
                            id="spiral_b_max_qty" className="form-control" name="spiral_b_max_qty" placeholder="Spiral B Max Qty" aria-label="Spiral B Max Qty" aria-describedby="spiral_b_max-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.spiral_b_max_qty}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Max Door Count </h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.max_door_count}
                            id="max_door_count" className="form-control" name="max_door_count" placeholder="Max Door Count " aria-label="max_door_count" aria-describedby="max_door_count-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.max_door_count}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Max Burn Time</h6>
                    <input type="number" onChange={this.handleChange}
                            value={this.state.max_burn_time}
                            id="max_burn_time" className="form-control" name="max_burn_time" placeholder="Max Burn Time" aria-label="Max Burn Time" aria-describedby="email-addon" />
                  <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.max_burn_time}
                                  </div>
                  </div>
                  <div className="mb-3">
                  <h6 className="text-uppercase text-body text-xs font-weight-bolder">Forced Burn Time</h6>
                    <input type="text" onChange={this.handleChange}
                            value={this.state.forced_burn_time}
                            id="forced_burn_time" className="form-control" name="forced_burn_time" placeholder="Forced Burn Time" aria-label="Forced Burn Time" aria-describedby="email-addon" />
                   <div className="text-danger">‏‏‎ ‎
                                    {this.state.errors.forced_burn_time}
                                  </div>
                  </div>
                  
                  </div>
                 </div>
                 <div className="col-xl-2 col-lg-3 col-md-5 mx-auto">
                  <div className="text-center">
                    <button type="submit"
                            id="form-submit" className="btn bg-gradient-dark w-100 ">Save device details</button>

                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
}

export default AddEditDevice;
