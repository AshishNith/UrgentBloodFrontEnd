import React from 'react';

const CallDonor = () => {
  // Handle the call functionality
  const handleCall = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const donorPhoneNumber = '+919934225353'; // Fixed phone number

    if (isMobile) {
      const confirmCall = window.confirm(`Do you want to call ${donorPhoneNumber}?`);
      if (confirmCall) {
        window.location.href = `tel:${donorPhoneNumber}`;
      }
    } else {
      alert('Please use a mobile device to call the donor.');
    }
  };

  // Render the call button
  return (
    <div className="text-center">
      <button
        onClick={handleCall}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
        aria-label="Call Donor"
      >
        Call Donor
      </button>
    </div>
  );
};

export default CallDonor;