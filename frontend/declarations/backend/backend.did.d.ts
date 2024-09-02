import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Time = bigint;
export interface _SERVICE {
  'getFiles' : ActorMethod<
    [],
    Array<
      {
        'id' : bigint,
        'name' : string,
        'size' : bigint,
        'fileType' : string,
        'uploadTime' : Time,
      }
    >
  >,
  'uploadFile' : ActorMethod<[string, Uint8Array | number[], string], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
