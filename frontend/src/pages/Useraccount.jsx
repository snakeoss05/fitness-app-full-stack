import React,{useState,useEffect} from "react";
import "./useraccount.css";
import Cookies from "js-cookie";
import axios from "axios";


export default function Useraccount() {
    const [userProfile, setUserProfile] = useState();
    const [Historique, setHistorique] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
      {
        title: "Profile",
        content: (
          <div
            id="Profile"
            role="tabpanel"
            className="tab-pane show active"
            aria-labelledby="pills-profile-tab"
            tabindex="0">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}>
                      <img
                        src="../assests/logo/304977322_611153454041595_2432890234654814593_n.jpg"
                        alt="Avatar"
                        className="img-fluid my-5 rounded-pill"
                        style={{ width: 80 }}
                      />
                      <h5>
                        {userProfile?.name} {userProfile?.lastname}
                      </h5>

                      <i className="far fa-edit mb-5" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Address</h6>
                            <p className="text-muted">{userProfile?.address}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Télephone</h6>
                            <p className="text-muted">
                              {userProfile?.phonenumber}
                            </p>
                          </div>
                        </div>
                        <h6>Subscription</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Type</h6>
                            {userProfile?.musculation ? (
                              <img
                                src="../assests/logo/gym.png"
                                width="30"
                                height="30"
                                alt="gym"
                                className="m-2"
                              />
                            ) : (
                              ""
                            )}
                            {userProfile?.cardio ? (
                              <img
                                src="../assests/logo/des-exercices-detirement.png"
                                width="30"
                                height="30"
                                alt="cardio"
                                className="m-2"
                              />
                            ) : (
                              ""
                            )}
                            {userProfile?.boxe ? (
                              <img
                                src="../assests/logo/gants-de-boxe (1).png"
                                width="30"
                                height="30"
                                alt="gym"
                                className="m-2"
                              />
                            ) : (
                              ""
                            )}
                            {userProfile?.taekwondo ? (
                              <img
                                src="../assests/logo/karate.png"
                                width="30"
                                height="30"
                                alt="gym"
                                className="m-2"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Date de términer</h6>
                            <p className="text-muted">
                              {formatDate(userProfile?.finDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Historique",
        content: (
          <div
            id="Historique"
            className="tab-pane show active"
            role="tabpanel"
            aria-labelledby="Historique"
            tabindex="0">
            <div className="table-wrapper overflow-auto">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date De Payment</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Type da Abonnement</th>
                    <th>l'ancien Date De l'Abonnement</th>
                    <th>Nouveau Date de l'Abonnement</th>

                    <th>Payé</th>
                  </tr>
                </thead>
                <tbody>
                  {Historique.map((client) => {
                    return (
                      <tr key={client._id}>
                        <td className="  font-monospace">
                          {formatDate(client.postDate)}
                        </td>
                        <td>{client.client.name}</td>
                        <td>{client.client.lastname}</td>
                        <td>
                          {" "}
                          {client.client.musculation ? (
                            <img
                              src="../assests/logo/gym.png"
                              width="30"
                              height="30"
                              alt="gym"
                              className="m-2"
                            />
                          ) : (
                            ""
                          )}
                          {client.client.cardio ? (
                            <img
                              src="../assests/logo/des-exercices-detirement.png"
                              width="30"
                              height="30"
                              alt="cardio"
                              className="m-2"
                            />
                          ) : (
                            ""
                          )}
                          {client.client.boxe ? (
                            <img
                              src="../assests/logo/gants-de-boxe (1).png"
                              width="30"
                              height="30"
                              alt="gym"
                              className="m-2"
                            />
                          ) : (
                            ""
                          )}
                          {client.client.taekwondo ? (
                            <img
                              src="../assests/logo/karate.png"
                              width="30"
                              height="30"
                              alt="gym"
                              className="m-2"
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{formatDate(client.client.finDate)}</td>
                        <td>{formatDate(client.finDate)}</td>
                        <td>{client.mois||0} Mois</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
    ];
    const handleTabClick = (index) => {
      setActiveTab(index);
    };
   useEffect(()=>{
const getUserById = async () => {
  var token = Cookies.get("token");

  try {
    const response = await axios.get(`http://localhost:5000/api/ath/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserProfile(response.data);
  } catch (error) {
    console.error(error);
  }
};
if (!userProfile) getUserById();
   },[])
   
  

      useEffect(() => {
if (userProfile)
  axios
    .get(
      `http://localhost:5000/api/submit-form/gethistorique/${userProfile._id}`
    )
    .then((res) => {
      setHistorique(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
      }, [userProfile]);
   function formatDate(dateStr) {
     const date = new Date(dateStr);
     const formattedDate = date.toLocaleDateString("fr-FR", {
       year: "numeric",
       month: "numeric",
       day: "numeric",
     });
     return formattedDate;
   }
  
  return (
    <div>
      <section className="vh-100 " style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container  mt-5 p-5 h-100">
          <div className="tab-list">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={index === activeTab ? "active" : "text-black"}
                onClick={() => handleTabClick(index)}>
                {tab.title}
              </button>
            ))}
          </div>
          <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
      </section>
    </div>
  );
}
