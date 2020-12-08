export const Show = (props) =>  (
  <div className="show"> 
    <img src={props.image} alt={props.name} />
    <ul className="show-info">
      <li><h1>{ props.name }</h1></li>
      <li dangerouslySetInnerHTML={{ __html:props.summary }}></li>
      <li><button onClick={()=>props.goToShow(props.id)}>Go To Show</button></li>
    </ul>
  </div>         
)


