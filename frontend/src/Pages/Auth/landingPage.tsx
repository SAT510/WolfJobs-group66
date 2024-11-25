/**
 * LandingPage Component
 * 
 * This component represents the landing page of the application. It contains 
 * styled elements that introduce the platform and offer users the option to 
 * either sign up or log in. The page includes text, images, and buttons that 
 * navigate users to either the registration or login pages.
 * 
 * @returns {JSX.Element} The rendered landing page UI component.
 */
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // Hook to navigate between pages using React Router
  const navigate = useNavigate();

  return (
    
    <div style={{ overflow: "hidden" }}>
      {/* Main heading section */}
      <div
        style={{
          position: "absolute",
          width: "523px",
          height: "96px",
          left: "62px",
          top: "269px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "48px",
          color: "#000000",
        }}
      >
        We understand that being a student can be{" "}
        <span style={{ color: "#FF5353" }}>challenging.</span>
      </div>
      {/* Description text */}
      <div
        style={{
          position: "absolute",
          width: "550px",
          height: "72px",
          left: "62px",
          top: "383px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "20px",
          lineHeight: "24px",
          color: "#666666",
        }}
      >
        Join our dynamic team right here on campus. Earn, learn, and be part of
        the community that powers your daily essentials. Apply now and shape
        your campus experience!
      </div>
      {/* Sign Up button that navigates to the register page */}
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/register");
        }}
        type="button"
        style={{
          position: "absolute",
          width: "223px",
          height: "54px",
          left: "62px",
          top: "501px",
          background: "#FF5353",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: "white",
            margin: 0,
          }}
        >
          Sign Up
        </p>
      </button>

      <p
        style={{
          position: "absolute",
          width: "29px",
          height: "30px",
          left: "308px",
          top: "513px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "30px",
          textAlign: "center",
          color: "#8C8D90",
        }}
      >
        OR
      </p>
      {/* Login button that navigates to the login page */}
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
        type="button"
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "223px",
          height: "54px",
          left: "359px",
          top: "501px",
          background: "#FFFFFF",
          border: "1px solid #656565",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            margin: 0,
            color: "#656565",
          }}
        >
          Login
        </p>
      </button>
      {/* Image on the right side of the landing page */}
      <div
        style={{
          position: "absolute",
          width: "735px",
          height: "752px",
          left: "669px",
          top: "121px",
          mixBlendMode: "multiply",
        }}
      >
        <img src="/images/landingpage_image1.png" alt="Landing Page Image" />
      </div>
      {/* Additional image for visual appeal */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "640px",
          left: "612px",
          top: "167px",
        }}
      >
        <img src="/images/landingpage_image2.png" alt="Landing Page Image" />
      </div>
    </div>
  );
};

export default LandingPage;
