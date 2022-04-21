import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Status {
  NO = "NO",
  REVIEWING = "REVIEWING",
  GREEN_LIT = "GREEN_LIT"
}



type ProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CompanyProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CompanyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Project {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly companies?: (CompanyProject | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Project, ProjectMetaData>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}

export declare class CompanyProject {
  readonly id: string;
  readonly company?: Company | null;
  readonly project?: Project | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CompanyProject, CompanyProjectMetaData>);
  static copyOf(source: CompanyProject, mutator: (draft: MutableModel<CompanyProject, CompanyProjectMetaData>) => MutableModel<CompanyProject, CompanyProjectMetaData> | void): CompanyProject;
}

export declare class Company {
  readonly id: string;
  readonly name: string;
  readonly projects?: (CompanyProject | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Company, CompanyMetaData>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company, CompanyMetaData>) => MutableModel<Company, CompanyMetaData> | void): Company;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}