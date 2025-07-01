import React, { useRef, useState } from "react";
import addOffer from "../../api/postOffer";
import "./createOffer.css";

const CreateOffer = () => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const prizeInputRef = useRef();

  const [response, setResponse] = useState("");

  const save = async (event) => {
    event.preventDefault();

    try {
      const offerData = {
        title: titleInputRef.current?.value,
        description: descriptionInputRef.current?.value,
        prize: prizeInputRef.current?.value,
      };

      const result = await addOffer(offerData); // optional, falls addOffer auch async ist
      setResponse(result);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern des Angebots.");
    }
  };

  return (
    <div className="create-offer">
      <form onSubmit={save}>
        <input
          ref={titleInputRef}
          type="text"
          name="title"
          placeholder="Enter Title..."
          required
        />
        <input
          ref={descriptionInputRef}
          type="text"
          name="description"
          placeholder="Enter Description..."
          required
        />
        <input
          ref={prizeInputRef}
          type="number"
          name="prize"
          placeholder="Enter Prize..."
          required
        />
        <button type="submit">Save</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default CreateOffer;
