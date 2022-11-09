import {Video} from 'remotion'
import {Img, spring, staticFile} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import seasonsP1 from '../public/stats/seasons_p1.json'
import {RankContainer} from './ranks/index';



export const HyunwooVideo: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {

	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const openingDuration = 30*20;

	const renderSeasonText = () => {
		// Center div with transitioning appearing text

		// show opacity: (frame - (wordStart * videoConfig.fps)) / (videoConfig.fps * 0.5),
		// 3 seasons to start split by 1/3 openingDuration
		const seasonToShow = Math.floor((frame / openingDuration) * 3);
		const seasonData = seasonsP1[seasonToShow];
		if (!seasonData) {
			return null;
		}
		const seasonName = seasonData.name;
		const hyunWooStats = seasonData.games[0]
		const startFrame = seasonToShow * openingDuration / 3;
		const endFrame = startFrame + openingDuration / 3;

    const bounceAnimation = spring({
        frame,
        from: 0,
        to: 1,
        fps,
        config: { damping: 10.5, stiffness: 160, mass: 0.6 },
    });

		const headingOpacity = interpolate(frame, [startFrame, endFrame], [1, 0.25]);

		const textOpacity = interpolate(frame, [startFrame, startFrame +10, startFrame + 20, startFrame +25, endFrame], [0.25, 0.75, 0.6, 0.5, 0.4]);
		return (
			<>
				<div style={{
				}}>
					<h1 style={{
						opacity: headingOpacity,
						fontWeight: 'bold',
						fontSize: 100,
						textAlign: 'center',
						position: 'absolute',
						top: 100,
						width: '100%',
						// Transform: 'translateY(-50%)',
					}}>{seasonName}</h1>
						<h6 
							style={{
								color: titleColor,
								fontSize: 60,
								textAlign: 'center',
								position: 'absolute',
								top: 300,
								width: '100%',
								// Opacity: (endFrame - startFrame) / (frameDuration),
								opacity: textOpacity,
								// Transform: `scale(${bounceAnimation})`,
							}}>
								{hyunWooStats.hyunwoo} Games
						</h6>
						<RankContainer tier={hyunWooStats.tier} subdivision={hyunWooStats.subdivision} naRank={hyunWooStats?.naRank || undefined} />
				</div>
			</>
		)
	}

	const renderBg = (opacity= 0.25) => {
		return (
			<Img src={staticFile("imgs/bg.jpg")} style={{
				opacity,
			}}/>
		)
	};

	const renderTwoVideosSeq1 = () => {
		return (
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
			}}>
					<Video src={staticFile("vids/vod-1645684730-offset-19662.mp4")} style={{
						width: "50%"
					}} volume={0}/>
				<Video src={staticFile("vids/vod-1645799798-offset-9696.mp4")} style={{
						width: "50%"
					}} volume={0}/>
			</div>
		)
	}
	return (
		<>
				{/* A bunch of stuff rendered to show the color stuff */}
				<Sequence durationInFrames={openingDuration}>
					<AbsoluteFill>
						{renderBg()}
					</AbsoluteFill>
					{renderSeasonText()}
				</Sequence>

				<Sequence from={openingDuration} durationInFrames={30*21}>
					<AbsoluteFill>
						{renderBg()}
					</AbsoluteFill>
					{renderTwoVideosSeq1()}
				</Sequence>
		</>
	);
};
