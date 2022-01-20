import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createComments } from '../../features/commentSlice';

const AddCommentModal = ({ currentUserId, forumId }) => {
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      <Button className='btn btn-secondary me-3' onClick={handleShow}>
        Add Comment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className='form-label mt-4'>Please type in comments</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              dispatch(
                createComments({
                  description: comment,
                  owner_user_id: currentUserId,
                  forum_id: forumId,
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

export default AddCommentModal;
