import { z } from "zod";
import { UserAddDto } from "../user/user.dto";
import { UserSecurityAddDto } from "../user/security.dto";
import { profileAddDto } from "../user/profile.dto";

export const RegisterDto = UserAddDto.merge(UserSecurityAddDto)
  .merge(profileAddDto)
  .extend({
    confirmPassword: z.string(),
    password: z.string(),
  })

export type RegisterDtoType = z.infer<typeof RegisterDto>;
