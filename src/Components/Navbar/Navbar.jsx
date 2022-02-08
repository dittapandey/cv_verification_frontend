import './Navbar.css'
const Navbar = () => {
  const user_name ="John Smith"
  return ( 
    <div className="navbar">
      <div className="left-navbar">
        <div className="sub-navbar">
          <img className="iitg-logo" src="/iitg-logo.png" alt="image" />
        </div>
        <div className="site-title">CV VERIFICATION PORTAL</div>
      </div>
      <div className="right-navbar">
        <div className="sub-navbar">
          Welcome {user_name}
        </div>
        <div className="sub-navbar">
          Profile
        </div>
        <div className="sub-navbar">
          LOGOUT
        </div>
      </div>
    </div>
   );
}
 
export default Navbar;