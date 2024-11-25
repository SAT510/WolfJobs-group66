// @ts-ignore
// Import SVGProps to type the props for the SVG element
import * as React from "react";
// @ts-ignore
import { SVGProps } from "react";
/**
 * Bookmark Component
 *
 * A functional React component that renders a bookmark-shaped SVG icon.
 * The component accepts props to customize the SVG attributes such as `fill`,
 * `stroke`, and other standard SVG properties.
 *
 * @param {SVGProps<SVGSVGElement>} props - The properties to customize the SVG element.
 * These can include `fill`, `stroke`, `width`, `height`, etc.
 *
 * @returns {JSX.Element} An SVG element representing a bookmark icon.
 */
const Bookmark = (props: any) => (
  // Render the SVG element
  <svg
    xmlns="http://www.w3.org/2000/svg" // Specify the XML namespace for SVG
    width="1.5em" // Set the width of the SVG
    height="1.5em"  // Set the height of the SVG
    viewBox="0 0 200 200" // Define the coordinate system for the SVG
    {...props} // Spread additional props passed to the component
  >
    {/* Define the path for the bookmark shape */}
    <path d="M40 21.2c-2 2.2-2 3.1-2 78.8v76.7l2.3 2.1c4.5 4.2 7.4 3.1 16.2-6.2C82.6 145.3 99.4 128 100 128c.4 0 12.1 11.9 26.1 26.5 22.5 23.6 25.7 26.5 28.4 26.5 2 0 4-.9 5.3-2.3l2.2-2.3V99.7c0-75.4 0-76.7-2-78.7s-3.3-2-60-2H42.1L40 21.2z" />
  </svg>
);
export default Bookmark;
