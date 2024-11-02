"use client";

import { useEffect, useState } from "react";
import { fetchApiGet } from "@/common/services/fetch-api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Operation } from "@/app/operations/common/types/Operation.type";

export default function OperationsLayout() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const endpoint = `/operations`;
        const data = await fetchApiGet({ endpoint });
        if (!data) setErrorMessage("No data fount");

        setOperations(data);
      } catch (error) {
        // @ts-ignore
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/operations/${id}`);
  };

  if (loading) {
    return "VETALIK LOADITSA...";
  }

  if (errorMessage) {
    return (
      <div>
        <p>Error:{errorMessage}</p>
      </div>
    );
  }

  return (
    <div style={layoutStyle}>
      <h1 style={titleStyle}>Operation List</h1>
      <div style={buttonContainerStyle}>
        <Link href="/operations/new">
          <button style={buttonStyle}>Create new</button>
        </Link>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Image</th>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Description</th>
            <th style={headerCellStyle}>Date</th>
            <th style={headerCellStyle}>Location</th>
            <th style={headerCellStyle}>Type</th>
            <th style={headerCellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr
              key={operation.id}
              onClick={() => handleRowClick(operation.id)}
              style={rowStyle}
            >
              <td style={cellStyle}>
                {operation.photoUrl ? (
                  <img
                    src={operation.photoUrl}
                    alt={operation.name}
                    style={imageStyle}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td style={cellStyle}>{operation.name}</td>
              <td style={cellStyle}>{operation.description}</td>
              <td style={cellStyle}>
                {operation.date
                  ? new Date(operation.date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td style={cellStyle}>
                {operation.latitude && operation.longitude
                  ? `${operation.latitude}, ${operation.longitude}`
                  : "Location unavailable"}
              </td>
              <td style={cellStyle}>{operation.type}</td>
              <td style={cellStyle}>{operation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles for the layout, button, table, and cells
const layoutStyle = { padding: "20px" };
const titleStyle = { fontSize: "24px", marginBottom: "20px" };
const buttonContainerStyle = { marginBottom: "20px" };
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};
const headerCellStyle = {
  padding: "10px",
  fontWeight: "bold",
  textAlign: "left" as const,
  borderBottom: "2px solid #ddd",
  color: "#333",
  fontSize: "14px",
};
const rowStyle = {
  cursor: "pointer",
  transition: "background 0.3s",
  background: "#f8f8f8",
};
const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  color: "#555",
  fontSize: "14px",
};
const imageStyle = {
  width: "80px",
  height: "auto",
  borderRadius: "8px",
};
