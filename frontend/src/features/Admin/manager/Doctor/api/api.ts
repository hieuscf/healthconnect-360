// import type { DoctorOverview } from "../model/types";

// export const getOverview = async (): Promise<DoctorOverview> => {
//   const res = await fetch("http://localhost:8080/api/doctor/overview");
//   if (!res.ok) {
//     throw new Error("Failed to fetch user overview");
//   }
//   const result = await res.json();
//   return result.data; // BE trả { success, data }
// };