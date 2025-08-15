import React from "react";
import Section1 from "../components/Home/Section1";
import ConsultDoctors from "../components/Home/ConsultDoctors";
import ContactUs from "../components/Home/ContactUs";

const Home = () => {
  return (
    <div className=" ">
      <Section1 />
      <ConsultDoctors />
      <ContactUs />
    </div>
  );
};

export default Home;
