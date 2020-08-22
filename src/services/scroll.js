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

export function handleScroll (ref, triggertype, ratio, setFunc ) {
    const posY = window.innerHeight;
    let command = triggertype.toLowerCase();
    switch (command) {
        case "parallax":
            let offset = 0 - ref.current.getBoundingClientRect().top;
            setFunc({ offset });
            break;
        case "standard":
            let standardTop = ref.current.getBoundingClientRect().top;
            let standardBottom = ref.current.getBoundingClientRect().bottom;
            let triggerLoc = (standardTop + standardBottom) / ratio;
            if (triggerLoc <= posY) {
            setFunc(true);
            } else if (triggerLoc > posY) {
            setFunc(false);
            }
            break;
        case "simple":
            let simpleTop = ref.current.getBoundingClientRect().top;
            let simpleBottom = ref.current.getBoundingClientRect().bottom;
            let triggerTop = 1 + (ratio/100);
            let triggerBottom = 1 - (ratio/100);
            if ((simpleTop * triggerTop)  <= posY) {
            setFunc(true);
            } else if ((simpleBottom * triggerBottom) > posY) {
            setFunc(false);
            }
            break;
        default:
            break;
    }       
}

export function parallaxMultiplier (bodyRef, ref, setFunc) {
    let footerHeight = ref.current.clientHeight;
    let offsetVal = window.scrollMaxY;
    let multiplier = -footerHeight / offsetVal;
    setFunc(multiplier);
    return;
}