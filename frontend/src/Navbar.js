import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import avater from "./images/pngwing.com.png";
import { animateScroll as scroll } from "react-scroll"; 

import "./Navbar.css";




function Navbar() {
  const [name, setName] = useState("")
    const history = useHistory();

 const [scrollNav, setScrollNav] = useState(false);

 const changeNav = () => {
   if (window.scrollY >= 80) {
     setScrollNav(true);
   } else {
     setScrollNav(false);
   }
 };

 useEffect(() => {
   window.addEventListener("scroll", changeNav);
 }, []);

 const toggleHome = () => {
   scroll.scrollToTop();
 };




  useEffect(() => {
    fetchUser();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const fetchUser = async () => {
    try {
      axios
        .get("http://localhost:3000/api/v1/tasks/user", config)
        .then((response) => {
          const data = response.data.username
          setName(data);
        
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

    const handleAutentication = () => {
      localStorage.clear();

      setName("");
     
      history.push("/");
    };
 
  return (
    <>
      <div className="nav">
        <div className="navbar__container">
          <Link to="/" className="nav__logo">
            <div  onClick={toggleHome}>Todo</div>
          </Link>
     
          <ul className="nav__menu">
            <li className="nav__item">
              <Link to="/" className="nav__links">
                <img src={avater} alt="" srcset="" />
                Hello {name ? name : "guest"}
              </Link>
            </li>
          </ul>
          <button className="nav__btn">
            <Link to={!name && "/login"} className="nav__btn__link">
              <div className="auth" onClick={handleAutentication}>
                <span> {name ? "Sign-Out" : "Sign-In"} </span>
              </div>
            </Link>
          </button>
        </div>
        <div className="sign__in__container">
          <Link to="/" className="nav__links">
            <img src={avater} alt="" srcset="" />
            Hello {name ? name : "guest"}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
