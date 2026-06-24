import AddListingForm from "@/components/add-listings/ListingForm";

export default function AddListingsPage() {
  return (
    <main className="flex flex-1 justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-4xl">
        <AddListingForm />
      </div>
    </main>
  );
}
