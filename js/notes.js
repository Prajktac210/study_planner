import { 
db,
auth 
} from "./firebase-config.js";


import {

collection,
addDoc,
deleteDoc,
doc,
onSnapshot,
serverTimestamp

} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";




const title=document.getElementById("title");

const description=document.getElementById("description");

const addBtn=document.getElementById("addNote");

const notesList=document.getElementById("notesList");



let userId=null;




// Check Login User

onAuthStateChanged(auth,(user)=>{


if(user){

userId=user.uid;

loadNotes();

}

else{

alert("Please login first");

window.location.href="../login.html";

}


});






// Add Note


addBtn.addEventListener("click",async()=>{


if(title.value=="" || description.value==""){

alert("Please enter note details");

return;

}



await addDoc(

collection(
db,
"students",
userId,
"notes"
),

{

title:title.value,

description:description.value,

createdAt:serverTimestamp()

}


);



title.value="";

description.value="";


});







// Load Notes


function loadNotes(){



const notesRef=
collection(
db,
"students",
userId,
"notes"
);



onSnapshot(notesRef,(snapshot)=>{


notesList.innerHTML="";



snapshot.forEach((doc)=>{


let data=doc.data();



notesList.innerHTML +=`


<div class="note-card">


<button 
class="delete-btn"
onclick="deleteNote('${doc.id}')">

Delete

</button>



<h3>

${data.title}

</h3>


<p>

${data.description}

</p>


</div>


`;


});


});


}








// Delete Note


window.deleteNote=async(id)=>{


await deleteDoc(

doc(
db,
"students",
userId,
"notes",
id
)

);


};