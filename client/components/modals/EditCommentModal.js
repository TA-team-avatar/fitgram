import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editComments } from '../../features/commentSlice';

const EditCommentModal = ({ id, description }) => {
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  // Set default comments
  useEffect(() => {
    setComment(description);
  }, []);
  return (
    <>
      <div>
        <Button className='btn-dark-modal-Editcomments' onClick={handleShow}>
          Edit Comment
        </Button>
      </div>
      <Modal className='modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className='form-label mt-4'>Please edit comments</label>
              <input
                className='form-control'
                type='text'
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
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
              dispatch(
                editComments({
                  description: comment,
                  id: id,
                })
              );
              handleClose();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCommentModal;
