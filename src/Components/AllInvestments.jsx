import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const AllInvestments = () => {
  const token = useSelector((state) => state.user.authToken);
  const navigate = useNavigate();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch investments from the API
  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/investments/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setInvestments(response.data);
      } catch (err) {
        console.error("Error fetching investments:", err);
        setError("Failed to load investments.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInvestments();
    }
  }, [token]);

  // Handle delete investment
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/investments/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setInvestments((prev) => prev.filter((investment) => investment.id !== id));
      } catch (err) {
        console.error("Error deleting investment:", err);
        setError("Failed to delete investment.");
      }
    }
  };

  if (loading) return <p>Loading investments...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container>
      <h3 className="text-center my-4">All Investments</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Appliance</th>
            <th>Type</th>
            <th>Date</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment) => (
            <tr key={investment.id}>
              <td>{investment.id}</td>
              <td>{investment.appliance || "N/A"}</td>
              <td>{investment.investment_type}</td>
              <td>{new Date(investment.investment_date).toLocaleDateString()}</td>
              <td>{investment.investment_description}</td>
              <td>${investment.cost.toFixed(2)}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => navigate(`/edit-investment/${investment.id}`)}
                >
                  <FaPencilAlt />
                </Button>
                <Button
                  variant="link"
                  onClick={() => handleDelete(investment.id)}
                >
                  <FaTrash style={{ color: "red" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllInvestments;
