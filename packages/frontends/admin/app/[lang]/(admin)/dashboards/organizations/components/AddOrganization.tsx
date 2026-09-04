"use client";

export const AddOrganization = () => {
  const handleAddNewOrganization = () => {
    window.location.href = '/dashboards/organizations/new';
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleAddNewOrganization()}>
        Add New Organization
      </button>
    </div>
  );
}
