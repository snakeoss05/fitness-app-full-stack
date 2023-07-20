import React, { useEffect, useRef, useState } from "react";
import "../css/historique.css"
import "../css/chat.css";
import axios from "axios";
import { debounce } from "lodash";

const AdminContact = () => {
const [query, setQuery] = useState("");
const [clientList,setclientList]=useState([])
const [filterClient, setFilterClient] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(3);
const [posteperpage, setposteperpage] = useState(8);

useEffect(() => {
  fetchItems(currentPage, posteperpage);
}, [currentPage]);
 const fetchItems = async (page,limit) => {
   try {
   
     const response = await axios.get(
       `http://localhost:5000/api/submit-form/historique?page=${page}&limit=${limit}`
     );
     const { results, totalPages } = response.data;
     console.log(response.data)
     setFilterClient(results.results);
     setTotalPages(totalPages);
     
   } catch (error) {
     console.error("Error retrieving items:", error);
   }
 };
 
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour:"numeric",
    minute:"2-digit"
  });
  return formattedDate;
}
function formatDateNoH(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",

    
  });
  return formattedDate;
}
const handleSearch = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/submit-form/filterhistorique/${query}`
    );
    if (query) {
      setFilterClient(response.data);
    } else {
      setFilterClient(clientList);
    }
  } catch (error) {
    console.error(error);
  }
};

const debouncedHandleSearch = debounce(handleSearch, 500);
 const handleInputChange = (event) => {
   setQuery(event.target.value);
   debouncedHandleSearch();
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
 const handleDelete = async (id) => {
   try {
     const response = await axios.delete(
       `https://alakifekbackend.onrender.com/api/submit-form/delete/${id}`
     );
     // Update the clientCommands state to remove the deleted item
     setFilterClient((prevState) =>
       prevState.filter((item) => item._id !== id)
     );
   } catch (e) {
     console.error(e);
   }
 };
  return (
    <div className="container-fluid p-5 ms-3">
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date De Payment</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Type da Abonnement</th>
              <th>Nouveau Date de l'Abonnement</th>
              <th>Payé</th>
              
            </tr>
          </thead>
          <tbody>
            {filterClient?.map((client) => {
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
                  <td>{formatDateNoH(client.finDate)}</td>
                  <td>{client.mois} Mois</td>
                 
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
};

export default AdminContact;
