export type ServiceType = 'detailing' | 'services' | null;
export type VehicleType = 'coupe' | 'sedan' | 'small-suv' | 'large-suv' | null;
export type DetailingType = 'interior' | 'exterior' | 'both' | null;
export type TimeSlot = '9:00 AM' | '1:30 PM' | null;

export interface AddOn {
  id: number;
  name: string;
  price: number;
}