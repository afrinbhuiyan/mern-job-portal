import React from "react";
import SearchBar from "../components/SearchBar";
import AllJobs from "./AllJobs";

const Home = () => {
  return (
    <div>
      <header className="bg-black bg-[url(/src/assets/header-blur-bg.png)] bg-no-repeat bg-left-top relative overflow-hidden z-50">
        <SearchBar />
      </header>
      <AllJobs/>
    </div>
  );
};

export default Home;
