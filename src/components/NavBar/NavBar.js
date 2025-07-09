import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background: #000000;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: fixed;
  text-align: center;
  z-index: 9999;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Signature = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  font-size: 28px;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  flex-shrink: 0;
`;

const LocationTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #cccccc;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const GreenDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #00ff00;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 255, 0, 0.6);
`;

const LocationText = styled.span`
  font-weight: 300;
`;

const TimeText = styled.span`
  font-weight: 400;
  color: #4a9eff;
  margin-left: 8px;
`;

const ResumeButton = styled.a`
  background: linear-gradient(135deg, #4a9eff 0%, #0066cc 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 500;
  margin-right: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 80px;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 158, 255, 0.4);
    background: linear-gradient(135deg, #5aa3ff 0%, #1a75d9 100%);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
    min-width: 70px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 11px;
    min-width: 60px;
  }
`;
const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Nav data-aos="fade-down">
      <Signature>Gowtham</Signature>
      <RightSection>
        <LocationTimeContainer>
          <GreenDot />
          <LocationText>Ananthapur, Andhra Pradesh</LocationText>
          <TimeText>{formatTime(currentTime)}</TimeText>
        </LocationTimeContainer>
        <ResumeButton 
          href="https://drive.google.com/file/d/1uDWIBqIDaT9CFTJAgSMaqJd9AaztoUU2/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Řeșum̐e
        </ResumeButton>
      </RightSection>
    </Nav>
  );
};

export default Navbar;
