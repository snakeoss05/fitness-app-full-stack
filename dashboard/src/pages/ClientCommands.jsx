import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientCommands() {
  const [startDate, setStartDate] = useState(new Date());
  const [finDate, setFintDate] = useState(new Date());
  const [signinmsg, setsigninmsg] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [register, setregister] = useState({
    name: "",
    email: "",
    lastname: "",
    phonenumber: "",
    address: "",
    password: "",
    startdate: startDate,
    finDate: finDate,
    musculation: false,
    boxe: false,
    cardio: false,
    taekwondo: false,
  });

  function HandleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setregister({ ...register, [name]: checked });
    } else {
      setregister({ ...register, [name]: value });
    }
  }

  console.log(finDate);
  console.log(startDate);
  async function registerform(e) {
    e.preventDefault();
    console.log(register);
    const updatedRegister = {
      ...register,
      startdate: startDate,
      finDate: finDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ath/register",
        updatedRegister
      );
      setsigninmsg(response.data);
      console.log(response.data);
      const timeoutId = setTimeout(() => {
        setsigninmsg("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    } catch (error) {
      setVerificationMessage(error.response.data);
      const timeoutId = setTimeout(() => {
        setVerificationMessage("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }
  return (
    <div className="container mx-auto d-flex flex-column justify-content-start bg-white">
      <h1 className="mb-4 fw-bolder text-center">Creation De Nouveau Abonné</h1>

      <form onSubmit={registerform} className="row ms-4 mx-auto">
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Nom</label>
          <input
            type="text"
            name="name"
            onChange={HandleChange}
            value={register.name}
            className="form-control"
            placeholder="Kamel"
          />
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Prénom</label>
          <input
            type="text"
            name="lastname"
            onChange={HandleChange}
            value={register.lastname}
            className="form-control"
            placeholder="Frigui"
          />
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">
            Mode Passe
          </label>
          <input
            type="password"
            name="password"
            onChange={HandleChange}
            value={register.password}
            placeholder="********"
            className="form-control"
          />
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Email</label>
          <input
            type="email"
            name="email"
            onChange={HandleChange}
            value={register.email}
            className="form-control"
            placeholder="Example@gmail.com"
          />
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Address </label>
          <input
            type="text"
            name="address"
            value={register.address}
            onChange={HandleChange}
            className="form-control"
            placeholder="Example: 45 Rue tattawer Cité Tahrir"
          />
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">
            Numero Téléphonique
          </label>
          <input
            type="text"
            name="phonenumber"
            value={register.phonenumber}
            onChange={HandleChange}
            className="form-control"
            placeholder="Example: 27-365-486"
          />
        </div>
        <div className="col-lg-3 col-10 my-2">
          <label class="form-check-label col-8" for="flexCheckDefault">
            Date de Commencer
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className=" form-control mt-2"
          />
        </div>

        <div className="col-lg-2 col-10 my-2">
          <label class="form-check-label col-8" for="flexCheckDefault">
            Date de terminé
          </label>
          <DatePicker
            selected={finDate}
            onChange={(date) => setFintDate(date)}
            className="form-control mt-2"
          />
        </div>
        <div className="col-lg-8 col-10">
          <h5 className="m-2 text-secondary fw-bold"> Abonnement Type :</h5>
          <div class="form-check m-3">
            <input
              class="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="musculation"
              checked={register.musculation}
              id="Musculationcheck"
            />
            <img
              src="../assests/logo/gym.png"
              width="50"
              height="50"
              alt="gym"
              className="m-2"
            />
            <label class="form-check-label" for="Musculationcheck">
              Musculation
            </label>
          </div>
          <div class="form-check m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="cardio"
              checked={register.cardio}
              id="cardiocheck"
            />
            <img
              src="../assests/logo/des-exercices-detirement.png"
              width="50"
              height="50"
              alt="gym"
              className="m-2"
            />
            <label class="form-check-label" for="cardiocheck">
              Cardio
            </label>
          </div>
          <div class="form-check m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="boxe"
              checked={register.boxe}
              id="boxecheck"
            />
            <img
              src="../assests/logo/gants-de-boxe (1).png"
              width="50"
              height="50"
              alt="gym"
              className="m-2"
            />
            <label className="form-check-label" for="boxecheck">
              boxe
            </label>
          </div>
          <div className="form-check m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="taekwondo"
              checked={register.taekwondo}
              id="taekwondoCheck"
            />
            <img
              src="../assests/logo/karate.png"
              width="50"
              height="50"
              alt="gym"
              className="m-2"
            />
            <label className="form-check-label" for="taekwondoCheck">
              Taekwondo
            </label>
          </div>
        </div>
        <div className="row">
          {signinmsg && (
            <div
              className={`alert  alert-success  mx-auto  col-4 alert-verification ${
                signinmsg && "alertfadeup"
              }`}
              style={{ fontSize: "14px" }}
              role="alert">
              {signinmsg}
            </div>
          )}
          {verificationMessage && (
            <div
              className={`alert alert-danger mx-auto col-4  alert-verification ${
                verificationMessage && "alertfadeup"
              }`}
              style={{ fontSize: "14px" }}
              role="alert">
              {verificationMessage}
            </div>
          )}
        </div>
        <div className="row">
          <button type="submit" className="btn btn-dark mx-auto col-4 p-2">
            Créer nouveau compte
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientCommands;
