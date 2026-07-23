// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
    });
  };

  componentDidMount () {
    console.log(" componentDidMount");
    // runs after first render => RETRIEVE DATA FROM BACKEND SERVER
  }

  componentWillUnmount () {
    console.log("componentWillUnmount");
    // runs before component unmount
  } 

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;

/**

 Reactni 3 xil lifecycle methodlari bor:                               lifecycle or phases  
      1. componentDidMount -- sahifa ishga tushganda ishlaydi. RETRIEVE from backend. birinchi backend dan malumotlarimizni olib kelish uchun va uni frontendda foydalaniladi
      2. componentDidUpdate -- sahifada update bulganda ishga tushadi, shu payti virtual dom real domni rebuild qilib oladi
      3.componentWillUnmount -- vazifasi tugashidan oldin ishga tushadi, boshqa sahifaga utganda yakunlanadi, 


//  hook lar orqali react class ichidagai state va methodlarni suniy react function ichida qurib olsa bular ekan.
Hook (ilgak) bu qarmoqga uxshash ilgak ekan reactda biron uzgarish bulsa signal borar ekan va methodlar ishga tushadi 


  useState hook -- bu react function ichida suniy state hosil qilib beradi.


  useEffect -- bu lifecycle ning 3 xil phase ni tashkil qilib beradigan hook hisoblanadi


 */


  /**
      Redux architectore  




   */