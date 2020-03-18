import React from "react"
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
import Short_Classes2 from "../components/short-classes/module/short_classes.js"
//import Contact_Form from "../components/contact/contact.js"
import Contact_Form2 from "../components/contact/module/contact.js"
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

const IndexPage = () => (
  <Parallax pages={1.7}>
    <Layout>
      <SEO title="Home" />
      <ParallaxLayer speed={0.5} offset={0}>
        <Jumb2 />
      </ParallaxLayer>
      <ParallaxLayer speed={1.5} offset={0.9999}>
        <BulletPitch2 />
        <Short_About2 />
        <Short_Classes2 />
        <Contact_Form2 />
      </ParallaxLayer>
    </Layout>
  </Parallax>
)

export default IndexPage
