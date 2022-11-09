
import {Img} from 'remotion'
import styled from 'styled-components'
import { spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const useAppearWithScaleAndBounce = (delay = 0): { scaleValue: number } => {
  const currentFrame = useCurrentFrame();

  const { fps } = useVideoConfig();

  const bounceAnimation = spring({
      frame: currentFrame - delay,
      from: 0,
      to: 1,
      fps,
      config: { damping: 10.5, stiffness: 160, mass: 0.6 },
  });

  return { scaleValue: bounceAnimation };
};

type BounceContainerProps = {
  // Children?: React.ReactNode;
  tier: string;
  subdivision: string;
  naRank?: string
  delay: number;
};

export const RankContainer: React.FC<BounceContainerProps> = ({tier, subdivision, naRank, delay}) => {
  const { scaleValue } = useAppearWithScaleAndBounce(delay);
  const rankImgUrl = `fankit/${tier.toLowerCase()}.png`
  return (
      <Container $scale={scaleValue} style={{
        position: "absolute",
        top: 400,
        width: "100%",
      }}>
        <Img src={staticFile(rankImgUrl)} style={{
          height: "400px",
        }} />
        <h4>
          {tier} {subdivision}
        </h4>
      </Container>
  );
};

const Container = styled.div<{ $scale: number }>`
  align-items: center;
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: ${({ $scale }: { $scale: number}) => `scale(${$scale})`};
`;