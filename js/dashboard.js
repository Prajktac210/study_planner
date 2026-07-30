// ================= FIREBASE CONFIG =================

import { auth, db } from "./firebase-config.js";


import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// ================= LOAD STUDENT DATA =================


onAuthStateChanged(auth, async(user)=>{


    if(user){


        const uid = user.uid;


        const studentRef = doc(
            db,
            "students",
            uid
        );


        const studentSnap = await getDoc(studentRef);



        if(studentSnap.exists()){


            const student = studentSnap.data();



            // Name

            document.getElementById("profileName").innerHTML =
            student.name;



            document.getElementById("studentName").innerHTML =
            student.name;



            document.getElementById("name").innerHTML =
            student.name;



            // Course


            document.getElementById("course").innerHTML =
            student.course;



            document.getElementById("profileCourse").innerHTML =
            student.course;




            // Year


            document.getElementById("year").innerHTML =
            student.year;



            // Goal


            document.getElementById("goal").innerHTML =
            student.goal;




            // Study Hours


            document.getElementById("studyHours").innerHTML =
            student.hours + " hrs";




            // Subjects


            document.getElementById("subjects").innerHTML =
            student.subjects;




            // AI Suggestion


            createAISuggestion(student);




        }



    }


    else{


        window.location.href="login.html";


    }



});





// ================= AI RECOMMENDATION =================


function createAISuggestion(student){


    let subject =
    "Programming";



    if(student.subjects){


        subject =
        student.subjects.split(",")[0];


    }



    document.getElementById("aiSubject").innerHTML =
    subject;



    document.getElementById("suggestionTitle").innerHTML =
    subject;



    document.getElementById("aiMessage").innerHTML =

    `Based on your goal "${student.goal}", 
    AI recommends practicing ${subject} today.
    Your daily study target is ${student.hours} hours.`;



}







// ================= LOGOUT =================


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",()=>{


    signOut(auth)

    .then(()=>{


        alert("Logout Successful");


        window.location.href="login.html";


    })

    .catch((error)=>{


        alert(error.message);


    });



});


}