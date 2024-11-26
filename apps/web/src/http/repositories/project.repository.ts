import type {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectsResponse,
} from '../models/project.model'

export interface ProjectRepository {
  getProjects(slug: string): Promise<GetProjectsResponse>
  createProject(body: CreateProjectRequest): Promise<CreateProjectResponse>
}
