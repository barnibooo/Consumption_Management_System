import React, { useState } from "react";
import UnauthorizedMessage from "./UnauthorizedMessage";

const App = () => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const triggerUnauthorizedMessage = () => {
    setIsUnauthorized(true);
  };

  return (
    <div>
      <button onClick={triggerUnauthorizedMessage}>
        Trigger Unauthorized Alert
      </button>
      <UnauthorizedMessage
        isUnauthorized={isUnauthorized}
        setIsUnauthorized={setIsUnauthorized}
      />
    </div>
  );
};

export default App;
