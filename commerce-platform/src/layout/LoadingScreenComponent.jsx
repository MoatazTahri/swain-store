import "../assets/css/loding-screen.css"
import {useEffect} from "react";

function LoadingScreenComponent() {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/home"
        }, 4000)
    }, []);
    return (
        <div id="loader">
            <video autoPlay={true} muted={true}>
                <source src="/logos/swain_logo_animation_1.mp4" type="video/mp4"/>
            </video>
        </div>
    );
}

export default LoadingScreenComponent;