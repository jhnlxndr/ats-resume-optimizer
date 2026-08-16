import { Achievement } from "@/domain/entities";

export interface AchievementRepository {
    save(achievement: Achievement): Promise<Achievement>;

    findByProjectId(projectId: string): Promise<Achievement[]>;

    delete(achievement: Achievement): Promise<void>;
}