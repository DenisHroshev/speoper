"use client";

import { useEffect, useState } from "react";
import { fetchApiGet } from "@/common/services/fetch-api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TransportsLayout() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const endpoint = `/transports`;

        const data = await fetchApiGet({ endpoint });

        setTransports(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/transports/${id}`);
  };

  if (loading) {
    return "VETALIK LOADITSA...";
  }

  if (error) {
    return (
      <div>
        <p>Error:</p>
        <div className="">{JSON.stringify(error)}</div>
      </div>
    );
  }

  return (
    <>
      <h1>Transport List</h1>
      <Link href={"/transports/new"}>
        <button>Create new</button>{" "}
      </Link>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          padding: "20px 100px",
        }}
      >
        <thead>
          <tr>
            <th style={headerCellStyle}>Image</th>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Description</th>
            <th style={headerCellStyle}>Capacity</th>
            <th style={headerCellStyle}>Type</th>
          </tr>
        </thead>
        <tbody>
          {transports.map((transport) => (
            <tr
              key={transport.id}
              onClick={() => handleRowClick(transport.id)}
              style={{
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            >
              <td style={cellStyle}>{transport.name}</td>
              <td style={cellStyle}>{transport.description}</td>
              <td style={cellStyle}>{transport.peopleCapacity}</td>
              <td style={cellStyle}>{transport.type}</td>
              <td style={cellStyle}>
                {transport.photoUrl ? (
                  <img
                    src={transport.photoUrl}
                    alt={transport.name}
                    style={{
                      width: "80px",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const headerCellStyle = {
  padding: "10px",
  fontWeight: "bold",
  textAlign: "left" as const,
  borderBottom: "2px solid #ddd",
  color: "#333",
  fontSize: "14px",
};

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  color: "#555",
  fontSize: "14px",
};
