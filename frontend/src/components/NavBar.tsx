import { Link } from 'react-router-dom';
import '../css/Styles.css'; 

function NavBar() {
  const urls = [
    {name:"Sets",href:"/sets"},
    {name:"Users",href:"/users"},
    {name:"Mint",href:"/mint"},
  ]
  return (
  <div className="flex flex-row  justify-center w-full">
    <div className="flex flex-row items-center py-4  max-w-[1300px] w-full border-b-[1px] border-gray-600">
      <Link to="/" >
        <img className="h-10 w-10  " src={"https://www.pokepedia.fr/images/thumb/7/76/Pikachu-DEPS.png/615px-Pikachu-DEPS.png?20220418180124"} alt="pika pika"/> 
      </Link>
      <div className="flex-1 flex flex-row items-center justify-center gap-x-10  ">
        {urls.map((url,i)=>(
          <Link key={i} to={url.href}  className="py-2 px-4 rounded-lg  transition-all duration-150" > {url.name}</Link>
        ))}
      </div>
      <img className="h-10 w-10 rounded-full cursor-pointer" src={"https://github.com/shadcn.png"} alt="img"/> 
    </div>
    </div>
  );
}

export default NavBar;
