/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';

const EmailModal = ({ isOpen, onClose, onSend }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    onSend(subject, body);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          width: '500px',
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#1D232A'
        },
      }}
    >
      <div style={{ padding: '16px' }}>
        <h2 style={{ marginBottom: '16px' }}>Email Details</h2>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '16px' }}>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '100px',
            }}
          />
        </label>
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#86EFAC',
            color: 'black',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '425px'
          }}
        >
          Send Email
        </button>
      </div>
    </Modal>
  );
};

export default EmailModal;
