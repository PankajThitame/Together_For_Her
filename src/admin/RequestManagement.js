import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress, Box
} from "@mui/material";
import "../styles/requestManagement.css";

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      console.log(`Updating request ID: ${id} with status: ${status}`);
      await axios.put(`http://localhost:9090/api/requests/${id}/status`, { status });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.request_id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="request-management">
      <Typography variant="h5" className="request-title">📌 Request Management</Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <Typography variant="body2">Loading requests...</Typography>
        </div>
      ) : error ? (
        <Typography variant="body2" color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">No requests found.</TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <RequestRow key={request.request_id} request={request} updateRequestStatus={updateRequestStatus} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const RequestRow = ({ request, updateRequestStatus }) => {
  return (
    <TableRow>
      <TableCell>{request.request_id}</TableCell>
      <TableCell>{request.user.firstName}</TableCell>
      <TableCell>{request.contact}</TableCell>
      <TableCell>{request.address}</TableCell>
      <TableCell>{request.reason}</TableCell>
      <TableCell>{request.status}</TableCell>
      <TableCell align="center">
        <Box display="flex" justifyContent="center" gap={1}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => updateRequestStatus(request.request_id, "APPROVED")}
            disabled={request.status === "APPROVED"}
          >
            ✅ Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => updateRequestStatus(request.request_id, "REJECTED")}
            disabled={request.status === "REJECTED"}
          >
            ❌ Reject
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default RequestManagement;
