import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./banner_image.module.css"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"

function BannerImage(props) {
  var overStyles = {
    backgroundColor: props.back !== undefined
      ? `${props.back}` : "black",
    filter: props.pct !== undefined
      ? `opacity(${props.pct}%)` : "opacity(35%)"
  }


  return (
    <div
      className={styles.bannerImgOver}
      style={{
        backgroundColor: props.back !== undefined ? `${props.back}` : "black",
        filter:
          props.pct !== undefined ? `opacity(${props.pct}%)` : "opacity(35%)",
        height: props.height !== undefined ? `${props.height}vw`: "35vw"
      }}
    >
      <h1>
        <b className={styles.divider}>|</b>
        {props.title}
      </h1>
      <BackgroundImage
        className={styles.banner}
        fluid={props.imageData}
        backgroundColor={`#040e18`}
      />
    </div>
  )
}

const StyledBannerImage = styled(BannerImage)`
  width: 100%;
  background-position: center center;
  background-repeat: repeat-y;
  background-size: cover;
`

export default StyledBannerImage