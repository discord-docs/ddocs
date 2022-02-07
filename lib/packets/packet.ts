import { OpCode } from "./opcode";

export interface Packet {
  op: OpCode;
  p: any;
}
