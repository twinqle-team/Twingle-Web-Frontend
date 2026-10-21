export interface Automotives {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: 'toyota' | 'honda' | 'mercedes-benz' | 'bmw' | 'lexus' | 'ford' | 'audi' | 'nissan' | 'hyundai' | 'kia' | 'chevrolet' | 'volkswagen' | 'subaru' | 'mazda' | 'jaguar' | 'porsche' | 'tesla' | 'volvo' | 'land-rover' | 'mini' | 'infiniti' | 'acura' | 'mitsubishi' | 'suzuki' | 'peugeot' | 'renault' | 'fiat' | 'alfa-romeo' | 'citroen' | 'skoda' | 'seat' | 'dacia' | 'opel' | 'saab' | 'lancia' | 'isuzu' | 'daewoo' | 'hummer' | 'holden' | 'chrysler' | 'jeep' | 'ram' | 'buick' | 'cadillac' | 'lincoln' | 'pontiac' | 'saturn' | 'tesla' | 'ferrari' | 'lamborghini' | 'mclaren' | 'aston-martin' | 'bugatti' | 'koenigsegg' | 'pagani' | 'rolls-royce' | 'bentley' | 'maserati' | 'lotus' | 'honda-acura' | 'toyota-lexus' | 'nissan-infiniti' | 'subaru-scion' ;
  status: 'available' | 'reserved' | 'sold';
  type: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'wagon' | 'pickup' | 'van' | 'minivan' | 'truck',
  transmission: 'automatic' | 'manual' | 'cvt' | 'semi-automatic';
  fueltype: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'plug-in hybrid' | 'cng';
  drivetype: 'fwd' | 'rwd' | 'awd' | '4wd';
  mileage: number;
  unit: 'km' | 'miles';
  enginecapacity: string;
  exteriorcolor: string;
  interiorcolor: string;
  vin: number;
  model: string;
  year: number;
  condition: 'new' | 'used' | 'certified pre-owned';
  state: string;
  city: string;
  zipcode: string;
  country: string;
  fulladdress: string;
  image: string;
  video: string;
  facilities: {
    airconditioning: boolean;
    leatherseats: boolean;
    heatedseats: boolean;
    ventilatedseats: boolean;
    sunroof: boolean;
    panoramicroof: boolean;
    navigationsystem: boolean;
    bluetooth: boolean;
    applecarplay: boolean;
    androidauto: boolean;
    backupcamera: boolean;
    parkingsensors: boolean;
    cruisecontrol: boolean;
    adaptivecruisecontrol: boolean;
    laneassist: boolean;
    blindspotmonitoring: boolean;
    abs: boolean;
    airbags: boolean;
    pushstart: boolean;
    keylessentry: boolean;
    alloywheels: boolean;
    foglights: boolean;
    ledheadlights: boolean;
    xenonheadlights: boolean;
    powerwindows: boolean;
    powersteering: boolean;
    wirelesscharging: boolean;
    premiumsoundsystem: boolean;
    remotestart: boolean;
  };
  views: number;
  uploadedDate: string;
  isFavorite?: boolean;
}

export interface FilterState {
  search: string;
  autoType: string | null;
  status: string | null;
  city: string | null;
  priceRange: [number, number] | null;
  sortBy: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
