import { Link } from 'react-router-dom';
import '../css/Styles.css'; 

function NavBar() {
  const urls = [
    {name:"Home",href:"/"},
    {name:"Sets",href:"/sets"},
    {name:"Users",href:"/users"},
    {name:"Mint",href:"/mint"},
  ]
  return (
    <div className="flex flex-row items-center justify-center gap-x-10 py-4 mx-auto border-b-[1px] border-gray-600 ">
      {urls.map((url,i)=>(
        <Link key={i} to={url.href}  className="border-[1px] border- py-2 px-4 rounded-lg bg-slate-500 border-slate-500 hover:bg-slate-500/10 transition-all duration-150" > {url.name}</Link>
      ))}
    
    </div>
  );
}

export default NavBar;
