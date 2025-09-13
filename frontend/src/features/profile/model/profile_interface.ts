interface UserDetails {
  user_id: string;
  full_name: string;
  age:number;
  birthday:Date;
  avatar_image: string;
  phone: string;
  citizen_id: string;
  health_insurance_id: string;
  country: string;
  city: string;
  postal_code: string;
  tax_id: string;
  created_at?: string;
}

interface UserStore {
  user: UserDetails | null;
  loading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<void>;
  updateUser: (id: string, data: Partial<UserDetails>) => Promise<void>;
}

export type { UserDetails, UserStore };
