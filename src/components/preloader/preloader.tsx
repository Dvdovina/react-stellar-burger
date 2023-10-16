import { ThreeCircles } from 'react-loader-spinner'
import preloaderStyles from './preloader.module.css'


function Preloader() {
    return (
        <div className={preloaderStyles.main}>
            <ThreeCircles
                height="300"
                width="300"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="violet"
                innerCircleColor="skyblue"
                middleCircleColor="lightblue"
            />
        </div>
    );
}

export default Preloader;