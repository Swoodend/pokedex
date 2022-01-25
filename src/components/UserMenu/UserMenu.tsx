import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const UserMenu = () => {
    return (
        <Menu
            menuButton={<MenuButton><UserCircleIcon className="h-8 w-8" /></MenuButton>}
            direction="left"
            align="center"
            offsetX={-30}
            offsetY={46 }
            transition
        >
            <MenuItem>
                <Link to="/favourites">Favourites</Link>
            </MenuItem>
        </Menu>
    );
}

export default UserMenu;
