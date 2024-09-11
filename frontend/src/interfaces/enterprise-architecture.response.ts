export interface EnterpriseArchitectureResponse {
  roles: Role[];
}

export interface Role {
  name:               string;
  title:              string;
  "role-description": string;
}
