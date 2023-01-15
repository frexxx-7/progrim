import { ref, update } from 'firebase/database'
import { ref as refSt, uploadBytes, getDownloadURL } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import useFirebase from '../../hooks/useFirebase'
import classes from './EditPhoto.module.scss'

const EditPhoto = ({ photo, editing = false, id, setChangeImage, changeImages }) => {
  const { storage, database } = useFirebase()

  const [image, setImage] = useState()


  const changeImage = (e) => {
    const fileElem = document.getElementById("fileElem");
    if (fileElem) {
      fileElem.click();
    }
  }

  const chooseImage = (files) => {
    const avatar = document.getElementById("avatar");
    const file = files[0]
    if (!file.type.startsWith('image/')) { return '' }
    avatar.file = file
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(avatar);
    reader.readAsDataURL(file);
    loadPhotoIntoBase(file)
  }

  const loadPhotoIntoBase = async (file) => {
    const storageRef = refSt(storage, `avatars/${id}`)
    await uploadBytes(storageRef, file)
    setChangeImage(!changeImages)
  }

  const loadPhoto = () => {
    if (id) {
      const storageRef = refSt(storage, `avatars/${id}`)
      getDownloadURL(storageRef)
        .then((url) => {
          setImage(url)
          update(ref(database, 'users/' + id + '/userData'), {
            photo:url
          });
        })
    }
  }

  useEffect(() => {
    loadPhoto()
  }, [changeImage])

  return (
    <div className={classes.editPhoto}>
      <img src={photo} alt="avatar" id='avatar' />
      {editing
        ? <div>
          <input
            type="file"
            name="file"
            id="fileElem"
            style={{ display: "none" }}
            onChange={(e) => chooseImage(e.target.files)}
          />
          <button
            className={classes.EditPhotoInput}
            onClick={changeImage}
          >
            Edit
          </button>
        </div>
        : ''
      }
    </div>
  )
}

export default EditPhoto