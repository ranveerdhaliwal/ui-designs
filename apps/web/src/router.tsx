import { DemoShell, RouteError, RouteNotFound } from '@/components/gallery/DemoShell';
import { demos } from '@/data/demos';
import { HomePage } from '@/pages/HomePage/HomePage';
import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router';
const rootRoute = createRootRoute({
  component: DemoShell,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const components = {
  'paper-worlds': lazyRouteComponent(
    () => import('@/features/motion-exhibits/PaperWorlds'),
    'PaperWorlds',
  ),
  precision: lazyRouteComponent(() => import('@/features/motion-exhibits/Precision'), 'Precision'),
  chromatic: lazyRouteComponent(() => import('@/features/motion-exhibits/Chromatic'), 'Chromatic'),
  metamorphosis: lazyRouteComponent(
    () => import('@/features/motion-exhibits/Metamorphosis'),
    'Metamorphosis',
  ),
  orrery: lazyRouteComponent(() => import('@/features/orrery/OrreryLanding'), 'OrreryLanding'),
  operations: lazyRouteComponent(
    () => import('@/features/operations/OperationsWorkspace'),
    'OperationsWorkspace',
  ),
  motionsites: lazyRouteComponent(
    () => import('@/features/motionsites/MotionSitesShowcase'),
    'MotionSitesShowcase',
  ),
  'big-bold-hero': lazyRouteComponent(
    () => import('@/features/bigboldhero/BigBoldHeroLanding'),
    'BigBoldHeroLanding',
  ),
  'wet-paint-flow': lazyRouteComponent(
    () => import('@/features/wet-paint-flow/WetPaintFrame'),
    'WetPaintFrame',
  ),
  neue: lazyRouteComponent(() => import('@/features/neue/NeueLanding'), 'NeueLanding'),
  alethia: lazyRouteComponent(() => import('@/features/alethia/AlethiaLanding'), 'AlethiaLanding'),
  eragon: lazyRouteComponent(() => import('@/features/eragon/EragonLanding'), 'EragonLanding'),
  zapier: lazyRouteComponent(() => import('@/features/zapier/ZapierLanding'), 'ZapierLanding'),
  shopify: lazyRouteComponent(() => import('@/features/shopify/ShopifyLanding'), 'ShopifyLanding'),
  conversion: lazyRouteComponent(
    () => import('@/features/conversion/ConversionLanding'),
    'ConversionLanding',
  ),
  aeterna: lazyRouteComponent(() => import('@/features/aeterna/AeternaLanding'), 'AeternaLanding'),
  veloscope: lazyRouteComponent(
    () => import('@/features/veloscope/VeloscopeLanding'),
    'VeloscopeLanding',
  ),
  'content-architecture': lazyRouteComponent(
    () => import('@/features/content-architecture/ContentArchitectureLanding'),
    'ContentArchitectureLanding',
  ),
  'flying-papers': lazyRouteComponent(
    () => import('@/features/flying-papers/FlyingPapersLanding'),
    'FlyingPapersLanding',
  ),
  quasar: lazyRouteComponent(() => import('@/features/quasar/QuasarLanding'), 'QuasarLanding'),
  originkit: lazyRouteComponent(
    () => import('@/features/originkit/OriginKitLanding'),
    'OriginKitLanding',
  ),
  'origins-lab': lazyRouteComponent(
    () => import('@/features/origins/OriginsLabLanding'),
    'OriginsLabLanding',
  ),
  'effects-lab': lazyRouteComponent(
    () => import('@/features/effects/EffectsLabLanding'),
    'EffectsLabLanding',
  ),
  'scroll-world': lazyRouteComponent(
    () => import('@/features/scrollworld/ScrollWorldLanding'),
    'ScrollWorldLanding',
  ),
  'pixel-dreams': lazyRouteComponent(
    () => import('@/features/pixel-dreams/PixelDreamsLanding'),
    'PixelDreamsLanding',
  ),
  presentations: lazyRouteComponent(
    () => import('@/features/presentations/PresentationsLanding'),
    'PresentationsLanding',
  ),
  'responsive-showcase': lazyRouteComponent(
    () => import('@/features/responsive/ResponsiveLanding'),
    'ResponsiveLanding',
  ),
  'wellness-app': lazyRouteComponent(
    () => import('@/features/wellness-app/WellnessApp'),
    'WellnessApp',
  ),
  'image-studio': lazyRouteComponent(
    () => import('@/features/image-studio/ImageStudio'),
    'ImageStudio',
  ),
  kyc: lazyRouteComponent(() => import('@/features/kyc/KycApp'), 'KycApp'),
  botlab: lazyRouteComponent(() => import('@/features/botlab/BotlabApp'), 'BotlabApp'),
};
const demoRoutes = demos.map((demo) =>
  createRoute({ getParentRoute: () => rootRoute, path: demo.path, component: components[demo.id] }),
);
export const routeTree = rootRoute.addChildren([indexRoute, ...demoRoutes]);
export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPendingComponent: () => (
    <div className="route-message" role="status">
      Opening the studio…
    </div>
  ),
  defaultPendingMs: 150,
  scrollRestoration: true,
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
