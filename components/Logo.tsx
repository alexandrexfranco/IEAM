import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <img
      src="https://i.ibb.co/C52Cn87S/LOGO-IEM-Transpar-ncia.png"
      alt="Igreja Evangélica Apostólica Missionária Logo"
      className={className}
    />
  );
};

export default Logo;