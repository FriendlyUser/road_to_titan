import {Audio} from 'remotion'
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
import { ScreenshotContainer, SimpleContainer } from './Screenshots';



export const HyunwooVideo: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {

	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const openingDuration = fps*20;
	const buffsNerfsMeanMessageDuration = fps*20;
	// Length of video / playbackspeed, doubled
	const medalVideoI = fps*60/2;
	const medalVideoII = fps*60/2;
	const twitchClipDuration = fps*21;

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
						<RankContainer tier={hyunWooStats.tier} subdivision={hyunWooStats.subdivision} naRank={hyunWooStats?.naRank} delay={startFrame}/>
				</div>
			</>
		)
	}

	const renderBg = (img="imgs/bg.jpg", opacity= 0.25) => {
		return (
			<Img src={staticFile(img)} style={{
				opacity,
			}}/>
		)
	};

	const renderMedalVidsI = () => {
		const vidData = [
			{
				vidSrc: "vids/1625621478-medaltveternalreturnblacksurvival20210706183010.mp4",
				playbackSpeed: 4
			},
			{
				vidSrc: "vids/1625789769-medaltveternalreturnblacksurvival20210708171311.mp4",
				playbackSpeed: 4
			},
		]
		const [vid1, vid2] = vidData;
		const adjustedFrame = frame - openingDuration - buffsNerfsMeanMessageDuration;
		const vidsToShow = Math.floor((adjustedFrame / medalVideoI) * 2);
		let video1;
		let video2;
		if (vidsToShow === 0) {
			video1 = <Video src={staticFile(vid1.vidSrc)} playbackRate={2} style={{
				width: "50%"
			}}/>
			video2 = <Video src={staticFile(vid2.vidSrc)} playbackRate={2} style={{
				width: "50%"
			}}/>
			return (
				<>
					<div style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
					zIndex: 5,
					position: "absolute",
					height: "100%",
				}}>
						{video1}
						{video2}
				</div>
				</>
			);
		};
	}

	const renderMedalVidsII = () => {
		const vidData = [
			{
				vidSrc: "vids/1624767187-medaltveternalreturnblacksurvival20210626211107.mp4",
				playbackSpeed: 4		
			},
			{
				vidSrc: "vids/1636862969-medaltveternalreturnblacksurvival20211113200734-tr-edit.mp4",
				playbackSpeed: 4
			},
		]
		const [vid1, vid2] = vidData;
		return (
			<>
				<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
				zIndex: 5,
				position: "absolute",
				height: "100%",
			}}>
					<Video loop src={staticFile(vid1.vidSrc)} playbackRate={2} style={{
			width: "50%"
		}} />
					<Video loop src={staticFile(vid2.vidSrc)} playbackRate={2} style={{
			width: "50%"
		}}/>
			</div>
			</>
		);
	}

	const renderTwoVideosSeqWin = () => {
		return (
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
				zIndex: 5,
				position: "absolute",
				height: "100%",
			}}>
					<Video src={staticFile("vids/vod-1645684730-offset-19662.mp4")} style={{
						width: "50%"
					}} volume={0}/>
				<Video src={staticFile("vids/vod-1645799798-offset-9696.mp4")} style={{
						width: "50%"
					}} volume={0}/>
				<Audio src={staticFile("fankit/hyunwoo_firstMove_1_en.wav")} volume={0.9}/>
			</div>
		)
	}

	const renderScreenshots = () => {

		const screenshotsData = [
			{
				imgSrc: "imgs/hyunwoo_nerf_16.png",
				text: "Hyunwoo nerfed, does no damage now."		
			},
			{
				imgSrc: "imgs/hyunwoo_nerf_again.png",
				text: "Hyunwoo nerfed again, cant burst people now."
			},
			{
				imgSrc: "imgs/hyunwoo_nerf40_0.png",
				text: "Hyunwoo nerfed again, cant burst people now 2."
			},
			{
				imgSrc: "imgs/bulliedByGamer.png",
				text: "Bad gamer here cant win erbs.",
				audioSrc: "fankit/hyunwoo_firstMove_2_en.wav"
			}
		]
		const adjustedFrame = frame - openingDuration;
		const screenToShow = Math.floor((adjustedFrame / buffsNerfsMeanMessageDuration) * screenshotsData.length);

		const screenshotInfo = screenshotsData[screenToShow];
		const startFrame = screenToShow * buffsNerfsMeanMessageDuration / screenshotsData.length;
		if (!screenshotInfo) {
			return null;
		}
		return (
			<>	
					<ScreenshotContainer img={screenshotInfo.imgSrc} text={screenshotInfo.text} delay={startFrame}/>
					<Audio loop src={staticFile("fankit/hyunwoo_firstMove_2_en.wav")} volume={1}/>
			</>
		);
	}

	const renderShowTitanLevel = () => {
		const headingOpacity = interpolate(frame, [0, 10*fps], [1, 0.25]);
		return (
			<>
			<div style={{
				position: "absolute",
				zIndex: 5,
				width: "100%",
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
					}}>Season 7</h1>
						<h6 
							style={{
								color: titleColor,
								fontSize: 60,
								textAlign: 'center',
								position: 'absolute',
								top: 300,
								width: '100%',
								// Opacity: (endFrame - startFrame) / (frameDuration),
								// Transform: `scale(${bounceAnimation})`,
							}}>
								336 Games
						</h6>
						<RankContainer tier="titan" subdivision="" naRank="24" delay={0}/>
				</div>
			</>
		)
	};

	return (
		<>
			<Audio volume={0.19} src={staticFile("fankit/er_instrumental.mp3")} />
				{/* A bunch of stuff rendered to show the color stuff */}
				<Sequence durationInFrames={openingDuration}>
					<AbsoluteFill>
						{renderBg()}
					</AbsoluteFill>
					{renderSeasonText()}
				</Sequence>

				<Sequence from={openingDuration} durationInFrames={buffsNerfsMeanMessageDuration}>
					{renderScreenshots()}
				</Sequence>

				<Sequence from={openingDuration +buffsNerfsMeanMessageDuration} durationInFrames={medalVideoI}>
					{renderMedalVidsI()}
					<AbsoluteFill style={{
						zIndex: 1,
					}}>
						{renderBg("fankit/ER_3840x2160.png", 0.5)}
					</AbsoluteFill>
				</Sequence>
				<Sequence from={openingDuration +buffsNerfsMeanMessageDuration+ medalVideoI} durationInFrames={medalVideoI}>
					{renderMedalVidsII()}
					<AbsoluteFill style={{
						zIndex: 1,
					}}>
						{renderBg("fankit/ER_3840x2160.png", 0.5)}
					</AbsoluteFill>
				</Sequence>

				<Sequence from={openingDuration+buffsNerfsMeanMessageDuration+medalVideoI*2} durationInFrames={twitchClipDuration}>
					{renderTwoVideosSeqWin()}
					<AbsoluteFill style={{
						zIndex: 1,
					}}>
						{renderBg("fankit/ER_3840x2160.png", 0.5)}
					</AbsoluteFill>
				</Sequence>
				<Sequence from={openingDuration+buffsNerfsMeanMessageDuration+medalVideoI*2+twitchClipDuration} durationInFrames={fps*10}>
					{renderShowTitanLevel()}
					<AbsoluteFill style={{
						zIndex: 1,
					}}>
						{renderBg("fankit/ER_3840x2160.png", 0.5)}
					</AbsoluteFill>
				</Sequence>
		</>
	);
};
