"use client";
import { useParams } from "next/navigation";
import TransportsLayout from "@/app/transports/common/components/transport-form";
import { useEffect, useState } from "react";
import { fetchApiGet, fetchApiPatch } from "@/common/services/fetch-api";
import { Transport } from "@/app/transports/common/types/transport.type";

export default function TransportByIdLayout() {
  const params = useParams();
  const transportId = params.id;
  const [transport, setTransport] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!transport || !Number(transportId)) {
          setError(new Error("invalid transport ID"));
        }

        setLoading(true);

        const endpoint = `/transports/${transportId}`;

        const data = await fetchApiGet({ endpoint });

        setTransport(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (transportUpdatePayload: Partial<Transport>) => {
    try {
      setLoading(true);

      const endpoint = `/transports/${transportId}`;

      const formData = {
        name: transportUpdatePayload.name,
        description: transportUpdatePayload.description,
        peopleCapacity: transportUpdatePayload.peopleCapacity,
        type: transportUpdatePayload.type,
        photoUrl: transportUpdatePayload.photoUrl,
      };

      const data = await fetchApiPatch({
        endpoint,
        body: formData,
      });

      setTransport(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return "VETALIK LOADITSA...";
  }

  if (error) {
    return (
      <div>
        <p>Error:</p>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <TransportsLayout
      transportData={transport}
      onSubmit={onSubmit}
      submitButtonText={"Update"}
    />
  );
}
