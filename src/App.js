import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      mode: "light",
      progress : 0,
    };
  }

  setProgress = (loader) => {
    this.setState({progress : loader})
  }

  toggleMode = () => {
    if (this.state.mode === "light") {
      this.setState({ mode: "dark" });
      document.body.style.backgroundColor = "#050100";
      document.body.style.color = "white";
      document.getElementById("textMode").innerHTML = "Enable Light Mode";
    } else {
      this.setState({ mode: "light" });
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      document.getElementById("textMode").innerHTML = "Enable Dark Mode";
    }
  };

  render() {
    return (
      <>
        <BrowserRouter>
   
          <Navbar toggleMode={this.toggleMode} mode={this.state.mode} />
     <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       height={2}
      
      />
          <Routes>

          <Route
              exact
              path="/"
              element={
                <News setProgress={this.setProgress} key="goNews" mode={this.state.mode} category="general" goNews="Latest" country="us" />
              }
            ></Route>

            <Route
              exact
              path="general"
              element={
                <News setProgress={this.setProgress} key="general" mode={this.state.mode} category="general" goNews="general" country="us" />
              }
            ></Route>

            <Route
              exact
              path="business"
              element={
                <News setProgress={this.setProgress} key="business" mode={this.state.mode} category="business" goNews="business" country="us" />
              }
            ></Route>

            <Route
              exact
              path="sports"
              element={
                <News setProgress={this.setProgress} key="sports" mode={this.state.mode} category="sports" goNews="sports" country="us" />
              }
            ></Route>

            <Route
              exact
              path="science"
              element={
                <News setProgress={this.setProgress} key="science" mode={this.state.mode} category="science" goNews="science" country="us" />
              }
            ></Route>

            <Route
              exact
              path="entertainment"
              element={
                <News setProgress={this.setProgress} key="entertainment"
                  mode={this.state.mode}
                  category="entertainment"
                  goNews="entertainment"
                  country="us"
                />
              }
            ></Route>

            <Route
              exact
              path="health"
              element={
                <News setProgress={this.setProgress} key="health" mode={this.state.mode} category="health" goNews="health" country="us" />
              }
            ></Route>

            <Route
              exact
              path="technology"
              element={
                <News setProgress={this.setProgress} key="technology"
                  mode={this.state.mode}
                  category="technology"
                  goNews="technology"
                  country="us"
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
