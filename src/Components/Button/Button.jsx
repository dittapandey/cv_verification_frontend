const Button = (props) => {
    const bg_color=props.bg_color;
    const fg_color=props.fg_color;
    const text=props.text;
    const handleClick = props.handleClick;
    
    return ( 
        <div className="button">
            <button className="btn" onClick={()=>{handleClick()}}
                on
                style={{
                    color:fg_color,
                    backgroundColor:bg_color,
                    borderRadius:"1ch",
                    padding:"10px 15px",
                    borderStyle:"none",
                    fontSize:"20px",
                    boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)"
                }}
            >{text}</button>
        </div>
     );
}
 
export default Button;