import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../src/Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import TourPackage from "./Components/TourPackage/TourPackage";
import AuthProvider from "./context/AuthProvider";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import NotFound from "./Components/NotFound/NotFound";
import SingleTourPackage from "./Components/SingleTourPackage/SingleTourPackage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyPackages from "./Components/MyPackages/MyPackages";
import ManageAllPackage from "./Components/ManageAllPackage/ManageAllPackage";
import AddPackage from "./Components/AddPackage/AddPackage";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/tour-packages">
              <TourPackage />
            </Route>
            <Route path="/about-us">
              <AboutUs />
            </Route>
            <Route path="/contact-us">
              <ContactUs />
            </Route>
            <PrivateRoute path="/registeredBooking/:emailId">
              <MyPackages />
            </PrivateRoute>
            <PrivateRoute path="/manageAllPackage">
              <ManageAllPackage />
            </PrivateRoute>
            <PrivateRoute path="/addPackage">
              <AddPackage />
            </PrivateRoute>
            <PrivateRoute path="/packages/:id">
              <SingleTourPackage />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
