export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  return IDL.Service({
    'getFiles' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'name' : IDL.Text,
              'size' : IDL.Nat,
              'fileType' : IDL.Text,
              'uploadTime' : Time,
            })
          ),
        ],
        ['query'],
      ),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text],
        [IDL.Nat],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
