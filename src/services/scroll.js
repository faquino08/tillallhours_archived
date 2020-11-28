//Scroll Listener
/*const handleScrollbase = () => {
  const posY = window.innerHeight
  let bottom = ref.current.getBoundingClientRect().bottom
  let top = ref.current.getBoundingClientRect().top
  if (bottom <= posY) {
    setToggle(true)
  } else if (top * 1.1 > posY) {
    setToggle(false)
  }
}*/

const isBrowser = typeof window !== `undefined`

export function handleScroll (ref, triggertype, ratio, setFunc ) {
    if(isBrowser) {
      const posY = window.innerHeight;
      let command = triggertype.toLowerCase();
      switch (command) {
        case "parallax":
          if ((ref.current !== null) && (ref.current !== undefined)) {
            let offset = 0 - ref.current.getBoundingClientRect().top
            setFunc({ offset })
          }
          break
        case "standard":
          if ((ref.current !== null) && (ref.current !== undefined)) {
            let standardTop = ref.current.getBoundingClientRect().top
            let standardBottom = ref.current.getBoundingClientRect().bottom
            let triggerLoc = (standardTop + standardBottom) / ratio
            if (triggerLoc <= posY) {
              setFunc(true)
            } else if (triggerLoc > posY) {
              setFunc(false)
            }
          }
          break
        case "simple":
          if ((ref.current !== null) && (ref.current !== undefined)) {
            let simpleTop = ref.current.getBoundingClientRect().top
            let simpleBottom = ref.current.getBoundingClientRect().bottom
            let triggerTop = 1 + ratio / 100
            let triggerBottom = 1 - ratio / 100
            if (simpleTop * triggerTop <= posY) {
              setFunc(true)
            } else if (simpleBottom * triggerBottom > posY) {
              setFunc(false)
            }
          }
          break
        case "nav":
          if ((ref.current !== null) && (ref.current !== undefined)) {
            let navBottom = ref.current.getBoundingClientRect().bottom
            let triggerNav = 1 - ratio / 100
            if (navBottom * triggerNav <= window.pageYOffset) {
              setFunc(true)
            } else if (navBottom * triggerNav > window.pageYOffset) {
              setFunc(false)
            }
          }
          break
        default:
          break
      }      
    }
    return; 
}

export function parallaxMultiplier (bodyRef, ref, setFunc) {
    if(isBrowser) {
      let footerHeight = ref.current.clientHeight;
      let offsetVal = document.body.scrollHeight - window.innerHeight;
      let multiplier = -footerHeight / offsetVal;
      setFunc(multiplier);
    }
    return;
}