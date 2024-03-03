// Importeer vereiste modules en bibliotheken
import "./App.css"; // Importeer CSS-bestand voor styling
import { useState, useEffect } from "react"; // Importeer useState en useEffect hooks van React
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage"; // Importeer Firebase Storage API-methoden
import { storage } from "./firebase"; // Importeer Firebase Storage instantie
import { v4 } from "uuid"; // Importeer v4 functie van de uuid-bibliotheek
import React, { useRef } from "react"; // Importeer useRef hook van React

function App() {
const [imageUpload, setImageUpload] = useState(null); // Stuk state om de huidige geselecteerde afbeelding voor uploaden bij te houden
const [imageUrls, setImageUrls] = useState([]); // Stuk state om een lijst van URL's bij te houden die verwijzen naar geüploade afbeeldingen
const fileInputRef = useRef(null); // Ref for file input field
const imagesListRef = ref(storage, "images/"); // Definieer een verwijzing naar de map "images/" in Firebase Storage

// Functie om een bestand te uploaden naar Firebase Storage
const uploadFile = () => { 
  if (imageUpload == null) return;   // Controleer of er een bestand is geselecteerd voor uploaden
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);   // Maak een verwijzing naar een nieuw bestand met een unieke naam in de map "images/"

  // Upload het geselecteerde bestand naar Firebase Storage
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
    // Haal de download URL van het geüploade bestand op
    getDownloadURL(snapshot.ref).then((url) => {
      // Voeg de download URL toe aan de lijst met afbeeldings-URL's
      setImageUrls((prev) => [...prev, url]);

      // Reset het geselecteerde bestand en het bestandsinvoerveld na het uploaden
      setImageUpload(null); // Reset de staat van het geselecteerde bestand
      fileInputRef.current.value = null; // Reset het bestandsinvoerveld
    });
  });
};

// Effect hook om afbeeldings-URL's op te halen bij het laden van de component
useEffect(() => {
  // Haal alle items op in de map "images/" in Firebase Storage
  listAll(imagesListRef).then((response) => {
    // Voor elk item in de map, haal de download URL op en voeg toe aan de lijst met afbeeldings-URL's
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  });
}, []);


  return (
    <div className="App">
      <input
        type="file"
        ref={fileInputRef} // Assign the ref to the file input field
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        return <img key={url}  src={url} alt="Uploaded" />;
      })}
    </div>
  );
}

export default App;
