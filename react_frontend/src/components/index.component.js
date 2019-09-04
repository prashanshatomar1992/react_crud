import React, { Component } from "react";
import axios from "axios";
import TableRow from './TableRow';
export default class Index extends Component {
  state = {
    business: []
  };
  componentDidMount = () => {
    console.log('index di mount')
    axios
      .get("http://localhost:4000/business")
      .then(response => {
        console.log(response.data)
        this.setState({ business: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // tabRow = () => {
  //   return this.state.business.map((object, i) => {
  //     return <tr>
  //       <td>{object.person_name}</td>
  //       <td>{object.business_name}</td>
  //       <td>{object.business_gst_number}</td>
  //       </tr>;
  //   });
  // };
  tabRow = () =>{
    return this.state.business.map((object,i)=>{
      return <TableRow obj={object} key={object._id} />;
    })
  }
  render() {
    return (
      <div>
        <h3>Business List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Person</th>
              <th>Business</th>
              <th>GST Number</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
          
          {this.tabRow()}
          {/* {this.state.business.map((object,i)=>{
             <tr obj={object} key={i} />
          })} */}
          
          </tbody>
        </table>
      </div>
    );
  }
}
