"use client";
import React from "react";
import styles from "./image-picker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
const ImagePicker = ({ label, name }) => {
  const [selectedImage, setSelectedImage] = useState();
  const imageInputRef = useRef();
  const clickInput = () => {
    // trigger a click to an input connected to the ref
    imageInputRef.current.click();
  };

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setSelectedImage(null);
      return;
    }
    if (file) {
      // convert to a data URL so it can be displayed in an image tag
      const reader = new FileReader();
      // when the file is read it will trigger the onload event
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {selectedImage ? (
            <Image src={selectedImage} alt="Preview" fill />
          ) : (
            <p>No image picked</p>
          )}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept=".jpg,.png,.jpeg"
          className={styles.input}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button type="button" className={styles.button} onClick={clickInput}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
