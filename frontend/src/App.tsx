import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Box, Container, Typography, Button, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import { UploadFile, Folder, InsertDriveFile, Image, AudioFile, VideoFile, Archive } from '@mui/icons-material';

interface File {
  id: bigint;
  name: string;
  size: bigint;
  fileType: string;
  uploadTime: bigint;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const result = await backend.getFiles();
      setFiles(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const fileId = await backend.uploadFile(file.name, [...new Uint8Array(arrayBuffer)], file.type);
      console.log('File uploaded with ID:', fileId);
      await fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image />;
    if (fileType.startsWith('audio/')) return <AudioFile />;
    if (fileType.startsWith('video/')) return <VideoFile />;
    if (fileType.includes('zip') || fileType.includes('tar') || fileType.includes('rar')) return <Archive />;
    return <InsertDriveFile />;
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FileBox
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
          sx={{ mb: 2 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {files.map((file) => (
              <ListItem key={Number(file.id)}>
                <ListItemIcon>
                  {getFileIcon(file.fileType)}
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`Size: ${Number(file.size)} bytes | Type: ${file.fileType} | Uploaded: ${new Date(Number(file.uploadTime) / 1000000).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default App;
