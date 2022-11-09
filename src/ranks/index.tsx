
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
};

export const RankContainer: React.FC<BounceContainerProps> = ({tier, subdivision, naRank}) => {
  const { scaleValue } = useAppearWithScaleAndBounce();
  const rankImgUrl = `fankit/${tier.toLowerCase()}.png`
  console.log("rank_img", rankImgUrl)

  const rankImg = staticFile(rankImgUrl);
  return (
      <Container $scale={scaleValue}>
        <Img src={staticFile(rankImg)} />
        <h4>
          {tier} {subdivision} / {naRank}
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