
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
      config: { damping: 19.5, stiffness: 200, mass: 0.3 },
  });

  return { scaleValue: bounceAnimation };
};

type ScreenshotContainerProps = {
  // Children?: React.ReactNode;
  img: string;
  text: string;
  delay: number;
};

export const ScreenshotContainer: React.FC<ScreenshotContainerProps> = ({img, text, delay}) => {
  const { scaleValue } = useAppearWithScaleAndBounce(delay);
  const rankImgUrl = img
  return (
      <Container $scale={scaleValue} style={{
        position: "absolute",
        width: "100%",
      }}>
        <Img src={staticFile(rankImgUrl)} style={{
          height: "800px",
        }} />
        <h4 style={{
          fontSize: "40px",
        }}>
          {text}
        </h4>
      </Container>
  );
};

export type Props = {
  children?: React.ReactNode;
  delay?: number;
}
export const SimpleContainer = ({children, delay}: Props) => {
  const { scaleValue } = useAppearWithScaleAndBounce(delay);
  return (
    <>
      <Container $scale={scaleValue} style={{
        position: "absolute",
        width: "100%",
      }}>
        {children}
      </Container>
    </>
  );
}

const Container = styled.div<{ $scale: number }>`
  align-items: center;
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: ${({ $scale }: { $scale: number}) => `scale(${$scale})`};
`;