import React from 'react';
import { Layout } from 'components/sections/layout';
import { styled } from 'theme';
import { Panel, Button } from 'components/ui';
import { useAavegotchi } from 'context/AavegotchiContext';
import router from 'next/router';

const Grid = styled.section`
  display: grid;
  gap: 3.2rem;

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQueries.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.light2};
  padding: 2.4rem;
  color: ${({ theme }) => theme.colors.dark0};

  :hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primaryAccent};
  }

  p {
    margin: 0;
  }
`

const PlayButtonContainer = styled.div`
  padding-top: 2.4rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Home = () => {
  const { state: { selectedAavegotchiId }} = useAavegotchi();

  return (
    <Layout>
      <Panel>
      <h1>*DEMO* WAGMI Warriors Minigame</h1>
        <p>This is the working page for the first aavegotchi guild collaboration game! This site will be re-deployed frequently as game mechanics are developed and community designs are implemented!  </p>
        <p>Connect your wallet from the button in the top right, then select your gotchi. If you get a diamond error that won't clear, there may be issues with the sidviews on one of your gotchis. unequip from the main aavegotchi website to fix temporarily. wearables with known issues are the pirate hook, pajama shirt and the princess hair. </p> 
      <h2>Controls:</h2>
        <p>move left = A or left arrow,   move right = D or right arrow,   move up = W or right arrow,  move down = S or down arrow</p>
      </Panel>
      <PlayButtonContainer>
        <Button
          disabled={!selectedAavegotchiId}
          primary
          onClick={() => router.push('/play')}
        >
          PLAY
        </Button>
      </PlayButtonContainer>
    </Layout>
  )
}

export default Home;