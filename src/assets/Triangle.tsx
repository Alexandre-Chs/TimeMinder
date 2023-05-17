import { useMouseRightEdge } from "../context/MouseRightEdgeContext";
import { useSidebarContext } from "../context/SidebarContext";
import "../styles/ButtonOpenSidebar.css";

const Triangle = () => {
  const { isMouseNearRightEdge } = useMouseRightEdge();
  const { openSidebar } = useSidebarContext();
  
  return (
    <div
      className={
        isMouseNearRightEdge && !openSidebar
          ? "timeminder-container-button-sidebar timeminder-mouseOutsideScreen"
          : "timeminder-container-button-sidebar"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 800 800"
        opacity="1"
      >
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="nnneon-grad">
            <stop
              stopColor="hsl(206, 75%, 49%)"
              stopOpacity="1"
              offset="0%"
            ></stop>
            <stop
              stopColor="hsl(0, 0%, 0.7843137254901961%)"
              stopOpacity="1"
              offset="100%"
            ></stop>
          </linearGradient>
          <filter
            id="nnneon-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="19 19"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
          <filter
            id="nnneon-filter2"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="12 12"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g
          strokeWidth="44"
          stroke="url(#nnneon-grad)"
          fill="none"
          transform="rotate(270, 400, 400)"
        >
          <path
            d="M374.6623831278273 62.43295720401764C385.0427985496832 41.4572811609431 414.9571656504669 41.4572811609431 425.3375810723228 62.43295720401764L747.0315172817243 712.4923384451465C756.3292259752111 731.2799857473398 742.6582867104794 753.2987917715321 721.6967452199946 753.2987917715321H78.30321898015552C57.34167748967053 753.2987917715321 43.67073822493904 731.2799857473398 52.968446918425855 712.4923384451465L374.6623831278273 62.43295720401764Z "
            filter="url(#nnneon-filter)"
          ></path>
          <path
            d="M419.6623831278273 62.43295720401764C430.0427985496832 41.4572811609431 459.9571656504669 41.4572811609431 470.3375810723228 62.43295720401764L792.0315172817243 712.4923384451465C801.3292259752111 731.2799857473398 787.6582867104794 753.2987917715321 766.6967452199946 753.2987917715321H123.30321898015552C102.34167748967053 753.2987917715321 88.67073822493904 731.2799857473398 97.96844691842585 712.4923384451465L419.6623831278273 62.43295720401764Z "
            filter="url(#nnneon-filter2)"
            opacity="0.22"
          ></path>
          <path
            d="M329.6623831278273 62.43295720401764C340.0427985496832 41.4572811609431 369.9571656504669 41.4572811609431 380.3375810723228 62.43295720401764L702.0315172817243 712.4923384451465C711.3292259752111 731.2799857473398 697.6582867104794 753.2987917715321 676.6967452199946 753.2987917715321H33.30321898015552C12.34167748967053 753.2987917715321 -1.3292617750609566 731.2799857473398 7.968446918425855 712.4923384451465L329.6623831278273 62.43295720401764Z "
            filter="url(#nnneon-filter2)"
            opacity="0.22"
          ></path>
          <path d="M374.6623831278273 62.43295720401764C385.0427985496832 41.4572811609431 414.9571656504669 41.4572811609431 425.3375810723228 62.43295720401764L747.0315172817243 712.4923384451465C756.3292259752111 731.2799857473398 742.6582867104794 753.2987917715321 721.6967452199946 753.2987917715321H78.30321898015552C57.34167748967053 753.2987917715321 43.67073822493904 731.2799857473398 52.968446918425855 712.4923384451465L374.6623831278273 62.43295720401764Z "></path>
        </g>
      </svg>
    </div>
  );
};

export default Triangle;
