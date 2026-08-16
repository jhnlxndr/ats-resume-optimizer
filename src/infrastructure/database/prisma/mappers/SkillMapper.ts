import { Skill } from "@/domain/entities";
import { Skill as PrismaSkill } from "@/generated/prisma/client";

export class SkillMapper {
    static toDomain(data: PrismaSkill): Skill {
        return new Skill(data.id, data.name, data.description, data.category, [], []);
    }
}
