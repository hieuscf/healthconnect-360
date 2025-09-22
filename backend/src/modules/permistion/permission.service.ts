import Role from "./model/roles";

export const createNewRoleService = async (role_name: string) => {
  const existing = await Role.findOne({ where: { role_name } });
  if (existing) {
    throw new Error("Role đã tồn tại");
  }

  const user = await Role.create({
    role_name,
    description: "",
    active:true
  });
  return {
    role: user.role_name,
    active:true
  };
};
