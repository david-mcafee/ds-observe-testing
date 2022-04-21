// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "NO": "NO",
  "REVIEWING": "REVIEWING",
  "GREEN_LIT": "GREEN_LIT"
};

const { Project, CompanyProject, Company, Todo } = initSchema(schema);

export {
  Project,
  CompanyProject,
  Company,
  Todo,
  Status
};