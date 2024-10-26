"use client";

import TransportsLayout from "@/app/transports/common/components/transport-form";
import { Transport } from "@/app/transports/common/types/transport.type";
import { fetchApiPost } from "@/common/services/fetch-api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransportNewLayout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit = async (transportUpdatePayload: Partial<Transport>) => {
    try {
      const endpoint = `/transports`;

      const formData = {
        name: transportUpdatePayload.name,
        description: transportUpdatePayload.description,
        peopleCapacity: transportUpdatePayload.peopleCapacity,
        type: transportUpdatePayload.type,
        photoUrl: transportUpdatePayload.photoUrl,
      };

      const data = await fetchApiPost({
        endpoint,
        body: formData,
      });

      router.back();
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
        <div className="">{JSON.stringify(error)}</div>
      </div>
    );
  }

  return (
    <TransportsLayout isNew onSubmit={onSubmit} submitButtonText={"Create"} />
  );
}
