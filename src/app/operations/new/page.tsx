"use client";

import { fetchApiGet, fetchApiPost } from "@/common/services/fetch-api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Operation } from "@/app/operations/common/types/Operation.type";
import OperationForm from "@/app/operations/common/components/operation-form";

export default function OperationNewLayout() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [availableTransports, setAvailableTransports] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const transportsEndpoint = `/transports`;
        const transportData = await fetchApiGet({
          endpoint: transportsEndpoint,
        });
        setAvailableTransports(
          transportData.map(({ id, name }) => ({ id, name })),
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (operationsUpdatePayload: Partial<Operation>) => {
    try {
      setLoading(true);

      const endpoint = `/operations`;

      const formData = {
        name: operationsUpdatePayload.name,
        description: operationsUpdatePayload.description,
        date: operationsUpdatePayload.date,
        type: operationsUpdatePayload.type,
        status: operationsUpdatePayload.status,
        photoUrl: operationsUpdatePayload.photoUrl,
        transports: (operationsUpdatePayload.transports || []).map(
          ({ id }) => id,
        ),
        ...(operationsUpdatePayload.latitude && {
          latitude: operationsUpdatePayload.latitude,
        }),
        ...(operationsUpdatePayload.longitude && {
          latitude: operationsUpdatePayload.longitude,
        }),
      };

      await fetchApiPost({
        endpoint,
        body: formData,
      });

      router.back();
    } catch (error) {
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
    <OperationForm
      isNew
      onSubmit={onSubmit}
      submitButtonText={"Create"}
      availableTransports={availableTransports}
    />
  );
}
