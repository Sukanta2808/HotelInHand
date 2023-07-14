import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 46px auto;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Lucida Handwriting', cursive;
`;

const Tagline = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Papyrus', sans-serif;
`;

const CtaButton = styled.a`
  display: block;
  width: 200px;
  margin: 20px auto;
  text-align: center;
  background-color: #87A5FF;
  padding: 15px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  font-family: 'Recoleta', sans-serif;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Image = styled.img`
  width: calc(33% - 10px);
  height: auto;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  color: #666666;
  font-family: 'Recoleta', sans-serif;
`;

const LandingPage = () => {
  return (
    <div>
      <Container>
        <h1>Your Gateway to Memorable Stays</h1>
        <br/>
        <Tagline>
          <p style={{fontSize:'22px'}}>Discover a world of exceptional hospitality at your fingertips.</p>
        </Tagline>
        <CtaButton href="/home">Get Started</CtaButton>
        <br/>
        <Images>
          <Image
            src="https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_55_660x440.jpg"
            alt="Luxurious Hotel Room"
          />
          <Image
            src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/02/22223034/ChakraUrbanSpa1.jpg?w=1200&h=628&fill=blur&fit=fill"
            alt="Spa"
          />
          <Image
            src="https://media-cdn.tripadvisor.com/media/photo-s/22/33/a4/94/caption.jpg"
            alt="Restaurant"
          />
        </Images>
      </Container>

      <Footer>&copy; 2023 HotelInHand. All rights reserved.</Footer>
    </div>
  );
};

export default LandingPage;
