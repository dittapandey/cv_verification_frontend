const Button = (props) => {
    const bg_color=props.bg_color;
    const fg_color=props.fg_color;
    const text=props.text;
    const handleClick = props.handleClick;
    
    return ( 
        <div className="button">
            <button className="btn" onClick={()=>{handleClick()}}
                style={{
                    color:fg_color,
                    backgroundColor:bg_color,
                    borderRadius:"1ch",
                    padding:"10px 15px",
                    borderStyle:"none",

                }}
            >{text}</button>
        </div>
     );
}
 
export default Button;