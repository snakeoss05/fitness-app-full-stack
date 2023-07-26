import React,{useState,useEffect} from "react";
import axios from "axios";
import "../css/home.css"
export default function Home() {
    const [selectedDay, setSelectedDay] = useState("monday");
    const [scheduleData, setScheduleData] = useState([]);
    const [filteredData,setfilteredData]=useState([])
    const [schedule, setschedule] = useState({
      day: selectedDay,
      coach: "",
      time: "",
      cour: "",
    });
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };
useEffect(() => {
  fetchScheduleData();
 
}, []);



 function HandleChange(event) {
   const { name, value } = event.target;
   setschedule((prevFormdata) => ({
     ...prevFormdata,
     [name]: value,
   }));
 }
 const handleDelete = async (id) => {
  
    
       try {
         const response = axios.delete(
           `http://localhost:5000/api/submit-form/schedule/delete/${id}`
         );
         // Update the clientCommands state to remove the deleted item
         setScheduleData((prevState) =>
           prevState.filter((item) => item._id !== id)
         );
       } catch (e) {
         console.error(e);
       }
     }
   
 
  // Sample data (you can replace this with your actual data)
 
   const fetchScheduleData = () => {
     axios
       .get("http://localhost:5000/api/submit-form/schedule/get")
       .then((response) => setScheduleData(response.data.newFormData))
       .catch((error) => console.error("Error fetching data:", error));
   };
   function AddScheduleData () {
     const updatedRegister = {
       ...schedule,
       day: selectedDay,
      
     };
     
    try {

      axios.post(
        "http://localhost:5000/api/submit-form/schedule/add",
        updatedRegister
      );
      setScheduleData([...scheduleData, updatedRegister]);
    } catch (error) {
      throw new Error("Failed to Save document field");
    }
     
   };
  
 
  
  
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
                  <em>Calendrier</em>
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
                    className={selectedDay === "saturday" ? "active" : ""}
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
                        className={` ${
                          item.day === selectedDay ? "show " : "hide"
                        }`}>
                        <td className="day-time">{item.cour}</td>
                        <td
                         
                          data-tsmeta={item.day}>
                          {item.time}
                        </td>
                        <td>{item.coach}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(item._id)}
                            type="button"
                            className="btn btn-outline-danger m-3 rounded-circle">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td className="col-4">
                        <input
                          type="text"
                          placeholder="Nom De Cours"
                          name="cour"
                          value={schedule.cour}
                          onChange={HandleChange}
                          className="bg-transparent text-white p-2"
                        />
                      </td>
                      <td className="col-4">
                        <input
                          type="text"
                          name="time"
                          value={schedule.time}
                          onChange={HandleChange}
                          placeholder="Temps"
                          className="bg-transparent text-white p-2 text"
                        />
                      </td>
                      <td className="col-4">
                        {" "}
                        <input
                          type="text"
                          name="coach"
                          value={schedule.coach}
                          onChange={HandleChange}
                          placeholder="Nom de entraîneur"
                          className="bg-transparent text-white p-2 text"
                        />
                      </td>
                      <td className="p-2">
                        <button
                          className="btn btn-outline-light btn-sm rounded-pill fs-5 p-1"
                          onClick={AddScheduleData}>
                          Save
                        </button>
                      </td>
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
