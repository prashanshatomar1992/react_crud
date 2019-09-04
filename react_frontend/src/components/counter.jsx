import React, { Component } from "react";
class Counter extends Component {
  // state = {
  //   count: this.props.counter.value,//this.props.value, //0,
  //   tags: ["tag1", "tag2", "tag3"]
  // };
  styles = { fontSize: "15px", fontWeight: "bold" };
  //function without parameters
  handleIncrement1 = () => {
    console.log("event clicked", this.state.count);
    this.setState({ count: this.state.count + 1 });
  };
  renderTags() {
    if (this.props.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {this.props.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
 

  //function with parameters
  // handleIncrement = product => {
  //   console.log("event clicked", this.state.count);
  //   console.log("product argument  ", product);

  //   this.setState({ count: this.state.count + 1 });
  // };
  doHandleIncrement = () => {
    this.handleIncrement({ id: 1 });
  };
  // handleDelete = () => {
  //   console.log("event handler delete clicked");
  //   // console.log("product argument  ", product);
  //   this.setState({count : this.state.count+1});
  // };
  render() {
    console.log("props  ", this.props);

    let classes = this.getBadgeClasses();
    return (
      <div>
        {/* here this.props.children is use to pass the children html from calling component  */}
        {this.props.children}
        {this.props.id}
        <span style={this.styles} className={classes}>
          {this.formatCount()}
        </span>
        <button
          // onClick={() => this.handleIncrement({ id: 2 })}
          onClick={()=> this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment3
        </button>
        {/* {this.state.tags.length === 0 && "Please create a new tag"} */}
        {/* {this.state.tags.length === 0 && "Please create a new tag"} */}

        {/* {this.renderTags()} */}
        <button
          // onClick={this.handleDelete}
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    // classes += this.state.count === 0 ? "warning" : "primary";'
    classes += this.props.counter.count === 0 ? "warning" : "primary";

    return classes;
  }
  formatCount() {
    // const { count } = this.state;
    const { count } = this.props.counter
    return count === 0 ? <h5>Zero</h5> : count;
  }
}
export default Counter;
