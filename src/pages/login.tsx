import React, { useState } from "react";

const SignInUpForm: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] font-montserrat ">
      <nav className="bg-white rounded-[50px] mb-10 p-6">
        <img src="/Pine/logo.png" alt="" className="" />
      </nav>
      <div
        className={`container relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[10px] shadow-[0_28px_38px_rgba(0,0,0,0.25),0_20px_20px_rgba(0,0,0,0.22)] ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container absolute top-0 h-full transition-all duration-[0.6s] ease-in-out left-0 w-1/2 opacity-0 z-[1]">
          <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
            <h1 className="font-bold m-0 text-2xl">Create Account</h1>
            <div className="flex justify-between items-center gap-2 py-10">
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2   border-black"
              >
                <img src="/Pine/facebook.png" alt="" className="h-10" />
              </a>
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2     border-black"
              >
                <img src="/Pine/google.png" alt="" className="h-10" />
              </a>
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2  border-black"
              >
                <img src="/Pine/discord.png" alt="" className="h-10" />
              </a>
            </div>
            <span className="text-xl">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="bg-[#eee] border-none p-[12px_15px] my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none p-[12px_15px] my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none p-[12px_15px] my-2 w-full"
            />
            <button className="rounded-[20px] border border-[#FF4B2B] bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] text-white  font-bold py-3 px-[45px] tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-95 focus:outline-none text-xl">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container absolute top-0 h-full transition-all duration-[0.6s] ease-in-out left-0 w-1/2 z-[2]">
          <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
            <h1 className=" m-0 text-2xl">Sign in</h1>
            <div className="flex justify-between items-center gap-2 py-10">
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2   border-black"
              >
                <img src="/Pine/facebook.png" alt="" className="h-10" />
              </a>
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2     border-black"
              >
                <img src="/Pine/google.png" alt="" className="h-10" />
              </a>
              <a
                href="http://"
                className="bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] rounded-full p-2 border-2  border-black"
              >
                <img src="/Pine/discord.png" alt="" className="h-10" />
              </a>
            </div>

            <span className="text-xl">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none p-[12px_15px] my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none p-[12px_15px] my-2 w-full"
            />
            <a
              href="#"
              className="text-[#333] text-sm no-underline my-[15px_0]"
            >
              Forgot your password?
            </a>
            <button className="rounded-[20px] border border-[#f43b60] bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] text-white text-xl  py-2 px-[45px] tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-95 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-[0.6s] ease-in-out z-[100]">
          <div className="overlay bg-[radial-gradient(125%_125%_at_50%_0%,#ff6a3d_0%,#ff2d55_40%,#d7137d_100%)] bg-no-repeat bg-cover bg-[0_0] text-white relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-[0.6s] ease-in-out">
            <div className="overlay-panel overlay-left absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 translate-x-0 transition-transform duration-[0.6s] ease-in-out ">
              <h1 className="font-bold m-0 text-3xl">Welcome Back!</h1>
              <p className="text-xl font-light leading-5 tracking-[0.5px] my-5 mx-0">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost rounded-[20px] border border-white bg-transparent text-white text-xl  py-3 px-[45px] tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-95 focus:outline-none"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 translate-x-0 transition-transform duration-[0.6s] ease-in-out right-0">
              <h1 className="font-bold m-0 text-3xl">Hello, Friend!</h1>
              <p className="text-sm font-light leading-5 tracking-[0.5px] my-5 mx-0 text-xl">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost rounded-[20px] border border-white bg-transparent text-white   py-3 px-[45px] tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-95 focus:outline-none text-xl"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }

          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        /* Add animations if needed, assuming Tailwind config for custom animations */
        .social-container a {
          animation: popIn 0.5s ease-out forwards;
          opacity: 0;
          transform: scale(0);
        }

        .social-container a:nth-child(1) {
          animation-delay: 0.2s;
        }

        .social-container a:nth-child(2) {
          animation-delay: 0.4s;
        }

        .social-container a:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes popIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        input {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .container {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Sequential delays for inputs */
        .sign-up-container input:nth-child(3) { /* Name */
          animation-delay: 0.8s;
        }

        .sign-up-container input:nth-child(4) { /* Email */
          animation-delay: 1.0s;
        }

        .sign-up-container input:nth-child(5) { /* Password */
          animation-delay: 1.2s;
        }

        .sign-in-container input:nth-child(3) { /* Email */
          animation-delay: 0.8s;
        }

        .sign-in-container input:nth-child(4) { /* Password */
          animation-delay: 1.0s;
        }
      `}</style>
    </div>
  );
};

export default SignInUpForm;
