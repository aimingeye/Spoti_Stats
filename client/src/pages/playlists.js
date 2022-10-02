import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Container,
	Typography,
	Grid,
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Tab,
	Tabs,
	Button,
	Hidden,
} from '@material-ui/core';
import { spotify } from '../spotify';
import { AppContext } from '../contexts/AppContext';
import { parseQueryParams } from '../utils';

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%',
		height: 160,
	},
	cardContent: {
		flexGrow: 1,
	},
	header: {
		marginBottom: theme.spacing(4),
	},
	title: {
		fontWeight: 'bold',
	},
	artistName: {
		fontWeight: 'bold',
	},
	tabs: {
		backgroundColor: theme.palette.action.active,
	},
	buttons: {
		marginTop: theme.spacing(3),
	},
}));

const TopPlaylists = ({ history }) => {
	const classes = useStyles();
	const [playlist, setplaylists] = useState([]);
	const [limit, setLimit] = useState(20);
	const [offset, setOffset] = useState('');
	const [hideLoadMore, setHideLoadmore] = useState(false);
	const [loadMoreText, setLoadMoreText] = useState('Load More');
	const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);
	const { isLoading, setIsLoading } = useContext(AppContext);

	const [selectedTab, setSelectedTab] = useState('long_term');

	const handleChange = (_, newValue) => {
		setSelectedTab(newValue);
	};

	useEffect(() => {
		async function fetchTopPlaylists() {
			try {
				const res = await spotify().getUserPlaylists({
					time_range: selectedTab,
					limit,
				});
        //console.log(res.items[0]);
        
        //console.log(res.items[0].id);
				setplaylists(res.items);
				if (res.next) {
					const q = parseQueryParams(res.next);
					setOffset(+q.get('offset'));
					setLimit(+q.get('limit'));
					setHideLoadmore(false);
				} else {
					setHideLoadmore(true);
				}
			} catch (e) {}
			setIsLoading(false);
		}
		fetchTopPlaylists();
	}, [limit, selectedTab, setIsLoading]);


  
	return (
		
		<React.Fragment>
			{!isLoading && (
				<Container maxWidth="lg">
					<Box className={classes.header}>
						<Grid
							container
							direction="row"
							alignItems="flex-start"
							justify="space-between"
						>
							<Grid item>
								<Typography variant="h4" className={classes.title}>
									Top Playlist
								</Typography>
							</Grid>
						</Grid>
					</Box>
					<Grid container spacing={4}>
						{playlist.map(playlist => (
							<Grid item key={playlist.id} xs={12} sm={6} md={3}>
								<Card
									className={classes.card}
									onClick={() => history.push(`/playlists/${playlist.id}`)}
								>
                  
									<CardActionArea>
										<CardMedia
											image={playlist.images[0].url}
											className={classes.cardMedia}
											title="Image title"
										/>
										<CardContent className={classes.cardContent}>
											<Typography
												variant="subtitle1"
												className={classes.playlistName}
											>
												{playlist.name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			)}
		</React.Fragment>
		
	);
};

export default TopPlaylists;
