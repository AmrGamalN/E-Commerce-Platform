const size = {
  mobile: 480,
  tablet: 768,
  tabletWide: 1024,
};

const device = {
  mobile: `only screen and (max-width: ${size.mobile}px)`,
  tablet: `only screen and (max-width: ${size.tablet}px)`,
  tabletWide: `only screen and (max-width: ${size.tabletWide}px)`,
  tabletOnly: `only screen and (min-width: ${
    size.mobile + 1
  }px) and (max-width: ${size.tabletWide}px)`,
};

export default device;
