import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ClientCommands() {
  const [startDate, setStartDate] = useState(new Date());
  const [finDate, setFintDate] = useState(new Date());
  const [alertsuccessmsg, setsuccessmsg] = useState();
  const [alertdangermsg, setdangermsg] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    phonenumber: "",
    address: "",
    password: "",
    startdate: startDate,
    femme: false,
    finDate: finDate,
    profilePicture: null,
    musculation: false,
    boxe: false,
    karaté: false,
    cardio: false,
    taekwondo: false,
    physique:false,
  });

  function HandleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setregister({ ...register, [name]: checked });
    } else {
      setregister({ ...register, [name]: value });
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setregister({ ...register, profilePicture: file });
  };
async function registerform(e) {
  e.preventDefault();
  const formDataToSend = new FormData();

  formDataToSend.append("name", register.name);
  formDataToSend.append("lastname", register.lastname);
  formDataToSend.append("phonenumber", register.phonenumber);
  formDataToSend.append("address", register.address);
  formDataToSend.append("password", register.password);
  formDataToSend.append("startdate", startDate);
  formDataToSend.append("finDate", finDate);

  if (register.profilePicture) {
    formDataToSend.append("profilePicture", register.profilePicture);
  }

  formDataToSend.append("musculation", register.musculation);
  formDataToSend.append("boxe", register.boxe);
  formDataToSend.append("femme", register.femme);
  formDataToSend.append("physique", register.physique);
  formDataToSend.append("karaté", register.karaté);
  formDataToSend.append("cardio", register.cardio);
  formDataToSend.append("taekwondo", register.taekwondo);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/ath/register",
      formDataToSend
    );
setsuccessmsg(response.data);
  
  } catch (error) {
    
setdangermsg(error.response.data);
  }

}
  return (
    <div className="container mx-auto d-flex flex-column justify-content-start bg-light mt-5 p-3 rounded-4">
      <h1 className="mb-4 fw-bolder text-center">Creation De Nouveau Abonné</h1>

      <form onSubmit={registerform} className="row ms-4 mx-auto">
        <div className="row mx-auto">
          <div className="col-10 col-lg-5 my-2 mx-auto ps-5">
            <i
              class="fa-solid fa-circle-user "
              style={{ fontSize: "100px", marginLeft: "6rem" }}></i>

            <input
              class="btn btn-dark  mt-3"
              id="formFileSm"
              type="file"
              name="profilePicture"
              required
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Nom</label>
          <input
            type="text"
            name="name"
            onChange={HandleChange}
            value={register.name}
            required
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
            required
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
            required
            value={register.password}
            placeholder="********"
            className="form-control"
          />
        </div>

        <div className="col-lg-5 col-10 my-2">
          <label className="text-black m-1 form-check-label  ">Address </label>
          <input
            type="text"
            name="address"
            value={register.address}
            onChange={HandleChange}
            required
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
            required
            className="form-control"
            placeholder="Example: 27-365-486"
          />
        </div>
        <div className="col-lg-3 col-10 my-2">
          <label class="form-check-label col-12">Date de Commencer</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className=" form-control mt-2"
          />
        </div>

        <div className="col-lg-2 col-10 my-2 ">
          <label class="form-check-label col-12">Date de terminé</label>
          <DatePicker
            selected={finDate}
            onChange={(date) => setFintDate(date)}
            className="form-control mt-2"
          />
        </div>
        <div className="row">
          <h5 className="m-2 text-secondary fw-bold"> Abonnement Type :</h5>
          <div class="col-2 m-3">
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
            <label class="form-check-label">Musculation</label>
          </div>
          <div class=" col-2 m-3">
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
            <label class="form-check-label">Cardio</label>
          </div>
          <div class="col-2 m-3">
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
            <label className="form-check-label">boxe</label>
          </div>
          <div className="col-2 m-3">
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
              alt="taekwando"
              className="m-2"
            />
            <label className="form-check-label">Taekwondo</label>
          </div>
          <div className="col-2 m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="karaté"
              checked={register.karaté}
              id="karatéCheck"
            />
            <img
              src="../assests/logo/woman.png"
              width="50"
              height="50"
              alt="karaté"
              className="m-2"
            />
            <label className="form-check-label">Karaté</label>
          </div>
          <div className="col-2 m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="femme"
              checked={register.femme}
              id="femmeCheck"
            />
            <img
              src="../assests/logo/fentes.png"
              width="50"
              height="50"
              alt="femme"
              className="m-2"
            />
            <label className="form-check-label">100% Femme</label>
          </div>
          <div className="col-2 m-3">
            <input
              className="form-check-input mt-3"
              type="checkbox"
              onChange={HandleChange}
              name="physique"
              checked={register.physique}
              id="physiqueéCheck"
            />
            <img
              src="../assests/logo/stretching.png"
              width="50"
              height="50"
              alt="physique"
              className="m-2"
            />
            <label className="form-check-label">Physique</label>
          </div>
        </div>
        {alertsuccessmsg && (
          <div className="alert alert-success" role="alert">
            {alertsuccessmsg}
          </div>
        )}
        {alertdangermsg && (
          <div className="alert alert-success" role="alert">
            {alertdangermsg}
          </div>
        )}
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
