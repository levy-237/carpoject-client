import {
  fetchMyListingsById,
  myListingFetchToEditForm,
} from "@/lib/listings-my";
import ListingForm from "@/components/add-listings/ListingForm";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const response = await fetchMyListingsById(parseInt(id));

  if (!response.success) {
    return <div>Error: {response.message}</div>;
  }

  return (
    <ListingForm
      listing={myListingFetchToEditForm(response)}
      variant="edit"
      id={parseInt(id)}
    />
  );
}
