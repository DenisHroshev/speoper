import { FormEvent, useEffect, useMemo, useState } from "react";
import { TransportTypes } from "@/app/transports/common/constants/transport-types.enum";
import { Transport } from "@/app/transports/common/types/transport.type";

interface TransportsLayoutProps {
  transportData?: Transport;
  submitButtonText: string;
  isNew: boolean;
  onSubmit: (arg1: Transport) => void | Promise<void>;
}

const defaultFormState = {
  name: "",
  description: "",
  peopleCapacity: "",
  type: "",
  photoUrl: "",
};

export default function TransportsLayout({
  transportData,
  onSubmit,
  submitButtonText = "Submit",
  isNew = false,
}: TransportsLayoutProps) {
  const [formData, setFormData] = useState<Transport>(
    isNew ? defaultFormState : transportData,
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.type) {
      setErrorMessage("Please select a type");
      return;
    }
    onSubmit(formData);
  };

  useEffect(() => {
    setFormData(isNew ? defaultFormState : transportData);
  }, [transportData]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Transport</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            People Capacity
          </label>
          <input
            type="number"
            name="peopleCapacity"
            value={formData.peopleCapacity}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Select a type</option>
            {Object.values(TransportTypes).map((type, idx) => (
              <option value={type} key={idx}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
}
