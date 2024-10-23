import React, { useState } from "react";

const LogoutComponent = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Function to handle the actual logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.href = "/";
    setShowConfirmDialog(false);
  };

  return (
    <div>
      <button
        className="logout-button"
        onClick={() => setShowConfirmDialog(true)}
      >
        Odlhásit se
      </button>
      {showConfirmDialog && (
        <div className="logout-dialog">
          <p className="logout-message">Určitě se chceš odhlásit?</p>
          <div className="logout-actions">
            <button className="logout-confirm-button" onClick={handleLogout}>
              Ano
            </button>
            <button
              className="logout-cancel-button"
              onClick={() => setShowConfirmDialog(false)}
            >
              Ne
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutComponent;
