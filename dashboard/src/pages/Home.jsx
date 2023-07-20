import React from "react";
import "../css/home.css"
export default function Home() {
  return (
    <div
      className="ps-5 pe-2 "
      style={{ backgroundColor: "#F5F7FA", height: "100vh" }}>
      <a
        class="weatherwidget-io"
        href="https://forecast7.com/en/36d8110d18/tunis/"
        data-label_1="TUNIS"
        data-label_2="WEATHER"
        data-theme="original">
        TUNIS WEATHER
      </a>

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
                  <li className="active" data-tsfilter="monday">
                    Monday
                  </li>
                  <li data-tsfilter="tuesday">Tuesday</li>
                  <li data-tsfilter="wednesday">Wednesday</li>
                  <li data-tsfilter="thursday">Thursday</li>
                  <li data-tsfilter="friday">Friday</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10 offset-lg-1">
              <div className="schedule-table filtering">
                <table>
                  <tbody>
                    <tr>
                      <td className="day-time">Cours Physique</td>
                      <td className="monday ts-item show" data-tsmeta="monday">
                        10:00AM - 11:30AM
                      </td>
                      <td className="tuesday ts-item" data-tsmeta="tuesday">
                        2:00PM - 3:30PM
                      </td>
                      <td>coach Name</td>
                    </tr>
                    <tr>
                      <td className="day-time">Cours Taekwondo</td>
                      <td className="friday ts-item" data-tsmeta="friday">
                        10:00AM - 11:30AM
                      </td>
                      <td
                        className="thursday friday ts-item"
                        data-tsmeta="thursday">
                        2:00PM - 3:30PM
                      </td>
                      <td>coach Name</td>
                    </tr>
                    <tr>
                      <td className="day-time">Cours Boxe</td>
                      <td className="tuesday ts-item" data-tsmeta="tuesday">
                        10:00AM - 11:30AM
                      </td>
                      <td className="monday ts-item show" data-tsmeta="monday">
                        2:00PM - 3:30PM
                      </td>
                      <td>coach Name</td>
                    </tr>
                    <tr>
                      <td className="day-time">Musculation</td>
                      <td className="wednesday ts-item" data-tsmeta="wednesday">
                        10:00AM - 11:30AM
                      </td>
                      <td className="friday ts-item" data-tsmeta="friday">
                        2:00PM - 3:30PM
                      </td>
                      <td>coach Name</td>
                    </tr>
                    <tr>
                      <td className="day-time">Advanced Training</td>
                      <td className="thursday ts-item" data-tsmeta="thursday">
                        10:00AM - 11:30AM
                      </td>
                      <td className="wednesday ts-item" data-tsmeta="wednesday">
                        2:00PM - 3:30PM
                      </td>
                      <td>coach Name</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
