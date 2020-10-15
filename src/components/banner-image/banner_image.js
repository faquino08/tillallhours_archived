import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./banner_image.module.css"
import Jumbotron from "react-bootstrap/Jumbotron"

const BannerImage = (props) => (
    <Jumbotron className={styles.banner}>
        <div>
            <h1>
                <b className={styles.divider}>|</b>{props.title}
            </h1>     
        </div>
        {props.children}
    </Jumbotron>
)

export default BannerImage;