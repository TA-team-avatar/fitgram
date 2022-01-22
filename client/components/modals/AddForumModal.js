import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createForum } from '../../features/forumSlice';

const AddForumModal = () => {
  const [forumName, setForumName] = useState('');
  const [show, setShow] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Button className='btn-dark-modal' onClick={handleShow}>
          Add Forum
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className='form-label mt-4'>
                Please type in the name of forum
              </label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => {
                  setForumName(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-success' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className='btn-success'
            onClick={() => {
              /**
               * TODO: API call to Add forum to forum db
               */
              dispatch(
                createForum({
                  name: forumName,
                  owner_user_id: userId,
                })
              );
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddForumModal;
