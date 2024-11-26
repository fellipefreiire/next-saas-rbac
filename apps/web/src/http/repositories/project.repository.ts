import type { GetProjectsResponse } from '../models/project.model'

export interface ProjectRepository {
  getProjects(slug: string): Promise<GetProjectsResponse>
}
