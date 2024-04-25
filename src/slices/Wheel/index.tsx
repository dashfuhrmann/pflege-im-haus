"use client";

import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";

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
  const textContainerWidth = 800;
  const textContainerHeight = 400;
  const circles = slice.items;
  const distanceInDegrees = 45;
  const circleDiameter = 80;

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
      transform = `rotate(-${rotation}deg) translate(${160}px) rotate(${rotation}deg) scale(1.5)`;
    } else {
      transform = `rotate(-${rotation}deg) translate(${160}px) rotate(${rotation}deg)`;
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

  const calculateDelay = () => {
    let delay = 0;
    delay = Math.abs(numberOfTransitions - startIndex) * 200 - 200;
    return delay;
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

  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-row">
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
              className="absolute transition-transform duration-1000 linear"
              width={svgWidth}
              height={svgHeight}
              style={{ transform: caluclateTransformPath() }}
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
                className={`circle absolute rounded-[50%] justify-center flex
            transition-transform duration-1000 linear bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1
            ${
              numberOfTransitions === index
                ? `before:block before:w-full before:h-1 before:bg-emerald-500 before:empty-content before:absolute before:top-[50%] before:left-[calc(100%)] before:transition-all before:linear before:delay-[${calculateDelay()}ms] before:duration-[1000ms]`
                : "before:block before:w-0 before:h-0 before:bg-emerald-500 before:empty-content before:absolute before:top-[50%] before:left-[calc(100%)] before:transition-all before:linear before:delay-[0ms] before:duration-500"
            }`}
                key={index}
                style={{
                  transform: caluclateTransformCircle(index),
                  width: circleDiameter,
                  height: circleDiameter,
                  left: `calc(50% - ${circleDiameter / 2}px)`,
                  top: `calc(50% - ${circleDiameter / 2}px)`,
                }}
              >
                <div
                  id={`${index}`}
                  onClick={(e) => {
                    rotate(e);
                    setTriggerTextAnimation(true);
                  }}
                  className="text-2xl font-bold z-10 mt-auto mb-auto justify-center items-center flex h-full w-full rounded-[50%] bg-gray-50"
                >
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
        <div
          id="text-wrapper"
          className={`flex items-center p-20 pl-[160px]`}
          style={{
            width: textContainerWidth,
            height: textContainerHeight,
          }}
        >
          {circles.map((item, index) => {
            return (
              <div
                className={`${triggerTextAnimation && "animate-fadeIn"}`}
                key={index}
                onAnimationEnd={() => setTriggerTextAnimation(false)}
                style={{
                  display: index === numberOfTransitions ? "block" : "none",
                }}
              >
                <PrismicRichText field={item.text} />
              </div>
            );
          })}
        </div>
      </div>
    </BoundedFull>
  );
};

export default Wheel;
