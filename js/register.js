import { auth, db } from "./firebase-config.js";

import { 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;
    const goal = document.getElementById("goal").value;
    const hours = document.getElementById("hours").value;
    const subjects = document.getElementById("subjects").value;



    try{


        // Create Firebase Account

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        const user = userCredential.user;



        // Store Student Profile in Firestore

        await setDoc(doc(db,"students",user.uid),{

            name:name,
            email:email,
            course:course,
            year:year,
            goal:goal,
            hours:hours,
            subjects:subjects,
            uid:user.uid

        });



        alert("Registration Successful 🎉");


        window.location.href="dashboard.html";



    }
    catch(error){

        alert(error.message);

    }


});