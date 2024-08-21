import { Auth } from "./components/Auth";
import { db,auth } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([])

  //New Movies data
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //Update Title State
  const [updatedTitle,setUpdatedTitle]=useState("");


  //File upload state
  const [fileUpload,setFileUpload]=useState(null)

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      console.log(data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    getMovieList();
  }, [])

  const deleteMovie=async(id)=>{
    try{
    const movieDoc=doc(db,"movies",id);
    await deleteDoc(movieDoc);
    getMovieList();
    }catch(err){
      console.error(err);
    }
  }

  const updateMovieTitle=async(id)=>{
    const movieDoc=doc(db,"movies",id);
    await updateDoc(movieDoc,{title:updatedTitle});
    getMovieList();
  }

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId:auth?.currentUser.uid,
      })
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  const uploadFile=async()=>{
    if(!fileUpload)
        return;
    const filesFolderRef=ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUpload);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input type="text" placeholder="Movie Title..." onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder="Release Date" type="number" onChange={(e) => setNewReleaseDate(e.target.value)} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {
          movieList.map((movie) => (
            <div key={movie.title}>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
              <p>Data:{movie.releaseDate}</p>
              <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
              <input type="text" placeholder="new title" onChange={(e)=>setUpdatedTitle(e.target.value)}/>
              <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          ))
        }
      </div>
      <div>
        <input onChange={(e)=>{setFileUpload(e.target.files[0])}} type="file"/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
