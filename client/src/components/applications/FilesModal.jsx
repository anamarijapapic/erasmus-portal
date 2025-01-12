import { useState, useRef } from 'react';
import useUploadFile from '../../hooks/applications/useUploadFile';
import useDeleteFile from '../../hooks/applications/useDeleteFile';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { HiDownload, HiTrash } from 'react-icons/hi';

const FilesModal = ({ isOpen, onClose, application, refreshFiles }) => {
  const { uploadFile, error: uploadError } = useUploadFile();
  const { deleteFile, error: deleteError } = useDeleteFile();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile && application) {
      await uploadFile(application._id, selectedFile);
      setSelectedFile(null);
      fileInputRef.current.value = null;
      refreshFiles(application._id);
    }
  };

  const handleFileDelete = async (fileId) => {
    await deleteFile(fileId);
    refreshFiles(application._id);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Attached Files</Modal.Header>
      <Modal.Body>
        <h3>Existing Files</h3>
        <ul>
          {application &&
            application.files.map((file) => (
              <li key={file._id} className="flex items-center justify-between">
                <a
                  href={`http://localhost:3000/applications/downloadFile/${file._id}`}
                  target="_blank"
                  className="flex items-center"
                >
                  <HiDownload className="mr-2" />
                  {file.filename}
                </a>
                <HiTrash
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => handleFileDelete(file._id)}
                />
              </li>
            ))}
        </ul>
        <h3>Upload a new file</h3>
        <div className="space-y-6">
          <Label htmlFor="file">Select File</Label>
          <TextInput
            id="file"
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          {deleteError && <p className="text-red-500">{deleteError}</p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleFileUpload}>Upload</Button>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilesModal;
