import { createRootRoute, createRoute, createRouter, createHashHistory } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage/HomePage";
import { EragonLanding } from "@/features/eragon/EragonLanding";
import { ZapierLanding } from "@/features/zapier/ZapierLanding";
import { NeueLanding } from "@/features/neue/NeueLanding";
import { AlethiaLanding } from "@/features/alethia/AlethiaLanding";
import { ShopifyLanding } from "@/features/shopify/ShopifyLanding";
import { OriginKitLanding } from "@/features/originkit/OriginKitLanding";
import { BigBoldHeroLanding } from "@/features/bigboldhero/BigBoldHeroLanding";
import { ScrollWorldLanding } from "@/features/scrollworld/ScrollWorldLanding";
import { QuasarLanding } from "@/features/quasar/QuasarLanding";
import { ConversionLanding } from "@/features/conversion/ConversionLanding";
import { AeternaLanding } from "@/features/aeterna/AeternaLanding";
import { PresentationsLanding } from "@/features/presentations/PresentationsLanding";
import { EffectsLabLanding } from "@/features/effects/EffectsLabLanding";
import { ResponsiveLanding } from "@/features/responsive/ResponsiveLanding";
import { ImageStudio } from "@/features/image-studio/ImageStudio";
import { OriginsLabLanding } from "@/features/origins/OriginsLabLanding";
import { FlyingPapersLanding } from "@/features/flying-papers/FlyingPapersLanding";
import { PixelDreamsLanding } from "@/features/pixel-dreams/PixelDreamsLanding";
import { WellnessApp } from "@/features/wellness-app/WellnessApp";
import { ContentArchitectureLanding } from "@/features/content-architecture/ContentArchitectureLanding";
import { VeloscopeLanding } from "@/features/veloscope/VeloscopeLanding";
import { KycApp } from "@/features/kyc/KycApp";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const eragonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/eragon",
  component: EragonLanding,
});

const zapierRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zapier",
  component: ZapierLanding,
});

const neueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/neue",
  component: NeueLanding,
});

const alethiaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alethia",
  component: AlethiaLanding,
});

const shopifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shopify",
  component: ShopifyLanding,
});

const originkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/originkit",
  component: OriginKitLanding,
});

const bigBoldHeroRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/big-bold-hero",
  component: BigBoldHeroLanding,
});

const scrollWorldRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scroll-world",
  component: ScrollWorldLanding,
});

const quasarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quasar",
  component: QuasarLanding,
});

const conversionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/conversion",
  component: ConversionLanding,
});

const aeternaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aeterna",
  component: AeternaLanding,
});

const presentationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/presentations",
  component: PresentationsLanding,
});

const effectsLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/effects-lab",
  component: EffectsLabLanding,
});

const responsiveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/responsive-showcase",
  component: ResponsiveLanding,
});

const imageStudioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-studio",
  component: ImageStudio,
});

const originsLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/origins-lab",
  component: OriginsLabLanding,
});

const flyingPapersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flying-papers",
  component: FlyingPapersLanding,
});

const pixelDreamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pixel-dreams",
  component: PixelDreamsLanding,
});

const wellnessAppRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wellness-app",
  component: WellnessApp,
});

const contentArchitectureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/content-architecture",
  component: ContentArchitectureLanding,
});

const veloscopeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/veloscope",
  component: VeloscopeLanding,
});

const kycRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kyc",
  component: KycApp,
});

const routeTree = rootRoute.addChildren([
  indexRoute, 
  eragonRoute, 
  zapierRoute, 
  neueRoute, 
  alethiaRoute, 
  shopifyRoute, 
  originkitRoute, 
  scrollWorldRoute,
  bigBoldHeroRoute,
  effectsLabRoute,
  responsiveRoute,
  imageStudioRoute,
  originsLabRoute,
  flyingPapersRoute,
  pixelDreamsRoute,
  wellnessAppRoute,
  contentArchitectureRoute,
  veloscopeRoute,
  kycRoute
]);

const hashHistory = createHashHistory();
export const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
