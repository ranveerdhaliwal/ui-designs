declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'three' {
  const three: any;
  export = three;
}

declare module 'gsap' {
  const gsap: any;
  export = gsap;
}

declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: any;
}
