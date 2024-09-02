import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor {
  type File = {
    id: Nat;
    name: Text;
    content: Blob;
    size: Nat;
    fileType: Text;
    uploadTime: Time.Time;
  };

  stable var nextId: Nat = 0;
  stable var files: [File] = [];

  public func uploadFile(name: Text, content: Blob, fileType: Text): async Nat {
    let id = nextId;
    nextId += 1;

    let newFile: File = {
      id = id;
      name = name;
      content = content;
      size = Blob.toArray(content).size();
      fileType = fileType;
      uploadTime = Time.now();
    };

    files := Array.append(files, [newFile]);
    id
  };

  public query func getFiles(): async [{
    id: Nat;
    name: Text;
    size: Nat;
    fileType: Text;
    uploadTime: Time.Time;
  }] {
    Array.map(files, func (file: File): {
      id: Nat;
      name: Text;
      size: Nat;
      fileType: Text;
      uploadTime: Time.Time;
    } {
      {
        id = file.id;
        name = file.name;
        size = file.size;
        fileType = file.fileType;
        uploadTime = file.uploadTime;
      }
    })
  };
}
