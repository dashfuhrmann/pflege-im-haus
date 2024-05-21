"use client";

import BoundedFull from "@/components/BoundedFull";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";

/**
 * Props for `Wheel`.
 */
export type WheelProps = SliceComponentProps<Content.WheelSlice>;
/**
 * Component for "Wheel" Slices.
 */
const Wheel = ({ slice }: WheelProps): JSX.Element => {
  const svgWidth = 400;
  const svgHeight = 400;
  const circles = slice.items;
  const distanceInDegrees = 45;
  const circleDiameter = 80;
  const textWidth = 160;
  const textHeight = 50;
  const lineHeight = 4;

  const [numberOfTransitions, setNumberOfTransitions] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [triggerTextAnimation, setTriggerTextAnimation] = useState(false);

  const numPosistions = 360 / distanceInDegrees;
  const startAngle = 90;

  const caluclateTransformCircle = (i: number) => {
    const rotation =
      360 - (i - numPosistions - numberOfTransitions) * distanceInDegrees;
    let transform = "";
    if (numberOfTransitions === i) {
      transform = `rotate(-${rotation}deg) translate(${160}px) scale(1.5)`;
    } else {
      transform = `rotate(-${rotation}deg) translate(${160}px)`;
    }
    return transform;
  };

  // needs a different name
  const caluclateTransformCircleText = (i: number) => {
    const rotation =
      360 - (i - numPosistions - numberOfTransitions) * distanceInDegrees;
    let transform = "";
    if (numberOfTransitions === i) {
      transform = `rotate(-${rotation}deg) translate(${160}px) rotate(${rotation}deg) scale(1.5)`;
    } else {
      transform = `rotate(-${rotation}deg) translate(${160}px) rotate(${rotation}deg)`;
    }
    return transform;
  };

  const caluclateTransformText = (i: number) => {
    const rotation =
      360 - (i - numPosistions - numberOfTransitions) * distanceInDegrees;
    let transform = "";
    let translate = 320;
    let offsetX = 0;
    let offsetY = 0;
    let position = i - numberOfTransitions;
    if (position < 0) position = position + numPosistions;

    if (position === 1 || position === 7 || position === 3 || position === 5)
      offsetX = 25;

    if (position === 6) offsetX = -25;

    if (position === 0) {
      offsetX = circleDiameter * 1.5 + 20;
      offsetY = lineHeight * 2;
    }
    if (position === 4) {
      offsetX = circleDiameter + 20;
      offsetY = -(lineHeight * 2);
    }

    if (numberOfTransitions === i) {
      transform = `rotate(-${rotation}deg) translate(${translate + offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
    } else {
      transform = `rotate(-${rotation}deg) translate(${translate + offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
    }
    return transform;
  };

  const caluclateTransformPath = () => {
    const rotation = numberOfTransitions * distanceInDegrees;
    let transform = `rotate(-${rotation}deg)`;
    return transform;
  };

  function describeArc(
    x: number,
    y: number,
    radius: number,
    spread: number,
    startAngle: number,
    endAngle: number
  ) {
    var innerStart = polarToCartesian(x, y, radius, endAngle);
    var innerEnd = polarToCartesian(x, y, radius, startAngle);
    var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
    var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M",
      outerStart.x,
      outerStart.y,
      "A",
      radius + spread,
      radius + spread,
      0,
      largeArcFlag,
      0,
      outerEnd.x,
      outerEnd.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "L",
      outerStart.x,
      outerStart.y,
      "Z",
    ].join(" ");

    return d;
  }

  function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  const rotate = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartIndex(numberOfTransitions);
    const div = e.target as HTMLElement;
    const id = Number(div.id);

    setNumberOfTransitions(id);
  };

  const calculateDuration = () => {
    let duration = 0;
    duration = Math.abs(numberOfTransitions - startIndex) * 200 + 1000;
    return duration;
  };

  const constructPath = () => {
    let pathArray = [];
    for (let i = 0; i < circles.length; i++) {
      let path = describeArc(
        200,
        200,
        160,
        5,
        startAngle,
        startAngle + distanceInDegrees * i
      );
      pathArray.push(path);
    }
    return pathArray;
  };

  const startAnimationAndTimeout = () => {
    setTriggerTextAnimation(true);
    const duration = Math.abs(numberOfTransitions - startIndex) * 200 + 1000;
    setTimeout(() => {
      setTriggerTextAnimation(false);
    }, duration);
  };

  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    const tl = gsap.timeline();

    const duration = Math.abs(numberOfTransitions - startIndex) * 200 + 1000;

    if (triggerTextAnimation) {
      gsap.set(".description", { opacity: "0%" });
      tl.clear();
    } else {
      console.log("???");
      tl.to(`.description-${numberOfTransitions}`, {
        keyframes: [
          {
            opacity: "100%",
            height: "100%",
            duration: 0.5,
            ease: "power1.inOut",
          },
        ],
      });
    }
  }, [triggerTextAnimation]);
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-6xl text-center text-gray-700">
          <>{slice.primary.heading}</>
        </h1>
        <div className="text-3xl text-center text-balance">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
      <div className="flex flex-row mt-[170px]">
        {/* <div className="container w-full h-full min-h-[600px] flex flex-col md:w-2/5 gap-4">
          <div className="flex bg-gray-200 mr-auto mt-[95px] rounded-full h-[200px] w-[200px] p-4">
            <PrismicNextImage
              field={slice.primary.image}
              width={200}
              height={200}
            />
          </div>
        </div> */}

        <div
          className="flex flex-row w-full min-h-[1000px] min-w-[1200px] ml-[25%]"
          ref={container}
        >
          <div
            id="wrapper"
            className={` relative`}
            style={{
              width: svgWidth,
              height: svgHeight,
            }}
          >
            {
              <svg
                id="path"
                className="absolute"
                width={svgWidth}
                height={svgHeight}
                style={{
                  transform: caluclateTransformPath(),
                  transition: "transform 1s linear",
                  transitionDuration: `${calculateDuration()}ms`,
                }}
              >
                {constructPath().map((path, index) => {
                  return (
                    <path
                      key={index}
                      id={`path${index}`}
                      fill="black"
                      d={path}
                    ></path>
                  );
                })}
              </svg>
            }
            {circles.map((item, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    transform: caluclateTransformText(index),
                    transition: `transform 1s linear`,
                    transitionDuration: `${calculateDuration()}ms`,
                    left: `calc(50% - ${textWidth / 2}px)`,
                    top: `calc(50% - ${textHeight / 2}px - ${lineHeight / 2}px)`,
                  }}
                  className={`text-center text-xl absolute w-[${textWidth}px] max-w-[${textWidth}px] h-[${textHeight}px] text-wrap items-center flex flex-col justify-center`}
                >
                  {item.heading}
                  <div
                    className={`description description-${index} w-[${textWidth}px] h-0 flex overflow-hidden text-wrap max-w-[${textWidth}px]`}
                  >
                    <PrismicRichText
                      field={circles[numberOfTransitions].description}
                      components={{
                        list: ({ children }) => (
                          <ol className="list-disc ml-4">{children}</ol>
                        ),
                        oList: ({ children }) => (
                          <ol className="list-decimal ml-4">{children}</ol>
                        ),
                        oListItem: ({ children }) => (
                          <li className="text-balance">{children}</li>
                        ),
                        listItem: ({ children }) => (
                          <li className="text-balance">{children}</li>
                        ),
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div
              style={{
                left: `calc(100% + ${textWidth}px)`,
                top: "calc(50% + 20px)",
              }}
              className={`description absolute w-full `}
            ></div>
            {circles.map((item, index: number) => {
              return (
                <div
                  key={index}
                  id={`${index}`}
                  style={{
                    transform: caluclateTransformCircleText(index),
                    transition: "transform 1s linear",
                    transitionDuration: `${calculateDuration()}ms`,
                    width: circleDiameter - 10,
                    height: circleDiameter - 10,
                    left: `calc(50% - ${circleDiameter / 2}px + 5px)`,
                    top: `calc(50% - ${circleDiameter / 2}px + 5px)`,
                  }}
                  onClick={(e) => {
                    rotate(e);
                    startAnimationAndTimeout();
                  }}
                  className="absolute text-2xl font-bold z-10 mt-auto mb-auto justify-center items-center flex h-full w-full rounded-[50%] bg-gray-50"
                >
                  {index + 1}
                </div>
              );
            })}
            {circles.map((item, index: number) => {
              let position = index - numberOfTransitions;
              if (position < 0) position = position + numPosistions;
              return (
                <div
                  className={`circle absolute rounded-[50%] justify-center flex bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
                              before:block before:h-1 before:bg-emerald-500 before:absolute before:left-[100%] before:top-[50%] before:transition-transform before:duration-1000 before:ease-linear
                              ${position === 0 || position === 4 ? "before:w-full" : "before:w-full"}
                            `}
                  key={index}
                  style={{
                    transform: caluclateTransformCircle(index),
                    transition: "transform 1s linear",
                    transitionDuration: `${calculateDuration()}ms`,
                    width: circleDiameter,
                    height: circleDiameter,
                    left: `calc(50% - ${circleDiameter / 2}px)`,
                    top: `calc(50% - ${circleDiameter / 2}px)`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </BoundedFull>
  );
};

export default Wheel;
