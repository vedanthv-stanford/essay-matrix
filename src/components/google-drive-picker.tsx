'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, Cloud, X, Download } from 'lucide-react';

interface GoogleDoc {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
}

interface GoogleDrivePickerProps {
  onDocumentSelect: (doc: GoogleDoc) => void;
  onImportComplete: (content: string, docName: string) => void;
}

const GoogleDrivePicker: React.FC<GoogleDrivePickerProps> = ({ 
  onDocumentSelect, 
  onImportComplete 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<GoogleDoc[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<GoogleDoc | null>(null);
  const [importing, setImporting] = useState(false);

  // Google Drive API configuration
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: GOOGLE_API_KEY,
      clientId: GOOGLE_CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      // Check if user is already signed in
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        setIsConnected(true);
        loadDocuments();
      }
    }).catch((error: any) => {
      console.error('Error initializing Google API client:', error);
    });
  };

  const handleAuthClick = async () => {
    try {
      setIsLoading(true);
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      setIsConnected(true);
      await loadDocuments();
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      setIsConnected(false);
      setDocuments([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await window.gapi.client.drive.files.list({
        pageSize: 50,
        fields: 'files(id, name, mimeType, modifiedTime, size)',
        q: "mimeType='application/vnd.google-apps.document' and trashed=false",
        orderBy: 'modifiedTime desc'
      });

      const docs = response.result.files?.map((file: any) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        modifiedTime: new Date(file.modifiedTime).toLocaleDateString(),
        size: file.size ? formatFileSize(parseInt(file.size)) : undefined
      })) || [];

      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDocumentSelect = (doc: GoogleDoc) => {
    setSelectedDoc(doc);
    onDocumentSelect(doc);
  };

  const handleImport = async () => {
    if (!selectedDoc) return;

    try {
      setImporting(true);
      
      // Export the Google Doc as plain text to preserve formatting
      const response = await window.gapi.client.drive.files.export({
        fileId: selectedDoc.id,
        mimeType: 'text/plain'
      });

      const content = response.result;
      
      // Call the callback with the imported content
      onImportComplete(content, selectedDoc.name);
      
      // Close the dialog
      setIsOpen(false);
      setSelectedDoc(null);
      
    } catch (error) {
      console.error('Error importing document:', error);
    } finally {
      setImporting(false);
    }
  };

  if (!GOOGLE_CLIENT_ID || !GOOGLE_API_KEY) {
    return (
      <div className="text-sm text-muted-foreground">
        Google Drive integration not configured. Please add your Google API credentials.
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/30 text-primary" size="sm">
          <Cloud className="h-4 w-4 mr-2" />
          Import from Google Drive
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Import from Google Drive
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <Cloud className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Connect to Google Drive</h3>
              <p className="text-muted-foreground mb-4">
                Connect your Google account to import documents directly into your drafts.
              </p>
              <Button 
                onClick={handleAuthClick} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Cloud className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Connecting...' : 'Connect Google Drive'}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {documents.length} documents found
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Disconnect
                </Button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Loading documents...
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {documents.map((doc) => (
                    <Card 
                      key={doc.id} 
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedDoc?.id === doc.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleDocumentSelect(doc)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Modified: {doc.modifiedTime}
                              {doc.size && ` • ${doc.size}`}
                            </div>
                          </div>
                          {selectedDoc?.id === doc.id && (
                            <Badge variant="default" className="bg-primary">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedDoc && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">Selected:</span> {selectedDoc.name}
                    </div>
                    <Button 
                      onClick={handleImport}
                      disabled={importing}
                      className="ml-2"
                    >
                      {importing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      {importing ? 'Importing...' : 'Import Document'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleDrivePicker;
