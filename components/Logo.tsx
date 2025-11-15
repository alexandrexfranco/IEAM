import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <img 
      src="https://firebasestorage.googleapis.com/v0/b/gen-code.appspot.com/o/images%2Fuser%2Fdd5a085b-801b-4bb2-ad38-ca652670d8a5.png?alt=media&token=c1303126-e713-43f9-8472-e16104276707" 
      alt="Igreja Evangélica Apostólica Missionária Logo"
      className={className}
    />
  );
};

export default Logo;
