// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { logIn } from "../redux/userSlice";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const { token, user_id, username } = response.data;

//       // Dispatch login action to Redux
//       dispatch(logIn({ username, token, user_id }));

//       // Redirect to homepage or previously accessed page
//       navigate("/");
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//       setError("Invalid username or password. Please try again.");
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/signup"); // Navigate to the registration page
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="col-md-4">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             <h3 className="text-center mb-4" style={{ color: "#84b474" }}>
//               Login
//             </h3>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   className="form-control"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-success w-100 mb-3"
//                 style={{ backgroundColor: "#84b474" }}
//               >
//                 Login
//               </button>
//             </form>
//             <div className="text-center">
//               <p>Don’t have an account?</p>
//               <button
//                 type="button"
//                 className="btn btn-outline-primary w-100"
//                 onClick={handleSignUp}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


from react import useState, useEffect

def LoginForm():
    username = useState("")
    password = useState("")
    error = useState("")
    loading = useState(False)
    progress = useState(0)

    def handleChange(event):
        name, value = event.target.name, event.target.value
        if name == "username":
            username[1](value)  # Update username
        elif name == "password":
            password[1](value)  # Update password

    def handleSubmit(event):
        event.preventDefault()  # Prevent default form submission behavior
        error[1]("")  # Clear any existing errors
        loading[1](True)  # Set loading to true
        progress   # Reset progress to 0

        def update_progress():
            if progress[0] < 95:  # Increment progress until 95%
                new_progress = progress[0] + 1
                progress[1](new_progress)
            else:
                loading[1](False)  # Stop loading at 95%

        interval_id = setInterval(update_progress, 1000)  # Update progress every second
        setTimeout(lambda: clearInterval(interval_id), 100000)  # Stop after 100 seconds

    return (
        f"<div className='d-flex justify-content-center align-items-center vh-100 bg-light'>"
        f"  <div className='col-md-4'>"
        f"    <div className='card shadow-lg'>"
        f"      <div className='card-body'>"
        f"        <h3 className='text-center mb-4' style={{ color: '#84b474' }}>Login</h3>"
        f"        {error[0] and f\"<div className='alert alert-danger'>{error[0]}</div>\"}"
        f"        <form onSubmit={handleSubmit}>"
        f"          <div className='mb-3'>"
        f"            <label htmlFor='username' className='form-label'>Username</label>"
        f"            <input type='text' id='username' name='username' className='form-control' value={username[0]} onChange={handleChange} required />"
        f"          </div>"
        f"          <div className='mb-3'>"
        f"            <label htmlFor='password' className='form-label'>Password</label>"
        f"            <input type='password' id='password' name='password' className='form-control' value={password[0]} onChange={handleChange} required />"
        f"          </div>"
        f"          <button type='submit' className='btn btn-success w-100 mb-3' style={{ backgroundColor: '#84b474' }}>Login</button>"
        f"        </form>"
        f"        {loading[0] and f\"<div>Loading... {progress[0]}%</div><progress value={progress[0]} max='100'></progress>\"}"
        f"      </div>"
        f"    </div>"
        f"  </div>"
        f"</div>"
    )

# Placeholder functions for timer management, replace with actual implementations in a full React environment
setTimeout, setInterval, clearInterval = None, None, None
