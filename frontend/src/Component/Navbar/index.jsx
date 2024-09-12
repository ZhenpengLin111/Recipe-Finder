import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../store/modules/user';
import LockIcon from '@mui/icons-material/Lock';


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const username = useSelector(state => state.user.userInfo.username || '')

    function logOut() {
        dispatch(clearUserInfo())
        navigate('/')
    }

    // For the user menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        // function to set visibility of navbar while scrolling
        const handleScroll = () => {
            // console.log('Scrolling...');
            if (window.scrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };
    return (
        <nav className={`Navbar ${isTransparent ? '' : 'NotTransparent'}`}>
            <div className="nav1">
                <div className='left-side'>
                    <FontAwesomeIcon icon={faUtensils} className='Utensils' />
                    <span>Recipe Finder</span>
                </div>
            </div>
            {!username ? <IconButton className='loginBtn' onClick={() => navigate('/landing')}>
                LOGIN
            </IconButton> :
                <div>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{username?.slice(0, 1)}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem className='menuItem' onClick={handleClose}>
                            <Link to="/profile" >
                                <Avatar /> Profile
                            </Link>
                        </MenuItem>
                        <MenuItem className='menuItem' onClick={handleClose}>
                            <Link to="/changePassword" >
                                <Avatar>
                                    <LockIcon />
                                </Avatar>
                                Change Password
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            }
            <input type='checkbox' className='menu-btn' id='menu-btn' checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
            <label htmlFor='menu-btn' className='menu-icon'>
                <span className='nav-icon'></span>
            </label>
            <ul className='nav-2'>
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/nutrientsSearch" onClick={handleLinkClick}>Search by Nutrients</Link></li>
                <li><Link to="/ingredientsSearch" onClick={handleLinkClick}>Search by Ingredients</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;