import { useRef, useEffect } from "react";
import styles from "../page.module.css";

export default function Video() {
    const videoRef = useRef(null);

    useEffect(() => {
        // some browsers still require a direct call to play(), even if muted
        if (videoRef.current) {
            const vid = videoRef.current;
            vid.play().catch(() => {
                // ignore failures; autoplay may be blocked
            });
        }
    }, []);

    return (
        <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
        >
            <source src="/img/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
