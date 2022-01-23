import './Sidemenu.css';
import {MenuList,AdminMenuList} from '../../Assets/Lists';
import { AppContext } from '../../App';
import {useState, useContext} from 'react';
import { useEffect } from 'react';
import { isAuthenticated } from '../../services/Auth_service';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
const Sidemenu = (props) => {
    // const [item, setItem] = useState(MenuList[0]);
    const appContext = useContext(AppContext);
    const user = appContext.user;
    const item=props.item;
    const setItem=props.setItem;
    function handleClick(menuitem){
        setItem(menuitem);
        MenuList.map((M)=>{
            if(M===menuitem){
                M.selected=true;
            } else{
                M.selected=false;
            }
        })
        // console.log(menuitem);
        // console.log(MenuList);
    }
    
    return ( 
        <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
    );
}
 
export default Sidemenu;