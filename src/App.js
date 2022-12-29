import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import Home from "./Page/HomePage";
import Header from "./Component/Header";
import LoginPage from "./Page/LoginPage";
import UserPage from "./Page/UserPage";
import ListNamingPage from "./Page/ListNamingPage";
import ListMakingPage from "./Page/ListMakingPage";
import TestFormatPage from "./Page/TestFormatPage";
import TestPage from "./Page/TestPage";
import RightPage from "./Page/RightPage";
import WrongPage from "./Page/WrongPage";
import TestScorePage from "./Page/TestScorePage";
import DummyAPICall from "./Component/DummyAPICall";

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="UserPage" element={<UserPage />} />
            <Route path="ListNamingPage" element={<ListNamingPage />} />
            <Route path="ListMakingPage" element={<ListMakingPage />} />
            <Route path="TestFormatPage" element={<TestFormatPage />} />
            <Route path="TestPage" element={<TestPage />} />
            <Route path="RightPage" element={<RightPage />} />
            <Route path="WrongPage" element={<WrongPage />} />
            <Route path="TestScorePage" element={<TestScorePage />} />
            <Route path="*" element={"Nothing here!"} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
