import '../css/Styles.css'; 
import SearchBar from './SearchBar'; 
import Lottie from 'react-lottie';
import animationData from './lotties/pikachu.json';

function HomePage() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <div className="flex flex-1 flex-col items-center gap-y-8 py-4">
            <h1 className="font-bold text-3xl md:text-4xl  ">Welcome to Pokémon TCG</h1>
           
            <div>
            <Lottie 
                options={defaultOptions}
                height={300}
                width={300}
            />
            </div>
        </div>
    );
}

export default HomePage;
