/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useEffect,useState } from "react";
import "./Home.css";
import axios from "axios"
export default function Home() {
  const videoRef = useRef(null);
 const [selectedDay, setSelectedDay] = useState("monday");
 const [scheduleData, setScheduleData] = useState([]);
 
  useEffect(() => {
    const video = videoRef.current;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
  }, []);
const handleDaySelect = (day) => {
  setSelectedDay(day);
};
const fetchScheduleData = () => {
  axios
    .get("https://royalfitness.onrender.com/api/submit-form/schedule/get")
    .then((response) => setScheduleData(response.data.newFormData))
    .catch((error) => console.error("Error fetching data:", error));
};
// Sample data (you can replace this with your actual data)
useEffect(() => {
  fetchScheduleData();
}, []);


  return (
    <div>
      <div className="main-banner" id="top">
        <video
          ref={videoRef}
          src="../assests/images/gym-video.mp4"
          id="bg-video"
        />
        <div className="video-overlay header-text">
          <div className="caption">
            <h6>TRAVAILLER PLUS DUR, DEVENIR PLUS FORT</h6>
            <h2>
              FACILE AVEC NOTRE <em>gym</em>
            </h2>
            <div className="main-button scroll-to-section">
              <a href="#features">DEVENIR MEMBRE</a>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h2>
                  CHOISISSEZ<em>LE PROGRAMME</em>
                </h2>
                <img src="../assests/images/line-dec.png" alt="waves" />
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="features-items">
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="../assests/images/features-first-icon.png"
                      alt="First One"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Cours Physique</h4>
                    <p>
                      Please do not re-distribute this template ZIP file on any
                      template collection website. This is not allowed.
                    </p>
                    <a href="#schedule" className="text-button">
                      Discover More
                    </a>
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="../assests/images/features-first-icon.png"
                      alt="second one"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Musculation</h4>
                    <p>
                      If you wish to support TemplateMo website via PayPal,
                      please feel free to contact us. We appreciate it a lot.
                    </p>
                    <a href="#schedule" className="text-button">
                      Discover More
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="features-items">
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="../assests/images/features-first-icon.png"
                      alt="fourth muscle"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Cours Taekwondo</h4>
                    <p>
                      You may want to browse through
                      Digital Marketing
                    </p>

                    <a href="#schedule" className="text-button">
                      Discover More
                    </a>
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="../assests/images/features-first-icon.png"
                      alt="training fifth"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Cours Boxe</h4>
                    <p>
                      This template is built on Bootstrap v4.3.1 framework. It
                      is easy to adapt the columns and sections.
                    </p>
                    <a href="#" className="text-button">
                      Discover More
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <>
        {/* ***** Main Banner Area End ***** */}

        {/* ***** Call to Action Start ***** */}
        <section className="section" id="call-to-action">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="cta-content">
                  <h2>
                    NE <em>PENSEZ</em>Pas, COMMENCEZ <em>DÈS AUJOURD'HUI </em>!
                  </h2>

                  <div className="main-button scroll-to-section">
                    <a href="#our-classes">Devenir a member</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Call to Action End ***** */}

        {/* ***** Our Classes Start ***** */}
        <section className="section" id="our-classes">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="section-heading">
                  <h2>
                    Nous <em>Classes</em>
                  </h2>
                  <img src="../assests/images/line-dec.png" alt="" />
                </div>
              </div>
            </div>
            <div className="row" id="tabs">
              <div className="col-lg-4 ">
                <ul id="nav-tab" role="tablist">
                  <li
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#First_Training"
                    role="tab"
                    className="tabs-1 active"
                    aria-controls="nav-home"
                    aria-selected="true">
                    <a href="#tabs-1">
                      <img
                        src="../assests/logo/gym.png"
                        alt="gym"
                        className="logocl"
                      />
                      Musculation
                    </a>
                  </li>
                  <li
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Second_Training"
                    type="button"
                    className="tabs-2"
                    role="tab"
                    aria-controls="nav-Second_Training"
                    aria-selected="false">
                    <a href="#tabs-2">
                      <img
                        src="../assests/logo/des-exercices-detirement.png"
                        alt=""
                        className="logocl"
                      />
                      Cardio
                    </a>
                  </li>
                  <li
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    className="tabs-3"
                    data-bs-target="#Third_Training"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false">
                    <a href="#tabs-3">
                      <img
                        src="../assests/logo/gants-de-boxe (1).png"
                        alt=""
                        className="logocl"
                      />
                      Boxe
                    </a>
                  </li>
                  <li
                    id="nav-Fourth_Training"
                    data-bs-toggle="tab"
                    className="tabs-4"
                    data-bs-target="#Fourth_Training"
                    type="button"
                    role="tab"
                    aria-controls="Fourth_Training"
                    aria-selected="false">
                    <a href="#tabs-4">
                      <img
                        src="../assests/logo/karate.png"
                        alt=""
                        className="logocl"
                      />
                      taekwondo
                    </a>
                  </li>
                  <div className="main-rounded-button">
                    <a href="#schedule">View All Schedules</a>
                  </div>
                </ul>
              </div>
              <div className="col-lg-8">
                <section className="tab-content" id="pills-tabContent">
                  <article
                    id="First_Training"
                    className="tab-pane show active"
                    role="tabpanel"
                    aria-labelledby="First_Training"
                    tabindex="0">
                    <img
                      src="../assests/images/training-image-01.jpg"
                      alt="First Class"
                    />
                    <h4>First Training Class</h4>
                    <p>
                      Phasellus convallis mauris sed elementum vulputate. Donec
                      posuere leo sed dui eleifend hendrerit. Sed suscipit
                      suscipit erat, sed vehicula ligula. Aliquam ut sem
                      fermentum sem tincidunt lacinia gravida aliquam nunc.
                      Morbi quis erat imperdiet, molestie nunc ut, accumsan
                      diam.
                    </p>
                    <div className="main-button">
                      <a href="#">View Schedule</a>
                    </div>
                  </article>
                  <article
                    id="Second_Training"
                    role="tabpanel"
                    className="tab-pane"
                    aria-labelledby="pills-profile-tab"
                    tabindex="0">
                    <img
                      src="../assests/images/training-image-02.jpg"
                      alt="Second Training"
                    />
                    <h4>Second Training Class</h4>
                    <p>
                      Integer dapibus, est vel dapibus mattis, sem mauris luctus
                      leo, ac pulvinar quam tortor a velit. Praesent ultrices
                      erat ante, in ultricies augue ultricies faucibus. Nam
                      tellus nibh, ullamcorper at mattis non, rhoncus sed massa.
                      Cras quis pulvinar eros. Orci varius natoque penatibus et
                      magnis dis parturient montes, nascetur ridiculus mus.
                    </p>
                    <div className="main-button">
                      <a href="#">View Schedule</a>
                    </div>
                  </article>
                  <article
                    id="Third_Training"
                    role="tabpanel"
                    className="tab-pane"
                    aria-labelledby="pills-contact-tab"
                    tabindex="0">
                    <img
                      src="https://contents.mediadecathlon.com/b71980/k$c04c4f84ab46498a851b34b5909af746/1920x0/2880pt1920/5760xcr2304/BOXE.jpg?format=auto"
                      width="730"
                      height="310"
                      className=" object-fit-contain"
                      alt="Third Class"
                    />
                    <h4>Third Training Class</h4>
                    <p>
                      Fusce laoreet malesuada rhoncus. Donec ultricies diam
                      tortor, id auctor neque posuere sit amet. Aliquam
                      pharetra, augue vel cursus porta, nisi tortor vulputate
                      sapien, id scelerisque felis magna id felis. Proin neque
                      metus, pellentesque pharetra semper vel, accumsan a neque.
                    </p>
                    <div className="main-button">
                      <a href="#schedule">View Schedule</a>
                    </div>
                  </article>
                  <article
                    className="tab-pane"
                    id="Fourth_Training"
                    role="tabpanel"
                    aria-labelledby="Fourth_Training"
                    tabindex="0">
                    <img
                      src="../assests/images/training-image-04.jpg"
                      alt="Fourth Training"
                    />
                    <h4>Fourth Training Class</h4>
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Aenean ultrices
                      elementum odio ac tempus. Etiam eleifend orci lectus, eget
                      venenatis ipsum commodo et.
                    </p>
                    <div className="main-button">
                      <a href="#">View Schedule</a>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Our Classes End ***** */}
        <section className="section" id="schedule">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="section-heading dark-bg text-danger text-center">
                  <h2>
                    Classes <em>Schedule</em>
                  </h2>
                  <img src="../assests/images/line-dec.png" alt="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="filters">
                  <ul className="schedule-filter">
                    <li
                      className={selectedDay === "monday" ? "active" : ""}
                      onClick={() => handleDaySelect("monday")}>
                      Lundi
                    </li>
                    <li
                      className={selectedDay === "tuesday" ? "active" : ""}
                      onClick={() => handleDaySelect("tuesday")}>
                      Mardi
                    </li>
                    <li
                      className={selectedDay === "wednesday" ? "active" : ""}
                      onClick={() => handleDaySelect("wednesday")}>
                      Mercredi
                    </li>
                    <li
                      className={selectedDay === "thursday" ? "active" : ""}
                      onClick={() => handleDaySelect("thursday")}>
                      Jeudi
                    </li>
                    <li
                      className={selectedDay === "friday" ? "active" : ""}
                      onClick={() => handleDaySelect("friday")}>
                      Vendredi
                    </li>
                    <li
                      className={selectedDay === "Saturday" ? "active" : ""}
                      onClick={() => handleDaySelect("Saturday")}>
                      Samedi
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-10 offset-lg-1">
                <div className="schedule-table filtering">
                  <table>
                    <tbody>
                      {scheduleData.map((item, index) => (
                        <tr
                          key={index}
                          className={`${
                            item.day === selectedDay ? "show" : "hide"
                          }`}>
                          <td className="col-3">{item.cour}</td>
                          <td data-tsmeta={item.day} className="col-3">
                            {item.time}
                          </td>
                          <td className="col-3">{item.coach}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ***** Contact Us Area Starts ***** */}
        <section className="section" id="contact-us">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xs-12">
                <div id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.2105278920795!2d10.126247194337447!3d36.82608615454223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3301ec9152ab%3A0x9d651f932da1543c!2sRoyal%20Fitness!5e0!3m2!1sfr!2stn!4v1689769711600!5m2!1sfr!2stn"
                    width="100%"
                    height="600"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12">
                <div className="contact-form">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <fieldset>
                          <input
                            name="name"
                            type="text"
                            id="name"
                            placeholder="Your Name*"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            id="email"
                            pattern="[^ @]*@[^ @]*"
                            placeholder="Your Email*"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-12 col-sm-12">
                        <fieldset>
                          <input
                            name="subject"
                            type="text"
                            id="subject"
                            placeholder="Subject"
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            rows={6}
                            id="message"
                            placeholder="Message"
                            required=""
                            defaultValue={""}
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <button
                            type="submit"
                            id="form-submit"
                            className="main-button">
                            Send Message
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
