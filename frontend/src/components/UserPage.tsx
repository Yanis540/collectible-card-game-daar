import { useEffect, useState } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import '../css/Sets.css'; 
import '../css/UsersCard.css'; 



function UserPage(){
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getUsers');
            setUsers(response.data);
          } catch (error) {
            console.error('Error while fetching users:', error);
          }
        };
                
        fetchData();
    }, []);

    return (
      <div className=" gap-y-4  py-8  w-full max-w-[1300px] mx-auto ">
        <h1 className="text-gray-200 font-bold text-4xl py-4 text-center">Owners ({users?.length})</h1>
        <CardGroup className="">
            {users?.map((user, index) => (
                <Link key={index}to={`/userCards/${user}`} state={{ userId: user }} >
                <Card  className="" onClick={()=>console.log("hiiii")}>
                <Card.Img variant="top" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/41d3ac77-2823-4e18-8910-a48de63acf87/d8xl0ja-ca02368b-643f-42f4-9721-f3895e14690d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQxZDNhYzc3LTI4MjMtNGUxOC04OTEwLWE0OGRlNjNhY2Y4N1wvZDh4bDBqYS1jYTAyMzY4Yi02NDNmLTQyZjQtOTcyMS1mMzg5NWUxNDY5MGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dUhAjPqt1Rkudg3gHjqPNOQAuaA2wmXZ7T-Lq6L28O8" /> 
                <Card.Body>
                  <Card.Title>User #{index}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{user}</small>
                </Card.Footer>
                </Card>
                </Link>

            ))}
        </CardGroup>
      </div>

       
    )
}

export default UserPage;