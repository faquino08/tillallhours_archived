import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
//import Jumb from "../components/jumbotron/jumbo.js"
import Jumb2 from "../components/jumbotron/module/jumbo.js"
//import BulletPitch from "../components/bullet-pitch/bullet_pitch.js"
import BulletPitch2 from "../components/bullet-pitch/module/bullet_pitch.js"
//import Short_About from "../components/short-about/short_about.js"
import Short_About2 from "../components/short-about/module/short_about.js"
import Short_Classes2 from "../components/short-classes/module/short_class.js"
//import Contact_Form from "../components/contact/contact.js"
import Contact_Form2 from "../components/contact/module/contact.js"
import { animated, useSpring } from "react-spring"
import styles from "./index.module.css"
import { layoutGenerator } from "react-break"
import { handleScroll, parallaxMultiplier } from "../services/scroll.js"

const IndexPage = () => {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [{ offset }, setPara] = useSpring(() => ({ offset: 0 }));
  const [paraMulti, setMulti] = useState(0.1);
  
  useEffect(() => {
    window.addEventListener("scroll", function() {
      handleScroll(containerRef, "parallax", 0, setPara)
    });
    window.addEventListener("resize", function() {
      parallaxMultiplier(containerRef, footerRef, setMulti)
    });

    if (document.readyState === "complete") {
      parallaxMultiplier(containerRef, footerRef, setMulti);
    } else {
      window.addEventListener("load", function() {
        parallaxMultiplier(containerRef, footerRef, setMulti)
      })
      return () => {
        window.removeEventListener("load", function() {
          parallaxMultiplier(containerRef, footerRef, setMulti)
        })
      }
    }

    return () => {
      window.removeEventListener("scroll", function() {
        handleScroll(containerRef, "parallax", 0, setPara)
      });
      window.removeEventListener("resize", function() {
        parallaxMultiplier(containerRef, footerRef, setMulti)
      })
    };
  });

  return (
    <div ref={containerRef}>
      <Layout>
        <SEO title="Home" />
        <Jumb2 />
        <animated.div
          className={styles.parallax}
          style={{
            transform: offset.interpolate(
              o => `translateY(${o * paraMulti}px)`
            ),
          }}
        >
          <BulletPitch2 />
          <Short_About2 />
          <Short_Classes2 />
        </animated.div>
        <div className={styles.bottom} ref={footerRef}>
          <Contact_Form2 />
          <footer>
            <div className="footing">
              © {new Date().getFullYear()}, Miss Lucy's Swim Academy
            </div>
          </footer>
        </div>
      </Layout>
    </div>
  )
};

export default IndexPage;
