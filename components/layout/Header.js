import React, { useState, cloneElement } from 'react';
import Link from 'components/Link';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	Grid,
	AppBar,
	Toolbar,
	Typography,
	List,
	ListItem,
	ListItemText,
	SwipeableDrawer,
	IconButton,
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HelpIcon from '@material-ui/icons/Help';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LockIcon from '@material-ui/icons/Lock';
import LanguageIcon from '@material-ui/icons/Language';
import WebIcon from '@material-ui/icons/Web';

import { routes } from 'data/routes';
import head from '../../css/header.module.css';

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: `4.5em`,
		[theme.breakpoints.down('md')]: {
			marginBottom: '4em',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '2em',
		},
	},
	logo: {
		color: theme.palette.secondary.main,
		width: 'max-content',
		fontSize: '1.5rem',
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		padding: 0,
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	drawerIcon: {
		height: `30px`,
		width: `30px`,
		color: `#fff`,
	},
	drawer: {
		backgroundColor: theme.palette.secondary.main,
		padding: '0 6em',
	},
	link: {
		fontSize: '1.25em',
		color: theme.palette.secondary.main,
		'&:hover': {
			color: theme.palette.info.main,
		},
	},
	appBar: {},
}));

const Header = () => {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const [openDrawer, setOpenDrawer] = useState(false);

	const [openDrop, setOpenDrop] = useState(false);

	const [active, setActive] = useState('main');

	const router = useRouter();

	const path = routes;

	const tabs = (
		<>
			<Grid container justify='flex-end' spacing={4}>
				{path.map(({ name, link }) => (
					<Grid item key={link}>
						<Link href={link}>
							<Typography
								className={classes.link}
								style={{
									fontWeight: router.pathname === link && 'bold',
									borderBottom: router.pathname === link && '1px solid #757ce8',
								}}>
								{name}
							</Typography>
						</Link>
					</Grid>
				))}
			</Grid>
		</>
	);
	const drawer = (
		<>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
				anchor='right'>
				<List disablePadding>
					{path.map(({ name, link }) => (
						<ListItem
							key={link}
							divider
							button
							onClick={() => {
								setOpenDrawer(false);
							}}>
							<ListItemText disableTypography>
								<Link href={link}>
									<Typography
										style={{
											color:
												router.pathname === link
													? 'primary'
													: 'rgb(107 107 107)',
											fontWeight: router.pathname === link && 'bold',
										}}>
										{name}
									</Typography>
								</Link>
							</ListItemText>
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
			<IconButton
				onClick={() => setOpenDrawer(!openDrawer)}
				className={classes.drawerIconContainer}>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</>
	);
	return (
		<>
			<ElevationScroll>
				<AppBar className={classes.appBar}>
					<Toolbar
						disableGutters
						style={{
							maxWidth: '1280px',
							margin: '0 auto',
							width: '100%',
							padding: matches ? '0 16px' : '0 24px',
						}}>
						<Link href='/'>
							<Typography className={classes.logo}>Material-UI</Typography>
						</Link>
						{matches ? (
							drawer
						) : (
							<Grid container justify='flex-end'>
								<nav className={head.root}>
									<ul className={head.nav}>
										<li>
											<AddIcon />
										</li>
										<li>
											<WhatsAppIcon />
										</li>
										<li>
											<NotificationsIcon />
										</li>
										<li
											onClick={() => {
												setOpenDrop(!openDrop);
											}}>
											<ArrowDropDownIcon />
										</li>
									</ul>
									{openDrop ? (
										<div className={head.drop}>
											{active === 'main' ? (
												<div>
													<ul onClick={() => setActive('settings')}>
														<li>
															<SettingsIcon />
														</li>
														<li>Settings &amp; Privacy</li>
														<li>
															<ArrowForwardIosIcon />
														</li>
													</ul>
													<ul>
														<li>
															<HelpIcon />
														</li>
														<li>Help &amp; Support</li>
														<li>
															<ArrowForwardIosIcon />
														</li>
													</ul>

													<ul>
														<li>
															<Brightness3Icon />
														</li>
														<li>Display &amp; Accessiblity</li>
														<li>
															<ArrowForwardIosIcon />
														</li>
													</ul>
												</div>
											) : (
												<div>
													{' '}
													<ul onClick={() => setActive('main')}>
														<li>
															<ArrowBackIcon />
														</li>
														<li>Go Back</li>
														<li></li>
													</ul>
													<ul>
														<li>
															<LockIcon />
														</li>
														<li>Privacy Shortcuts</li>
														<li></li>
													</ul>
													<ul>
														<li>
															<WebIcon />
														</li>
														<li>Activity Log</li>
														<li></li>
													</ul>
													<ul>
														<li>
															<LanguageIcon />
														</li>
														<li>Language</li>
														<li></li>
													</ul>
												</div>
											)}
										</div>
									) : (
										''
									)}
								</nav>
							</Grid>
						)}
					</Toolbar>
				</AppBar>
			</ElevationScroll>

			<div className={classes.toolbarMargin} />
		</>
	);
};

const NavItem = ({ icon }) => {
	return <li>{icon}</li>;
};

export default Header;
