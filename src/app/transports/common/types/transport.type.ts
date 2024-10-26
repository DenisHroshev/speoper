import { TransportTypes } from "@/app/transports/common/constants/transport-types.enum";

export interface Transport {
  name: string;
  description: string;
  peopleCapacity: number;
  type: TransportTypes;
  photoUrl: string;
}
