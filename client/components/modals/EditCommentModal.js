import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editComments } from "../../features/commentSlice";

const EditCommentModal = ({ id, description }) => {
  const [comment, setComment] = useState("");
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
      <Button className="btn btn-secondary me-3" onClick={handleShow}>
        Edit Comment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className="form-label mt-4">Please edit comments</label>
              <input
                className="form-control"
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
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
