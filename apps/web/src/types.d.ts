declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'three' {
  const THREE: any;
  export default THREE;
  export = THREE;
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
}

declare module '@react-three/drei' {
  export const OrbitControls: any;
  export const Environment: any;
  export const Center: any;
}

declare module 'gsap' {
  const gsap: any;
  export default gsap;
  export = gsap;
}

declare module 'gsap/ScrollTrigger' {
  export const ScrollTrigger: any;
}
