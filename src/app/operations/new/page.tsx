"use client";

import TransportForm from "@/app/transports/common/components/transport-form";
import { Transport } from "@/app/transports/common/types/transport.type";
import { fetchApiPost } from "@/common/services/fetch-api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OperationNewLayout() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
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
      // @ts-ignore
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return "VETALIK LOADITSA...";
  }

  if (errorMessage) {
    return (
      <div>
        <p>Error: ${errorMessage}</p>
      </div>
    );
  }

  return (
    <TransportForm isNew onSubmit={onSubmit} submitButtonText={"Create"} />
  );
}
