import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/historique.css";
import DatePicker from "react-datepicker";
import { debounce } from "lodash";
import Swal from "sweetalert2";

export default function ManageUser() {
const [clientList, setClientList] = useState([]);
const [filteredClientList, setFilteredClientList] = useState([]);
const [query, setQuery] = useState("");
const [showAll, setShowAll] = useState(true);
const [finDate, setFintDate] = useState(new Date());
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(3);
const [posteperpage, setposteperpage] = useState(8);

useEffect(() => {
  fetchItems(currentPage, posteperpage);
}, [currentPage]);
   const fetchItems = async (page,limit) => {
    // Make a GET request to your Express backend to retrieve clientCommands data
    try {
     
     const response=await axios.get(
          `http://localhost:5000/api/ath/clients?page=${page}&limit=${limit}`
        )
        const { results, totalPages } = response.data;
       console.log(response.data)
          const formattedData = results.results.map((entry) => ({
            ...entry,
            isEditing: false,
          }));
          
          setClientList(formattedData);
          setTotalPages(totalPages);
      
    } catch (error) {
      console.error("Error retrieving items:", error);
    }
  }
  const handleSearch = async () => {
    
    try {
      const response = await axios.get(
        `http://localhost:5000/api/ath/Search/${query}`
      );
      if (query) {
        setFilteredClientList(response.data);
      }
      else {setFilteredClientList(clientList)}
    } catch (error) {
      console.error(error);
    }
  };
  const debouncedHandleSearch = debounce(handleSearch, 500);
  const handleEdit = (id) => {
    setClientList((prevData) =>
      prevData.map((entry) =>
        entry._id === id ? { ...entry, isEditing: true } : entry
      )
    );
  };
   const handleInputChange = (event) => {
     setQuery(event.target.value);
     debouncedHandleSearch();
   };
  async function handleSave(id, newValue,client) {
    
     setClientList((prevData) =>
       prevData.map((entry) =>
         entry._id === id
           ? { ...entry, finDate: newValue, isEditing: false }
           : entry
       )
     );
    try {
      const updateDate = new Date(newValue); 
      const response = await axios.put(
        `http://localhost:5000/api/ath/user/${id}`,
        { updateDate }
      );
      const response2 = axios.post(
        "http://localhost:5000/api/submit-form/post",
        { client, updateDate, id }
      );
     Swal.fire({
       position: "top-center",
       icon: "success",
       title: "Your work has been saved",
       showConfirmButton: false,
       timer: 1500,
     });
      // Return the response data
      return response.data;
    } catch (error) {
      throw new Error("Failed to update document field");
    }
  }
   async function addOneMonthToServerDate(serverDateStr, mois, id,client) {
     // Parse the server date string into a Date object
     Swal.fire({
       title: `voulez-vous ajouter ${mois} mois?`,
       showDenyButton: true,
       showCancelButton: true,
       confirmButtonText: "Confirmer",
       denyButtonText: `Ne confirme pas`,
     }).then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         Swal.fire("Saved!", "", "success");
         var serverDate = new Date(serverDateStr);

         // Add one month to the date
         serverDate.setMonth(serverDate.getMonth() + mois);

         // Handle cases where the original date's day is greater than the maximum number of days in the updated month
         if (
           serverDate.getDate() !==
           new Date(
             serverDate.getFullYear(),
             serverDate.getMonth(),
             0
           ).getDate()
         ) {
           serverDate = new Date(
             serverDate.getFullYear(),
             serverDate.getMonth() + 1,
             0
           );
         }

         // Retrieve the updated date
         var updateDate = serverDate.toISOString().split("T")[0];

         let idClient = client._id;
         try {
           const response2 = axios.post(
             "http://localhost:5000/api/submit-form/post",
             { client, updateDate, mois, idClient }
           );

           const response = axios.put(
             `http://localhost:5000/api/ath/user/${id}`,
             {
               updateDate,
             }
           );

           setClientList((prevData) =>
             prevData.map((entry) =>
               entry._id === id ? { ...entry, finDate: updateDate } : entry
             )
           );

           // Return the response data
           return response.data;
         } catch (error) {
           throw new Error("Failed to update document field");
         }
       } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
       }
     });
     
   }
  function calculateDateDifference(endDate) {
    var start = new Date();
    var end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = end - start;

    // Calculate the difference in days
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Calculate the difference in months
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    const diffInMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

    return diffInDays;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  function isDatePassed(dateStr, id,client) {
    // Parse the given date string into a Date object
    var givenDate = new Date(dateStr);
    // Get the current date
    var currentDate = new Date();
    const diffInMilliseconds = givenDate - currentDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const formattedDate = givenDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Compare the given date with the current date
    if (givenDate < currentDate) {
      return (
        <>
          {formattedDate} il' ya de {diffInDays} jour
          <td>
            <h6 className="css-selector-danger text-white text-center fw-bold">
              No Payer
            </h6>{" "}
            <button
              className="btn btn-outline-dark mx-1 btn-sm "
              onClick={() => addOneMonthToServerDate(dateStr, 1, id, client)}>
              +1 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 2, id, client)}>
              +2 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 3, id, client)}>
              +3 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 6, id, client)}>
              +6 Mois
            </button>
          </td>
        </>
      ); // The given date has already passed
    } else {
      return (
        <>
          {formattedDate} il' ya de {diffInDays} jour
          <td>
            <h6 className="css-selector-success text-white text-center fw-bold">
              Payer
            </h6>{" "}
            <button
              className="btn btn-outline-dark mx-1 btn-sm "
              onClick={() => addOneMonthToServerDate(dateStr, 1, id, client)}>
              +1 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 2, id, client)}>
              +2 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 3, id, client)}>
              +3 Mois
            </button>
            <button
              className="btn btn-outline-dark mx-1 btn-sm"
              onClick={() => addOneMonthToServerDate(dateStr, 6, id, client)}>
              +6 Mois
            </button>
          </td>
        </>
      ); // The given date is in the future
    }
  }

  useEffect(() => {
    if (showAll) {
      setFilteredClientList(clientList);
    } else {
      const currentDate = new Date();
      const filteredProducts = clientList.filter(
        (client) => new Date(client.finDate) < currentDate
      );
      setFilteredClientList(filteredProducts);
    }
  }, [clientList, showAll]);

  const handleFilterClick = () => {
    setShowAll(!showAll);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const generatePaginationNavigation = () => {
    const navigation = [];
    for (let i = 1; i <= totalPages; i++) {
      navigation.push(
        <li
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? "page-item active" : "page-item"}>
          <a href="#" className="page-link">
            {i}
          </a>
        </li>
      );
    }
    return navigation;
  };
  return (
    <div className="p-5">
      <div className="row height d-flex justify-content-center align-items-center my-3">
        <div className="col-md-6">
          <div className="form">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search anything..."
              value={query}
              onChange={handleInputChange}
            />
            <span className="left-pan">
              <i className="fa-solid fa-filter"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table table-striped bg-light">
          <thead>
            <tr>
              <td>Prénom</td>
              <td>
                
                  Nom 
               
              </td>
              <td>Email</td>
              <td>Numéro Téléphonique</td>
              <td>Abonnement type</td>
              <td>
               
                  Abonnement Commencer
              
              
              </td>
              <td>
                Abonnement terminé{" "}
                <i
                  className="fa-solid fa-filter ms-3"
                  onClick={handleFilterClick}></i>
              </td>

              <td>Mise a Jour</td>
            </tr>
          </thead>
          <tbody>
            {filteredClientList.map((client) => {
              return (
                <tr>
                  <td>{client.name}</td>
                  <td>{client.lastname}</td>
                  <td>{client.email}</td>
                  <td>{client.phonenumber}</td>
                  <td>
                    {client.musculation ? (
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
                    {client.cardio ? (
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
                    {client.boxe ? (
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
                    {client.taekwondo ? (
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
                  <td className=" font-monospace">
                    {formatDate(client.startdate)}
                  </td>
                  <td className="font-monospace ">
                    <span className="position-relative d-block">
                      <button
                        className="btn btn-outline-dark btn-sm position-absolute end-0 m-3  ms-auto fs-6 rounded-5"
                        onClick={() => handleEdit(client._id)}>
                        <i className="fa-solid fa-wrench  "></i>
                      </button>
                    </span>
                    {client.isEditing ? (
                      <DatePicker
                        selected={finDate}
                        onChange={(date) => setFintDate(date)}
                        className="form-control z-3 m-2"
                      />
                    ) : (
                      isDatePassed(client.finDate, client._id, client)
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success m-3 rounded-4 fw-bold"
                      onClick={() => handleSave(client._id, finDate,client)}>
                      Enregistrer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                href="#"
                onClick={handlePageClick.bind(null, currentPage - 1)}
                disabled={currentPage === 1}>
                <i className="fa fa-long-arrow-left" /> Previous
              </a>
            </li>
            {generatePaginationNavigation()}
            <li className="page-item">
              <a
                href="#"
                className="page-link"
                onClick={handlePageClick.bind(null, currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next <i className="fa fa-long-arrow-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
