
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyByotZ25hk_X6CgcS-TMYmzHzGZBXhUmkU",
    authDomain: "unlimited-storage24.firebaseapp.com",
    projectId: "unlimited-storage24",
    storageBucket: "unlimited-storage24.appspot.com",
    messagingSenderId: "1067181529757",
    appId: "1:1067181529757:web:33e83fc03045f78f85d274",
    measurementId: "G-JVKE42W6XH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  
  import {getStorage , ref as sRef,uploadBytesResumable, getDownloadURL }
                         from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";


                         import{ getDatabase, ref, set, child, get}
            from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
    
            const database = getDatabase();


            const name = document.getElementById("nameInp");
            const mobile = document.getElementById("mobInp");
            const submit = document.getElementById("next");




                         var Files = [];
                         var FileReaders = [];
                         var ImageLinksArray = [];

                         const imgdiv = document.getElementById("imagesDiv");
                         const proglab = document.getElementById("loadlab");
                         const SelBtn = document.getElementById("selbtn");
                         const UpBtn = document.getElementById("upbtn");

                       
                                function OpenDialog(){


                            let inp = document.createElement('input');
                            inp.type = 'file';
                            inp.multiple = 'multiple';

                            inp.onchange = (e) => {
                              AssignImgsToFilesArray(e.target.files);
                              CreateImgTags();
                            }

                            inp.click();
                        }



                        function AssignImgsToFilesArray(thefiles){

                             for(let i = 0; i < thefiles.length; i++ ){
                              Files.push(thefiles[i]);
                             }

                        }



                        function CreateImgTags(){

                           imgdiv.innerHTML='';
                           imgdiv.classList.add('imagesDivStyle');

                           for (let i = 0; i < Files.length; i++) {
                            FileReaders[i] = new FileReader();

                            FileReaders[i].onload = function(){
                              var img = document.createElement('img');
                              img.id = 'imgNo'+i;
                              img.classList.add('imgs');
                              img.src= FileReaders[i].result;
                              imgdiv.append(img);  
                            }

                        FileReaders[i].readAsDataURL(Files[i]);

                           }

                           let lab = document.getElementById('label');
                           lab.innerHTML = 'clear images';
                           lab.style = 'cursor:pointer;display:block;color:navy; font-size:12px';
                           lab.addEventListener('click', ClearImages);
                           imgdiv.append(lab);
                           

                        }


                        function ClearImages(){
                          Files = [];
                          ImageLinksArray = [];
                          imgdiv.innerHTML = '';
                          imgdiv.classList.remove('imagesDivStyle');
                        }


     
                        function GetImgUploadProgress(){
                          return 'Images Uploaded' + ImageLinksArray.length + 'of'+ Files.length;
                        }

                        function IsAllImagesUploaded(){
                          return ImageLinksArray.length == Files.length;
                        }


                        function RestoreBack(){

                          UpBtn.disabled = false;
                          SelBtn.disabled = false;
                          proglab.innerHTML = "";

                        }

                        SelBtn.addEventListener('click', OpenDialog);
                        UpBtn.addEventListener('click', UploadAllImages);


                        function UploadAllImages(){

                          UpBtn.disabled = true;
                          SelBtn.disabled = true;

                          ImageLinksArray = [];

                          for (let i = 0; i < Files.length; i++) {
                            UploadAnImage(Files[i], i);
                          }

                        }


                   function UploadAnImage(imgToUpload, imgNo){

                    
                    const metadata = {
                      contentType: imgToUpload.type
                    };
                    
                    
                    const storage = getStorage();
                    
                    const ImageAddress = "Images/"+"/img#"+(imgNo+1);

                    const storageRef = sRef(storage, ImageAddress);

                    const UploadTask = uploadBytesResumable(storageRef, imgToUpload,metadata);

                    UploadTask.on('state_changed', (snapshot) =>{
                      proglab.innerHTML = GetImgUploadProgress();
                    },

                    (error)=>{
                      alert("error: image upload failed");
                    },

                    ()=>{
                      
                      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                        ImageLinksArray.push(downloadURL);
                        if(IsAllImagesUploaded()){
                          proglab.innerHTML = "All Images Uploaded";
                          RestoreBack();
                          write();
                        }
                      });

                    }
                    );
                   }   

                 
            function write(){
const db = getDatabase();
  set(ref(db, "UsersList/"+ name.value),{
    Name: name.value,
    Mobile: mobile.value,
   ImagesLinks: ImageLinksArray
  });

}



document.getElementById("next").addEventListener("click", function(){

      var flag = 1;
      localStorage.setItem("flag1", flag); 

  document.getElementById("unhide").style.display="none";
document.getElementById("hide").style.display="block";

})


window.onload = function(){

var flag2 = localStorage.getItem("flag1");

if(flag2 == 1){
  document.getElementById("unhide").style.display="none";
  document.getElementById("hide").style.display="block";
}

}


            
