"use client";
import { useParams } from "next/navigation";
import TransportsLayout from "@/app/transports/common/components/transport-form";
import { useEffect, useState } from "react";
import { fetchApi, fetchApiGet } from "@/common/services/fetch-api";

export default function TransportByIdLayout() {
  const params = useParams();
  const transportId = params.id;
  const [transport, setTransport] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const endpoint = `/transports/${transportId}`;

        const data = await fetchApiGet({ endpoint });

        setTransport(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (transportUpdatePayload) => {};

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

  return <TransportsLayout transportData={transport} onSubmit={onSubmit} />;
}
