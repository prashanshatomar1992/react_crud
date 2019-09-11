import React, { Component } from "react";
import axios from 'axios';
export default class Signup extends Component { 
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name:'',
            email:'',
            phone:'',
            password:''
        }
    }
    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangeEmail(e){
      this.setState({
        email: e.target.value
      })  
    }
    onChangePhone(e){
      this.setState({
        phone: e.target.value
      })
    }
    onChangePassword(e){
        this.setState({
          password: e.target.value
        })
      }
    onSubmit(e){
        e.preventDefault();
        console.log(`This value are  ${this.state.name}, ${this.state.email} ,${this.state.phone},${this.state.password}`)
        const obj = {
          name:this.state.name,
          email:this.state.email,
          phone:this.state.phone,
          password:this.state.password
        }
        axios.post('http://localhost:4000/user/add', obj)
        .then(res=>console.log(res)).catch(err=>{
          console.log(err)
        });
        this.setState({
            name:'',
            email:'',
            phone:'',
            password:''
        })
    }





  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <p>Welcome to Signup Component!!</p>
        <h3>Signup Here</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: {this.state.name}</label>
            <input type="text" className="form-control" 
            onChange={this.onChangeName} />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="text" className="form-control"  onChange={this.onChangeEmail} />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input type="text" className="form-control"  onChange={this.onChangePhone} />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="password" className="form-control"  onChange={this.onChangePassword} />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Signup"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
