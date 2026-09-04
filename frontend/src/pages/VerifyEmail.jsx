//Import React
import React, {useState} from "react";

//Import Navigation Link 
import { useNavigate} from "react-router-dom";

//Importing CSS FILE ALSO
import "./VerifyEmail.css";


//Verify Email COmpoment
function VerifyEmail() {
    //Navigate Function
    const navigate = useNavigate();
    //Get Email from Local Storage
    const email = localStorage.getItem("verificationEmail");

    //OTP state
    const [otp, setOtp] = useState("");

    //Message State
    const [message,setMessage] = useState("");

    //Verify OTP 
    const handleVerify = async (e) => {
        e.preventDefault();
        //Check Email
        if(!email){
            setMessage("OPPS SORRY!....Your Email Does not found....You have to register yourself First...");
            return;
        }

        try{
            //Send OTP TO THE BACKEND
            const response = await fetch("http://localhost:5000/api/auth/verify-email",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                }
            );

            //CONVERT RESPONSE TO JSON
            const data = await response.json();
            //CHECK Verifaction
            if(response.ok){
                //REMOVE VERIFCATION EMAIL
                localStorage.removeItem("verificationEmail");

                //SHOW SUCESS MESSAGE
                setMessage("Congratulation.....Your Email is Verified...You Can Login Now...");

                //GO TO LOGIN
                setTimeout(() => {
                    navigate("/login");
                },1000);
            }
            else{
                //SHOW BACKEND ERROR TO THE USER
                setMessage(data.message || "Unable to Verify Your OTP..PLEASE TRY AGAIN LATER......");
            }
        }
        catch(error){
            //DISPLAY ERROR
            console.error("Email Verification ERROR",error);

            //SHOW CONNECTION ERROR
            setMessage("Unable To Connect With Server...Please Try again Later...");
        }
    };
    // Verify Email UI
    return (

        <div className="verify-email-page">

            <div className="verify-email-box">

                {/* S&J Luxury Logo */}

                <img src="/logo.jpeg" alt="S&J Luxury Logo" className="auth-logo"/>

                {/* Heading */}

                <h1> Verify Your Email </h1>

                {/* Description */}

                <p> Enter the 6-digit OTP sent to your registered email. </p>

                {/* Display Email */}

                <p className="verification-email"> {email} </p>

                {/* OTP Form */}

                <form onSubmit={handleVerify}>

                    {/* OTP Input */}

                    <input type="text" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value) } maxLength="6" required />

                    {/* Verify Button */}

                    <button type="submit"> VERIFY EMAIL </button>

                </form>

                {/* Verification Message */}

                {message && ( 
                    <p className="verify-message"> {message} </p>
                )}

            </div>

        </div>

    );
}

// Export Verify Email Component
export default VerifyEmail;
