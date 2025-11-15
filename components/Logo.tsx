import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <img 
      src="https://firebasestorage.googleapis.com/v0/b/gen-code.appspot.com/o/images%2Fuser%2F5326b485-8a27-46e3-a4c8-47752e5d5904.png?alt=media&token=e9391bd3-7d9a-42c2-841f-502a83852026" 
      alt="Igreja Evangélica Apostólica Missionária Logo"
      className={className}
    />
  );
};

export default Logo;